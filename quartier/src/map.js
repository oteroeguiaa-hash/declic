// Carte GPS : la vraie carte Google (plan ou satellite, via la même clé « Map Tiles API »),
// avec repli sur OpenStreetMap. Mini-carte dans un coin, grande carte plein écran (touche M) :
// zoom, déplacement, et un clic / une tape = téléportation à cet endroit.
import L from 'leaflet';

const OSM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

async function googleSession( key, body ) {
	const res = await fetch( 'https://tile.googleapis.com/v1/createSession?key=' + encodeURIComponent( key ), {
		method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( body ),
	} );
	if ( ! res.ok ) throw new Error( 'session ' + res.status );
	return ( await res.json() ).session;
}

// type : 'roadmap' ou 'satellite' ; traffic : trafic routier en temps réel de Google par-dessus
async function makeLayer( key, type, traffic ) {
	const base = { mapType: type, language: 'fr-BE', region: 'BE' };
	const tries = [];
	const layers = [ ...( type === 'satellite' ? [ 'layerRoadmap' ] : [] ), ...( traffic ? [ 'layerTraffic' ] : [] ) ];
	if ( layers.length ) tries.push( { ...base, layerTypes: layers, ...( type === 'satellite' ? { overlay: false } : {} ) } );
	tries.push( base );
	if ( key ) {
		for ( const body of tries ) {
			try {
				const session = await googleSession( key, body );
				const layer = L.tileLayer( `https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session=${ session }&key=${ encodeURIComponent( key ) }`, {
					maxZoom: 22, maxNativeZoom: type === 'satellite' ? 21 : 22, tileSize: 256,
					attribution: type === 'satellite' ? 'Images © Google' : 'Carte © Google',
				} );
				layer.hasTraffic = !! body.layerTypes?.includes( 'layerTraffic' );
				return layer;
			} catch { /* on essaie plus simple */ }
		}
	}
	return L.tileLayer( OSM, { maxZoom: 20, maxNativeZoom: 19, attribution: '© OpenStreetMap' } );
}

function playerIcon() {
	return L.divIcon( {
		className: 'me-icon',
		html: '<div class="me-dot"><div class="me-cone"></div></div>',
		iconSize: [ 22, 22 ], iconAnchor: [ 11, 11 ],
	} );
}

export class GpsMap {

	constructor( { key, onTeleport, onOpen, onClose } ) {
		this.key = key;
		this.onTeleport = onTeleport;
		this.onOpen = onOpen;
		this.onClose = onClose;
		this.type = 'roadmap';
		this.traffic = false;
		this.layers = {};
		this.pos = null;
		this.heading = 0;

		// mini-carte « boussole sombre » : la carte tourne avec le regard, la flèche reste vers le haut
		// (non interactive : une tape ouvre la grande carte)
		this.mini = L.map( 'minimap-inner', {
			zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false,
			doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false, tap: false,
			fadeAnimation: false, zoomAnimation: false,
		} ).setView( [ 50.84, 4.41 ], 17 );
		this.miniInner = document.getElementById( 'minimap-inner' );
		this.miniNorth = document.getElementById( 'mm-north' );
		document.getElementById( 'minimap' ).addEventListener( 'pointerdown', ( e ) => { e.preventDefault(); e.stopPropagation(); this.open(); } );

		// grande carte
		this.big = L.map( 'bigmap', { zoomControl: true, attributionControl: true } ).setView( [ 50.84, 4.41 ], 16 );
		this.big.attributionControl.setPrefix( '' );
		this.bigMe = L.marker( [ 50.84, 4.41 ], { icon: playerIcon(), interactive: false, zIndexOffset: 1000 } ).addTo( this.big );
		this.big.on( 'click', ( e ) => {
			// le « clic » du doigt qui vient d'ouvrir la carte ne doit pas téléporter
			if ( performance.now() - this.openedAt < 600 ) return;
			this.close();
			this.onTeleport( e.latlng.lat, e.latlng.lng );
		} );

		document.getElementById( 'map-close' ).onclick = () => this.close();
		document.getElementById( 'map-me' ).onclick = () => this.pos && this.big.setView( this.pos, Math.max( this.big.getZoom(), 17 ) );
		document.getElementById( 'map-type' ).onclick = () => this.setType( this.type === 'roadmap' ? 'satellite' : 'roadmap' );
		document.getElementById( 'map-traffic' ).onclick = () => { this.traffic = ! this.traffic; this.setType( this.type ); };
		this.setType( 'roadmap' );

		this.explore = new Explorer( this );
	}

