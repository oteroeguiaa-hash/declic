// Murs de la marche : les vrais contours des bâtiments (et murs / clôtures) d'OpenStreetMap.
// Avant, les collisions se faisaient sur le maillage 3D de Google, où arbres, voitures garées et
// buissons forment des blocs : d'où les « murs invisibles ». Ici, seuls les vrais bâtiments arrêtent.
import { osmArea } from './osm.js';
const RADIUS = 600;   // m chargés autour du joueur
const CELL = 8;       // grille d'accélération (m)

export class OsmWalls {

	// geo = { here(), toLocal(lat, lon, target) }
	constructor( geo ) {
		this.geo = geo;
		this.center = null;
		this.loading = false;
		this.ready = false;
		this.polys = [];          // bâtiments : listes de points {x, z}
		this.grid = new Map();    // "i,j" -> segments [ax, az, bx, bz, polyIndex | -1]
	}

	reset() { this.center = null; this.ready = false; this.polys = []; this.grid.clear(); }

	maybeLoad() {
		if ( this.loading ) return;
		const here = this.geo.here();
		if ( this.center && Math.hypot( ( here.lat - this.center.lat ) * 111320, ( here.lon - this.center.lon ) * 111320 * Math.cos( here.lat * Math.PI / 180 ) ) < RADIUS / 2 ) return;
		this.load( here );
	}

	async load( c ) {
		this.loading = true;
		const d = RADIUS / 111320, e = d / Math.cos( c.lat * Math.PI / 180 );
		const bbox = [ c.lat - d, c.lon - e, c.lat + d, c.lon + e ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
		const q = `[out:json][timeout:25];(way["building"](${ bbox });way["barrier"~"^(wall|fence|city_wall|retaining_wall)$"](${ bbox }););out geom;`;
		try {
			const els = await osmArea( c.lat, c.lon );
			this.build( els.filter( ( el ) => el.type === 'way' && ( el.tags?.building || /^(wall|fence|city_wall|retaining_wall)$/.test( el.tags?.barrier || '' ) ) ) );
			this.center = c;
			this.ready = true;
		} catch { /* on réessaiera ; en attendant, collisions sur la 3D */ }
		this.loading = false;
	}

	build( elements ) {
		this.polys = [];
		this.grid.clear();
		const P = new ( this.geo.Vector3 )();
		for ( const el of elements ) {
			if ( el.type !== 'way' || ! el.geometry || el.geometry.length < 2 ) continue;
			const pts = el.geometry.map( ( g ) => { this.geo.toLocal( g.lat, g.lon, P ); return { x: P.x, z: P.z }; } );
			const isBuilding = !! el.tags?.building;
			const idx = isBuilding ? this.polys.push( pts ) - 1 : - 1;
			for ( let i = 0; i < pts.length - 1; i ++ ) this.addSeg( pts[ i ], pts[ i + 1 ], idx );
		}
	}

	addSeg( a, b, idx ) {
		const seg = [ a.x, a.z, b.x, b.z, idx ];
		const i0 = Math.floor( Math.min( a.x, b.x ) / CELL ), i1 = Math.floor( Math.max( a.x, b.x ) / CELL );
		const j0 = Math.floor( Math.min( a.z, b.z ) / CELL ), j1 = Math.floor( Math.max( a.z, b.z ) / CELL );
		for ( let i = i0; i <= i1; i ++ ) for ( let j = j0; j <= j1; j ++ ) {
			const k = i + ',' + j;
			if ( ! this.grid.has( k ) ) this.grid.set( k, [] );
			this.grid.get( k ).push( seg );
		}
	}

	segsNear( x, z ) {
		const out = new Set();
		const i = Math.floor( x / CELL ), j = Math.floor( z / CELL );
		for ( let a = i - 1; a <= i + 1; a ++ ) for ( let b = j - 1; b <= j + 1; b ++ ) {
			const s = this.grid.get( a + ',' + b );
			if ( s ) for ( const seg of s ) out.add( seg );
		}
		return out;
	}

	inside( x, z, segs ) {
		// point dans un bâtiment ? (nombre de croisements par bâtiment)
		const count = new Map();
		for ( const [ ax, az, bx, bz, idx ] of segs ) {
			if ( idx < 0 ) continue;
			if ( ( az > z ) !== ( bz > z ) && x < ( bx - ax ) * ( z - az ) / ( bz - az ) + ax ) count.set( idx, ( count.get( idx ) || 0 ) + 1 );
		}
		for ( const c of count.values() ) if ( c % 2 ) return true;
		return false;
	}

	// Déplace (x, z) vers (nx, nz) avec un corps de rayon r : on glisse le long des murs.
	// Renvoie la position corrigée.
	move( x, z, nx, nz, r = 0.3 ) {
		let px = nx, pz = nz;
		const segs = this.segsNear( px, pz );
		for ( let it = 0; it < 3; it ++ ) {
			let pushed = false;
			for ( const [ ax, az, bx, bz ] of segs ) {
				const dx = bx - ax, dz = bz - az;
				const l2 = dx * dx + dz * dz || 1e-9;
				const t = Math.max( 0, Math.min( 1, ( ( px - ax ) * dx + ( pz - az ) * dz ) / l2 ) );
				const cx = ax + dx * t, cz = az + dz * t;
				const d = Math.hypot( px - cx, pz - cz );
				// de quel côté du mur on était avant ce pas (on doit y rester)
				const sideOld = Math.sign( dx * ( z - az ) - dz * ( x - ax ) );
				const sideNew = Math.sign( dx * ( pz - az ) - dz * ( px - ax ) );
				const crossed = sideOld !== 0 && sideNew !== sideOld && t > 0 && t < 1;
				if ( d < r || crossed ) {
					// normale du mur tournée vers notre côté
					const l = Math.sqrt( l2 );
					let nx2 = - dz / l, nz2 = dx / l;
					if ( sideOld < 0 ) { nx2 = - nx2; nz2 = - nz2; }
					if ( t <= 0 || t >= 1 ) { // au bout du mur : on s'écarte du coin
						const ex = px - cx, ez = pz - cz, n = Math.hypot( ex, ez );
						if ( n > 1e-6 ) { nx2 = ex / n; nz2 = ez / n; }
					}
					px = cx + nx2 * r; pz = cz + nz2 * r;
					pushed = true;
				}
			}
			if ( ! pushed ) break;
		}
		// jamais à l'intérieur d'un bâtiment (sauf si on y était déjà, par ex. à l'arrivée)
		if ( this.inside( px, pz, segs ) && ! this.inside( x, z, this.segsNear( x, z ) ) ) return { x, z };
		return { x: px, z: pz };
	}

}
