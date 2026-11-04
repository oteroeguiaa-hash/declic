// Trams et bus STIB en temps réel (données ouvertes STIB-MIVB, licence CC BY 4.0).
//
// La STIB donne, pour chaque véhicule : la ligne, le dernier arrêt passé (pointId), la distance
// parcourue depuis cet arrêt (distanceFromPoint) et le terminus (directionId). On retrouve l'arrêt
// suivant grâce à l'ordre des arrêts de la ligne, on place le véhicule entre les deux, puis on le
// colle sur le vrai tracé des rails / de la route (OpenStreetMap) pour qu'il ne coupe pas les pâtés
// de maisons. Le métro (lignes 1, 2, 5, 6) roule sous terre : on ne l'affiche pas.
import * as THREE from 'three';

const API = 'https://data.stib-mivb.brussels/api/explore/v2.1/catalog/datasets/';
const OVERPASS = 'https://overpass-api.de/api/interpreter';
const METRO = new Set( [ '1', '2', '5', '6' ] );
const TRAM = new Set( [ '3', '4', '7', '8', '9', '10', '18', '19', '25', '35', '39', '44', '51', '55', '62', '81', '82', '92', '93', '97' ] );
const POLL = 20; // secondes entre deux mises à jour (la STIB rafraîchit à peu près à ce rythme)
const RANGE_KM = 3;

// ------------------------------------------------------------------------------------------
// Lecture tolérante des données (les champs arrivent parfois en texte JSON, parfois en objet)
// ------------------------------------------------------------------------------------------
const parse = ( v ) => { if ( typeof v !== 'string' ) return v; try { return JSON.parse( v ); } catch { return v; } };
const pick = ( o, ...names ) => { for ( const n of names ) if ( o[ n ] != null ) return o[ n ]; return undefined; };
export const normId = ( id ) => String( id ?? '' ).replace( /^0+/, '' ).replace( /[^0-9]/g, '' );

export function parseStops( records ) {
	const stops = new Map();
	for ( const r of records ) {
		const id = normId( pick( r, 'id', 'stop_id', 'pointid' ) );
		let gps = parse( pick( r, 'gpscoordinates', 'gpsCoordinates', 'coordinates', 'geo_point_2d' ) ) || {};
		const lat = + pick( gps, 'latitude', 'lat' ), lon = + pick( gps, 'longitude', 'lon', 'lng' );
		if ( id && isFinite( lat ) && isFinite( lon ) && lat ) stops.set( id, { lat, lon } );
	}
	return stops;
}

export function parseRoutes( records ) {
	// ligne -> liste de parcours (un par sens), chacun = suite ordonnée d'identifiants d'arrêts
	const routes = new Map();
	for ( const r of records ) {
		const line = String( pick( r, 'lineid', 'lineId', 'line' ) );
		let pts = parse( pick( r, 'points', 'stops' ) ) || [];
		if ( ! Array.isArray( pts ) ) continue;
		pts = pts.slice().sort( ( a, b ) => ( + a.order || 0 ) - ( + b.order || 0 ) ).map( ( p ) => normId( p.id ?? p ) );
		if ( ! routes.has( line ) ) routes.set( line, [] );
		routes.get( line ).push( pts );
	}
	return routes;
}

export function parseVehicles( records ) {
	const out = [];
	for ( const r of records ) {
		const line = String( pick( r, 'lineid', 'lineId', 'line' ) );
		const list = parse( pick( r, 'vehiclepositions', 'vehiclePositions' ) ) || [];
		if ( ! Array.isArray( list ) ) continue;
		list.forEach( ( v, i ) => out.push( {
			line,
			point: normId( pick( v, 'pointId', 'pointid' ) ),
			dir: normId( pick( v, 'directionId', 'directionid' ) ),
			dist: + pick( v, 'distanceFromPoint', 'distancefrompoint' ) || 0,
			idx: i,
		} ) );
	}
	return out;
}

// Distance approximative en mètres entre deux points GPS (suffisant à l'échelle d'une ville)
export function meters( a, b ) {
	const dy = ( b.lat - a.lat ) * 111320;
	const dx = ( b.lon - a.lon ) * 111320 * Math.cos( a.lat * Math.PI / 180 );
	return Math.hypot( dx, dy );
}