	async setType( type ) {
		this.type = type;
		const id = type + ( this.traffic ? '+traffic' : '' );
		document.getElementById( 'map-type' ).textContent = type === 'roadmap' ? '🛰️ Satellite' : '🗺️ Plan';
		document.getElementById( 'map-traffic' ).classList.toggle( 'on', this.traffic );
		if ( ! this.layers[ id ] ) {
			// une couche pour chaque carte (Leaflet n'aime pas partager une couche entre deux cartes)
			const [ a, b ] = await Promise.all( [ makeLayer( this.key, type, this.traffic ), makeLayer( this.key, type, this.traffic ) ] );
			this.layers[ id ] = { mini: a, big: b };
			if ( this.traffic && ! b.hasTraffic ) document.getElementById( 'map-msg' ).textContent = 'Trafic indisponible avec cette clé.';
			else document.getElementById( 'map-msg' ).textContent = '';
		}
		for ( const t of Object.keys( this.layers ) ) {
			const l = this.layers[ t ];
			if ( t === id ) { l.mini.addTo( this.mini ); l.big.addTo( this.big ); } else { l.mini.remove(); l.big.remove(); }
		}
	}

	// position du joueur (degrés) et cap (radians, 0 = nord, sens horaire)
	update( lat, lon, heading ) {
		this.pos = [ lat, lon ];
		this.heading = heading;
		if ( ! this.sized ) { this.mini.invalidateSize(); this.sized = true; }
		this.mini.setView( this.pos, this.mini.getZoom(), { animate: false } );
		this.bigMe.setLatLng( this.pos );
		const deg = heading * 180 / Math.PI;
		this.miniInner.style.transform = `rotate(${ ( - deg ).toFixed( 1 ) }deg)`;
		// le N rouge fait le tour du cadran
		const r = 38, a = - heading;
		this.miniNorth.style.transform = `translate(${ ( Math.sin( a ) * r ).toFixed( 1 ) }px, ${ ( - Math.cos( a ) * r ).toFixed( 1 ) }px)`;
		const el = this.bigMe.getElement()?.querySelector( '.me-cone' );
		if ( el ) el.style.transform = `rotate(${ deg.toFixed( 0 ) }deg)`;
	}

	// à appeler régulièrement avec la position ; jumped = on vient de se téléporter
	track( lat, lon, jumped ) { this.explore.add( lat, lon, jumped ); }

	// zoom de la mini-carte selon la vitesse (on voit plus loin quand on va vite)
	setMiniZoom( z ) { if ( this.mini.getZoom() !== z ) this.mini.setZoom( z, { animate: false } ); }

	get isOpen() { return ! document.getElementById( 'mapview' ).hidden; }

	open() {
		this.openedAt = performance.now();
		document.getElementById( 'mapview' ).hidden = false;
		this.big.invalidateSize();
		if ( this.pos ) this.big.setView( this.pos, Math.max( this.big.getZoom(), 16 ), { animate: false } );
		this.explore.refresh();
		this.onOpen?.();
	}

	close() {
		document.getElementById( 'mapview' ).hidden = true;
		this.onClose?.();
	}

	toggle() { if ( this.isOpen ) this.close(); else this.open(); }

}