// Position GPS d'un véhicule entre son dernier arrêt et le suivant (+ cap en radians, 0 = nord)
export function locate( v, stops, routes ) {
	const from = stops.get( v.point );
	if ( ! from ) return null;
	const candidates = routes.get( v.line ) || [];
	// le bon sens : celui qui finit au terminus annoncé, sinon celui qui contient l'arrêt
	let route = candidates.find( ( r ) => r[ r.length - 1 ] === v.dir && r.includes( v.point ) )
		|| candidates.find( ( r ) => r.includes( v.dir ) && r.includes( v.point ) && r.indexOf( v.point ) < r.indexOf( v.dir ) )
		|| candidates.find( ( r ) => r.includes( v.point ) );
	let to = null;
	if ( route ) {
		const i = route.indexOf( v.point );
		to = stops.get( route[ i + 1 ] ) || null;
	}
	if ( ! to ) return { lat: from.lat, lon: from.lon, heading: null };
	const seg = meters( from, to ) || 1;
	const t = Math.min( 1, Math.max( 0, v.dist / seg ) );
	const lat = from.lat + ( to.lat - from.lat ) * t, lon = from.lon + ( to.lon - from.lon ) * t;
	const heading = Math.atan2( ( to.lon - from.lon ) * Math.cos( from.lat * Math.PI / 180 ), to.lat - from.lat );
	return { lat, lon, heading };
}

// Point le plus proche sur un ensemble de polylignes GPS (tracés OSM d'une ligne)
export function snap( p, lines, maxM = 45 ) {
	let best = null, bestD = maxM;
	const k = Math.cos( p.lat * Math.PI / 180 );
	for ( const pl of lines ) {
		for ( let i = 0; i < pl.length - 1; i ++ ) {
			const a = pl[ i ], b = pl[ i + 1 ];
			const ax = a.lon * k, ay = a.lat, bx = b.lon * k, by = b.lat, px = p.lon * k, py = p.lat;
			const dx = bx - ax, dy = by - ay;
			const l2 = dx * dx + dy * dy || 1e-18;
			const t = Math.max( 0, Math.min( 1, ( ( px - ax ) * dx + ( py - ay ) * dy ) / l2 ) );
			const q = { lat: ay + dy * t, lon: ( ax + dx * t ) / k };
			const d = meters( p, q );
			if ( d < bestD ) { bestD = d; best = { ...q, heading: Math.atan2( dx, dy ) }; }
		}
	}
	return best;
}

// ------------------------------------------------------------------------------------------
// Modèles 3D simples : rame de tram, bus articulé, numéro de ligne au-dessus
// ------------------------------------------------------------------------------------------
function vehicleMesh( kind, line ) {
	const g = new THREE.Group();
	const len = kind === 'tram' ? 32 : 18, w = kind === 'tram' ? 2.3 : 2.55, h = kind === 'tram' ? 3.3 : 3.1;
	const body = new THREE.MeshBasicMaterial( { color: kind === 'tram' ? 0xc9ccd1 : 0xd9dbde } );
	const glass = new THREE.MeshBasicMaterial( { color: 0x1c2630 } );
	const accent = new THREE.MeshBasicMaterial( { color: 0xd52b1e } ); // bande rouge STIB-like
	const lower = new THREE.Mesh( new THREE.BoxGeometry( w, h * 0.42, len ), body );
	lower.position.y = h * 0.21 + 0.25;
	const win = new THREE.Mesh( new THREE.BoxGeometry( w * 1.005, h * 0.38, len * 0.97 ), glass );
	win.position.y = h * 0.42 + 0.25 + h * 0.19;
	const roof = new THREE.Mesh( new THREE.BoxGeometry( w, h * 0.2, len ), body );
	roof.position.y = h * 0.8 + 0.25 + h * 0.1;
	const band = new THREE.Mesh( new THREE.BoxGeometry( w * 1.01, 0.18, len * 1.002 ), accent );
	band.position.y = h * 0.42 + 0.25;
	g.add( lower, win, roof, band );
	if ( kind === 'tram' ) {
		const pan = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.9, 1.8 ), glass ); // pantographe
		pan.position.y = h + 0.7;
		g.add( pan );
	}
	g.add( lineLabel( line, kind ) );
	return g;
}