// ----------------------------------------------------------------------------------------------
// Exploration : tout ce que tu n'as pas encore visité est dans le brouillard sur la grande carte.
// Là où tu passes, la carte se dévoile, ta trace s'allume, et les kilomètres s'additionnent.
// Tout est gardé dans le navigateur.
// ----------------------------------------------------------------------------------------------
const CELL_LAT = 0.00045, CELL_LON = 0.0007; // cases d'environ 50 × 50 m
const STORE = 'quartier.explore';
const dist = ( a, b ) => {
	const dy = ( b[ 0 ] - a[ 0 ] ) * 111320, dx = ( b[ 1 ] - a[ 1 ] ) * 111320 * Math.cos( a[ 0 ] * Math.PI / 180 );
	return Math.hypot( dx, dy );
};
const fmtKm = ( m ) => ( m < 1000 ? Math.round( m ) + ' m' : ( m / 1000 ).toFixed( m < 10000 ? 2 : 1 ).replace( '.', ',' ) + ' km' );

class Explorer {

	constructor( gps ) {
		this.gps = gps;
		let saved = null;
		try { saved = JSON.parse( localStorage.getItem( STORE ) || 'null' ); } catch { /* */ }
		this.segments = saved?.segments || [];
		this.meters = saved?.meters || 0;
		this.cells = new Set( saved?.cells || [] );
		this.fog = saved?.fog ?? true;
		this.last = null;
		this.dirty = false;
		this.nextMilestone = ( Math.floor( this.meters / 1000 ) + 1 ) * 1000;

		// trace lumineuse : un halo large et flou + un trait fin et vif
		const glow = { color: '#38bdf8', weight: 9, opacity: 0.35, className: 'trail-glow', interactive: false };
		const core = { color: '#e0f7ff', weight: 2.5, opacity: 0.95, interactive: false };
		this.bigGlow = L.polyline( this.segments, glow ).addTo( gps.big );
		this.bigCore = L.polyline( this.segments, core ).addTo( gps.big );
		this.miniLine = L.polyline( this.segments, { color: '#38bdf8', weight: 3, opacity: 0.9, interactive: false } ).addTo( gps.mini );

		// brouillard : un canevas dans un calque à lui, entre les images de la carte et la trace
		const pane = gps.big.createPane( 'fog' );
		pane.style.zIndex = 350;
		pane.style.pointerEvents = 'none';
		this.canvas = document.getElementById( 'fog' );
		pane.append( this.canvas );
		gps.big.on( 'move zoom resize viewreset zoomend moveend', () => this.drawFog() );
		document.getElementById( 'map-fog' ).onclick = () => { this.fog = ! this.fog; this.save( true ); this.refresh(); };
		document.getElementById( 'map-reset' ).onclick = () => {
			if ( ! confirm( 'Effacer toute ton exploration (trace, kilomètres, zones découvertes) ?' ) ) return;
			this.segments = []; this.meters = 0; this.cells.clear(); this.last = null; this.nextMilestone = 1000;
			this.save( true ); this.refresh();
		};
		setInterval( () => this.save(), 5000 );
	}

	add( lat, lon, jumped ) {
		const p = [ + lat.toFixed( 6 ), + lon.toFixed( 6 ) ];
		const d = this.last ? dist( this.last, p ) : Infinity;
		if ( jumped || ! this.last || d > 400 ) {
			// téléportation (ou saut énorme) : nouvelle trace, sans compter la distance
			this.segments.push( [ p ] );
			this.last = p;
		} else if ( d >= 6 ) {
			this.segments[ this.segments.length - 1 ].push( p );
			this.meters += d;
			this.last = p;
			if ( this.meters >= this.nextMilestone ) {
				this.gps.onMilestone?.( '🧭 ' + fmtKm( this.nextMilestone ) + ' explorés !' );
				this.nextMilestone += 1000;
			}
		} else return;
		const before = this.cells.size;
		this.cells.add( Math.round( lat / CELL_LAT ) + ',' + Math.round( lon / CELL_LON ) );
		if ( this.cells.size > before && this.cells.size % 50 === 0 ) this.gps.onMilestone?.( '✨ ' + this.area() + ' découverts' );
		// on garde au plus ~40 000 points (les plus anciennes traces partent en premier)
		let total = this.segments.reduce( ( n, s ) => n + s.length, 0 );
		while ( total > 40000 && this.segments.length > 1 ) total -= this.segments.shift().length;
		this.dirty = true;
		this.lineTimer = ( this.lineTimer || 0 ) + 1;
		if ( this.lineTimer % 4 === 0 || jumped ) this.refreshLines();
	}