function lineLabel( line, kind ) {
	const c = document.createElement( 'canvas' );
	c.width = 128; c.height = 64;
	const x = c.getContext( '2d' );
	x.fillStyle = kind === 'tram' ? '#d52b1e' : '#1f5fae';
	x.beginPath(); x.roundRect( 4, 4, 120, 56, 14 ); x.fill();
	x.fillStyle = '#fff';
	x.font = 'bold 40px system-ui, sans-serif';
	x.textAlign = 'center'; x.textBaseline = 'middle';
	x.fillText( ( kind === 'tram' ? 'T' : 'B' ) + line, 64, 34 );
	const tex = new THREE.CanvasTexture( c );
	tex.colorSpace = THREE.SRGBColorSpace;
	const s = new THREE.Sprite( new THREE.SpriteMaterial( { map: tex, depthTest: true, fog: false } ) );
	s.scale.set( 3.2, 1.6, 1 );
	s.position.y = 6;
	return s;
}

// ------------------------------------------------------------------------------------------
export class Stib {

	// geo = { toLocal(lat, lon, target), toLatLon(pos), groundAt(x, z) }
	constructor( scene, geo, onStatus ) {
		this.scene = scene;
		this.geo = geo;
		this.onStatus = onStatus;
		this.group = new THREE.Group();
		scene.add( this.group );
		this.key = '';
		this.enabled = false;
		this.stops = null;
		this.routes = null;
		this.tracks = new Map(); // ligne -> polylignes OSM
		this.tracksCenter = null;
		this.vehicles = new Map(); // clé -> { mesh, from, to, t }
		this.timer = 0;
		this.busy = false;
	}

	async fetchAll( dataset, extra = '' ) {
		const url = API + dataset + '/exports/json?' + ( this.key ? 'apikey=' + encodeURIComponent( this.key ) + '&' : '' ) + extra;
		const res = await fetch( url );
		if ( res.status === 401 || res.status === 403 ) throw new Error( 'cle' );
		if ( ! res.ok ) throw new Error( 'http ' + res.status );
		return res.json();
	}

	async start( key ) {
		this.key = key || '';
		this.enabled = true;
		this.group.visible = true;
		this.timer = 0;
		if ( ! this.stops ) {
			this.onStatus( 'STIB : chargement des arrêts…' );
			try {
				const [ s, r ] = await Promise.all( [ this.fetchAll( 'stop-details-production' ), this.fetchAll( 'stops-by-line-production' ) ] );
				this.stops = parseStops( s );
				this.routes = parseRoutes( r );
			} catch ( e ) {
				this.enabled = false;
				this.onStatus( e.message === 'cle' ? 'STIB : il faut une clé (gratuite) — voir l\'écran d\'accueil' : 'STIB : données indisponibles pour le moment' );
				return false;
			}
		}
		return true;
	}

	stop() {
		this.enabled = false;
		this.group.visible = false;
	}