	area() {
		const km2 = this.cells.size * 0.05 * 0.05;
		return km2 < 1 ? ( km2 * 100 ).toFixed( km2 < 0.1 ? 1 : 0 ).replace( '.', ',' ) + ' ha' : km2.toFixed( 2 ).replace( '.', ',' ) + ' km²';
	}

	refreshLines() {
		this.bigGlow.setLatLngs( this.segments );
		this.bigCore.setLatLngs( this.segments );
		this.miniLine.setLatLngs( this.segments );
	}

	refresh() {
		this.refreshLines();
		document.getElementById( 'map-fog' ).classList.toggle( 'on', this.fog );
		document.getElementById( 'explore-stats' ).innerHTML =
			`<b>${ fmtKm( this.meters ) }</b> parcourus · <b>${ this.area() }</b> découverts`;
		this.drawFog();
	}

	drawFog() {
		const c = this.canvas, map = this.gps.big;
		if ( ! c || ! this.gps.isOpen ) return;
		const size = map.getSize(), dpr = Math.min( devicePixelRatio, 2 );
		if ( c.width !== size.x * dpr || c.height !== size.y * dpr ) { c.width = size.x * dpr; c.height = size.y * dpr; }
		// le calque bouge avec la carte : on recale le canevas sur le coin de l'écran
		L.DomUtil.setPosition( c, map.containerPointToLayerPoint( [ 0, 0 ] ) );
		c.style.width = size.x + 'px'; c.style.height = size.y + 'px';
		const g = c.getContext( '2d' );
		g.setTransform( dpr, 0, 0, dpr, 0, 0 );
		g.clearRect( 0, 0, size.x, size.y );
		if ( ! this.fog ) return;
		// voile sombre bleuté
		g.globalCompositeOperation = 'source-over';
		g.fillStyle = 'rgba(6, 10, 22, 0.72)';
		g.fillRect( 0, 0, size.x, size.y );
		// trous doux autour de chaque zone visitée
		const center = map.getCenter();
		const p0 = map.latLngToContainerPoint( center ), p1 = map.latLngToContainerPoint( [ center.lat + 0.001, center.lng ] );
		const pxPerM = Math.abs( p1.y - p0.y ) / 111.32;
		const r = Math.max( 8, 70 * pxPerM );
		const b = map.getBounds().pad( 0.2 );
		g.globalCompositeOperation = 'destination-out';
		for ( const key of this.cells ) {
			const [ i, j ] = key.split( ',' );
			const lat = i * CELL_LAT, lon = j * CELL_LON;
			if ( ! b.contains( [ lat, lon ] ) ) continue;
			const p = map.latLngToContainerPoint( [ lat, lon ] );
			const grad = g.createRadialGradient( p.x, p.y, r * 0.45, p.x, p.y, r );
			grad.addColorStop( 0, 'rgba(0,0,0,1)' );
			grad.addColorStop( 1, 'rgba(0,0,0,0)' );
			g.fillStyle = grad;
			g.fillRect( p.x - r, p.y - r, r * 2, r * 2 );
		}
		g.globalCompositeOperation = 'source-over';
	}

	save( force ) {
		if ( ! this.dirty && ! force ) return;
		this.dirty = false;
		try { localStorage.setItem( STORE, JSON.stringify( { segments: this.segments, meters: Math.round( this.meters ), cells: [ ...this.cells ], fog: this.fog } ) ); } catch { /* plein */ }
	}

}