	// Tracés des lignes STIB autour du joueur (une seule requête par quartier, gardée en mémoire)
	async loadTracks( center ) {
		if ( this.tracksCenter && meters( this.tracksCenter, center ) < 1500 ) return;
		this.tracksCenter = center;
		const d = RANGE_KM / 111, e = d / Math.cos( center.lat * Math.PI / 180 );
		const bbox = [ center.lat - d, center.lon - e, center.lat + d, center.lon + e ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
		const q = `[out:json][timeout:25];rel["type"="route"]["route"~"^(tram|bus|trolleybus)$"]["network"~"STIB|MIVB",i](${ bbox })->.r;.r out body;way(r.r)(${ bbox });out geom;`;
		try {
			const res = await fetch( OVERPASS, { method: 'POST', body: 'data=' + encodeURIComponent( q ) } );
			const data = await res.json();
			const ways = new Map();
			for ( const el of data.elements ) if ( el.type === 'way' && el.geometry ) ways.set( el.id, el.geometry.map( ( g ) => ( { lat: g.lat, lon: g.lon } ) ) );
			this.tracks.clear();
			for ( const el of data.elements ) {
				if ( el.type !== 'relation' ) continue;
				const ref = String( el.tags?.ref || '' );
				if ( ! ref ) continue;
				if ( ! this.tracks.has( ref ) ) this.tracks.set( ref, [] );
				for ( const m of el.members || [] ) if ( m.type === 'way' && ways.has( m.ref ) ) this.tracks.get( ref ).push( ways.get( m.ref ) );
			}
		} catch { this.tracksCenter = null; /* sans tracé : ligne droite entre arrêts */ }
	}

	async poll() {
		if ( this.busy || ! this.enabled ) return;
		this.busy = true;
		try {
			const center = this.geo.here();
			this.loadTracks( center );
			const list = parseVehicles( await this.fetchAll( 'vehicle-position-rt-production' ) );
			const seen = new Set();
			let shown = 0;
			for ( const v of list ) {
				if ( METRO.has( v.line ) ) continue;
				const kind = TRAM.has( v.line ) ? 'tram' : 'bus';
				let p = locate( v, this.stops, this.routes );
				if ( ! p || meters( p, center ) > RANGE_KM * 1000 ) continue;
				const s = snap( p, this.tracks.get( v.line ) || [] );
				if ( s ) p = { lat: s.lat, lon: s.lon, heading: s.heading ?? p.heading };
				shown ++;
				const target = this.geo.toLocal( p.lat, p.lon, new THREE.Vector3() );
				const yaw = p.heading == null ? null : this.geo.headingToYaw( p.heading );
				// on retrouve le même véhicule qu'à la mise à jour précédente : même ligne, même sens, le plus proche
				const group = v.line + ':' + v.dir;
				let veh = null, best = 600;
				for ( const [ k, o ] of this.vehicles ) {
					if ( o.group !== group || seen.has( k ) ) continue;
					const d = Math.hypot( o.to.x - target.x, o.to.z - target.z );
					if ( d < best ) { best = d; veh = o; }
				}
				if ( ! veh ) {
					veh = { key: group + ':' + ( this.serial = ( this.serial || 0 ) + 1 ), group, mesh: vehicleMesh( kind, v.line ), from: target.clone(), to: target.clone(), t: 1, yaw: yaw ?? 0, ground: null, groundTimer: 0 };
					veh.mesh.visible = false;
					veh.mesh.position.copy( target );
					this.group.add( veh.mesh );
					this.vehicles.set( veh.key, veh );
				} else {
					veh.from.copy( veh.mesh.position ); veh.to.copy( target ); veh.t = 0;
				}
				seen.add( veh.key );
				if ( yaw != null ) veh.targetYaw = yaw;
			}
			for ( const [ k, veh ] of this.vehicles ) if ( ! seen.has( k ) ) { this.group.remove( veh.mesh ); this.vehicles.delete( k ); }
			this.onStatus( shown ? '' : 'STIB : aucun tram ou bus dans les 3 km pour l\'instant' );
		} catch ( e ) {
			this.onStatus( e.message === 'cle' ? 'STIB : clé refusée' : 'STIB : mise à jour impossible, nouvel essai…' );
		}
		this.busy = false;
	}

	update( dt ) {
		if ( ! this.enabled ) return;
		this.timer -= dt;
		if ( this.timer <= 0 ) { this.timer = POLL; this.poll(); }
		// chaque véhicule glisse de son ancienne position vers la nouvelle pendant l'intervalle
		for ( const veh of this.vehicles.values() ) {
			veh.t = Math.min( 1, veh.t + dt / POLL );
			const m = veh.mesh;
			m.position.lerpVectors( veh.from, veh.to, veh.t );
			// hauteur de la rue : un rayon par véhicule et par seconde suffit
			veh.groundTimer -= dt;
			if ( veh.groundTimer <= 0 ) {
				veh.groundTimer = 1;
				const g = this.geo.groundAt( m.position.x, m.position.z );
				if ( g != null ) veh.ground = g;
			}
			m.visible = veh.ground != null; // pas affiché tant que la rue n'est pas chargée
			if ( veh.ground != null ) m.position.y = veh.ground;
			if ( veh.targetYaw != null ) {
				let d = veh.targetYaw - veh.yaw;
				d = Math.atan2( Math.sin( d ), Math.cos( d ) );
				veh.yaw += d * Math.min( 1, dt * 2 );
			}
			m.rotation.y = veh.yaw;
		}
	}

	count() { return this.vehicles.size; }

	// après un changement de lieu, les anciennes positions n'ont plus de sens : on repart de zéro
	reset() {
		for ( const veh of this.vehicles.values() ) this.group.remove( veh.mesh );
		this.vehicles.clear();
		this.tracksCenter = null;
		this.timer = 2;
	}

}
