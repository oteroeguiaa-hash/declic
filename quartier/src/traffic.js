// Fausse circulation, vraies rues : des voitures, des trams et des piétons qui circulent sur le vrai
// réseau d'OpenStreetMap autour du joueur (rues, rails de tram, trottoirs, chemins des parcs).
// Ce ne sont pas les vrais véhicules (pas de données en direct), mais tout roule au bon endroit :
// voitures à droite de la chaussée, trams sur les rails, piétons sur les trottoirs.
import * as THREE from 'three';
import { makeCar, makeTram, allCarMaterials, loadCustomCars } from './cars.js';
loadCustomCars();

import { osmArea } from './osm.js';
const RADIUS = 450;       // m de réseau chargés autour du joueur
const SPACING = 6;        // m entre deux points d'un tracé
const CAR_ROADS = /^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street)(_link)?$/;
const SIDEWALK_W = { primary: 8, secondary: 7, tertiary: 6, residential: 4.6, unclassified: 4.6, living_street: 3.2 };
const FOOT = /^(footway|pedestrian|path|living_street|steps)$/;

// --- modèles ---------------------------------------------------------------------------------
const LIGHT = new THREE.Vector3( 0.45, 0.8, 0.35 ).normalize();

// colore une géométrie avec un éclairage simple « peint » dans les sommets (le reste de la scène
// est de la photo sans calcul de lumière : on reste cohérent et très léger)
function shaded( geo, hex ) {
	const g = geo.index ? geo.toNonIndexed() : geo;
	g.computeVertexNormals();
	const n = g.attributes.normal, col = new Float32Array( n.count * 3 ), base = new THREE.Color( hex ), v = new THREE.Vector3();
	for ( let i = 0; i < n.count; i ++ ) {
		v.fromBufferAttribute( n, i );
		const k = 0.5 + 0.45 * Math.max( v.dot( LIGHT ), 0 ) + 0.1 * Math.max( v.y, 0 );
		col[ i * 3 ] = base.r * k; col[ i * 3 + 1 ] = base.g * k; col[ i * 3 + 2 ] = base.b * k;
	}
	g.setAttribute( 'color', new THREE.BufferAttribute( col, 3 ) );
	return g;
}
const box = ( w, h, d, x, y, z, hex ) => shaded( new THREE.BoxGeometry( w, h, d ).translate( x, y, z ), hex );

function merge( geos ) {
	// fusion simple de géométries non indexées (position, normal, color)
	const out = new THREE.BufferGeometry();
	for ( const name of [ 'position', 'normal', 'color' ] ) {
		const arrs = geos.map( ( g ) => g.attributes[ name ].array );
		const all = new Float32Array( arrs.reduce( ( n, a ) => n + a.length, 0 ) );
		let o = 0; for ( const a of arrs ) { all.set( a, o ); o += a.length; }
		out.setAttribute( name, new THREE.BufferAttribute( all, 3 ) );
	}
	return out;
}

const SHIRTS = [ 0x2d3e50, 0x8e2b2b, 0x3c6e47, 0xd8d2c4, 0x1e1e22, 0x6b4f3a, 0x4a5a8c, 0xb5651d, 0x777777, 0x2f5d73 ];
const PANTS = [ 0x1f2633, 0x2b2b2b, 0x3b4a5e, 0x5a4a3a, 0x222b3a ];
const SKIN = [ 0xf1c7a5, 0xd9a57f, 0xa86f4b, 0x6e4430, 0xe8b996 ];
const pick = ( a ) => a[ Math.floor( Math.random() * a.length ) ];

// silhouette humaine arrondie : buste, bassin, cou, tête, cheveux ; jambes et bras articulés à part
const cap = ( r, len, x, y, z, hex, sx = 1, sz = 1 ) => shaded( new THREE.CapsuleGeometry( r, len, 4, 10 ).scale( sx, 1, sz ).translate( x, y, z ), hex );
function personParts() {
	const shirt = pick( SHIRTS ), pants = pick( PANTS ), skin = pick( SKIN ), hair = pick( [ 0x2a1d14, 0x5b3a22, 0x111111, 0xb08a52, 0x777777, 0x8a5a2b ] );
	const h = 0.92 + Math.random() * 0.16, coat = Math.random() < 0.45; // en novembre, beaucoup de manteaux
	const body = merge( [
		cap( 0.19, 0.36, 0, 1.2, 0, shirt, 1.05, 0.62 ),                                  // buste
		...( coat ? [ cap( 0.2, 0.3, 0, 0.98, 0, shirt, 1.0, 0.66 ) ] : [] ),            // bas du manteau
		cap( 0.17, 0.1, 0, 0.9, 0, pants, 1.05, 0.7 ),                                    // bassin
		cap( 0.05, 0.06, 0, 1.5, 0, skin ),                                               // cou
		shaded( new THREE.SphereGeometry( 0.115, 14, 10 ).scale( 0.9, 1.1, 1 ).translate( 0, 1.64, 0 ), skin ), // tête
		shaded( new THREE.SphereGeometry( 0.12, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55 ).scale( 0.92, 1.05, 1.02 ).translate( 0, 1.665, 0.01 ), hair ),
	] );
	const leg = merge( [ cap( 0.075, 0.68, 0, - 0.42, 0, pants ), shaded( new THREE.BoxGeometry( 0.12, 0.07, 0.25 ).translate( 0, - 0.86, - 0.04 ), 0x1a1a1a ) ] );
	const arm = merge( [ cap( 0.055, 0.46, 0, - 0.28, 0, shirt ), shaded( new THREE.SphereGeometry( 0.05, 8, 6 ).translate( 0, - 0.6, 0 ), skin ) ] );
	return { body, leg, arm, h };
}

// --- réseau ------------------------------------------------------------------------------------
class Path {
	constructor( pts, kind, oneway, offset ) {
		this.pts = pts;       // [{x, z, y}]
		this.kind = kind;     // 'car' | 'tram' | 'foot'
		this.oneway = oneway;
		this.offset = offset; // décalage latéral (trottoirs)
		this.cum = [ 0 ];
		for ( let i = 1; i < pts.length; i ++ ) this.cum.push( this.cum[ i - 1 ] + Math.hypot( pts[ i ].x - pts[ i - 1 ].x, pts[ i ].z - pts[ i - 1 ].z ) );
		this.length = this.cum[ this.cum.length - 1 ];
	}
	// position et direction à la distance s le long du tracé
	sample( s, out ) {
		s = Math.max( 0, Math.min( this.length, s ) );
		let i = 1;
		while ( i < this.cum.length - 1 && this.cum[ i ] < s ) i ++;
		const a = this.pts[ i - 1 ], b = this.pts[ i ];
		const seg = this.cum[ i ] - this.cum[ i - 1 ] || 1e-6, t = ( s - this.cum[ i - 1 ] ) / seg;
		out.x = a.x + ( b.x - a.x ) * t; out.z = a.z + ( b.z - a.z ) * t;
		out.ya = a.y; out.yb = b.y; out.t = t; out.ia = i - 1; out.ib = i;
		out.dx = ( b.x - a.x ) / seg; out.dz = ( b.z - a.z ) / seg;
		return out;
	}
}

export class Traffic {

	// geo = { here(), toLocal(lat, lon, target), groundAt(x, z) }
	constructor( scene, geo, counts, renderer ) {
		this.geo = geo;
		this.renderer = renderer;
		this.counts = counts; // { car, tram, foot }
		this.group = new THREE.Group();
		scene.add( this.group );
		this.paths = { car: [], tram: [], foot: [] };
		this.agents = [];
		this.center = null;
		this.loading = false;
		this.mat = new THREE.MeshBasicMaterial( { vertexColors: true } );
		this.headMat = new THREE.MeshBasicMaterial( { color: 0xfff1d0, transparent: true, opacity: 0, toneMapped: false, depthWrite: false } );
		this.tailMat = new THREE.MeshBasicMaterial( { color: 0xff2a1a, transparent: true, opacity: 0, toneMapped: false, depthWrite: false } );
		this.lightGeo = new THREE.CircleGeometry( 0.11, 14 );
		// lumière du jour pour les carrosseries brillantes (la ville, elle, est en photo)
		this.hemi = new THREE.HemisphereLight( 0xdfe9f5, 0x5a5548, 1.2 );
		this.sun = new THREE.DirectionalLight( 0xfff1dc, 1.6 );
		this.sun.target = new THREE.Object3D();
		this.group.add( this.hemi, this.sun, this.sun.target );
		this.tmp = {};
	}

	setTint( c ) { this.mat.color.copy( c ); }
	// soleil (direction dans la scène) et part du jour (0 nuit … 1 jour)
	setLighting( sunDir, day ) {
		this.sun.position.copy( sunDir ).multiplyScalar( 100 );
		this.sun.intensity = 1.8 * Math.max( 0, sunDir.y > 0 ? day : 0 );
		this.hemi.intensity = 0.15 + 1.1 * day;
		for ( const m of allCarMaterials() ) m.envMapIntensity = 0.15 + 0.85 * day;
	}
	setNight( n ) { this.headMat.opacity = n; this.tailMat.opacity = n * 0.9; }

	reset() {
		for ( const a of this.agents ) this.group.remove( a.obj );
		this.agents = [];
		this.paths = { car: [], tram: [], foot: [] };
		this.center = null;
	}

	async load( c ) {
		this.loading = true;
		this.center = c;
		const d = RADIUS / 111320, e = d / Math.cos( c.lat * Math.PI / 180 );
		const bbox = [ c.lat - d, c.lon - e, c.lat + d, c.lon + e ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
		const q = `[out:json][timeout:25];(way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street|footway|pedestrian|path)(_link)?$"](${ bbox });way["railway"="tram"](${ bbox }););out geom;`;
		try {
			const data = { elements: this.geo.fake ? this.geo.fake() : await osmArea( c.lat, c.lon ) };
			if ( this.center !== c ) { this.loading = false; return; }
			this.build( data.elements || [] );
		} catch { this.center = null; }
		this.loading = false;
	}

	build( elements ) {
		const P = new THREE.Vector3();
		const dense = ( geom ) => {
			const pts = geom.map( ( g ) => { this.geo.toLocal( g.lat, g.lon, P ); return { x: P.x, z: P.z }; } );
			const out = [];
			for ( let i = 0; i < pts.length - 1; i ++ ) {
				const a = pts[ i ], b = pts[ i + 1 ], len = Math.hypot( b.x - a.x, b.z - a.z ), n = Math.max( 1, Math.ceil( len / SPACING ) );
				for ( let k = 0; k < n; k ++ ) out.push( { x: a.x + ( b.x - a.x ) * k / n, z: a.z + ( b.z - a.z ) * k / n, y: null } );
			}
			out.push( { ...pts[ pts.length - 1 ], y: null } );
			return out;
		};
		const shift = ( pts, off ) => pts.map( ( p, i ) => {
			const a = pts[ Math.max( 0, i - 1 ) ], b = pts[ Math.min( pts.length - 1, i + 1 ) ];
			const dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot( dx, dz ) || 1;
			return { x: p.x - dz / l * off, z: p.z + dx / l * off, y: null };
		} );
		for ( const el of elements ) {
			if ( el.type !== 'way' || ! el.geometry || el.geometry.length < 2 ) continue;
			const t = el.tags || {};
			const pts = dense( el.geometry );
			if ( pts.length < 2 ) continue;
			if ( t.railway === 'tram' ) { this.paths.tram.push( new Path( pts, 'tram', false, 0 ) ); continue; }
			const hw = ( t.highway || '' ).replace( '_link', '' );
			if ( CAR_ROADS.test( t.highway ) && hw !== 'living_street' && t.access !== 'no' ) {
				this.paths.car.push( new Path( pts, 'car', t.oneway === 'yes' || t.junction === 'roundabout', 0 ) );
			}
			// trottoirs des deux côtés des rues, chemins piétons tels quels
			if ( SIDEWALK_W[ hw ] && ! /^(motorway|trunk)/.test( t.highway ) ) {
				for ( const side of [ 1, - 1 ] ) this.paths.foot.push( new Path( shift( pts, side * SIDEWALK_W[ hw ] ), 'foot', false, 0 ) );
			} else if ( FOOT.test( t.highway ) ) {
				this.paths.foot.push( new Path( pts, 'foot', false, 0 ) );
			}
		}
	}

	// hauteur du sol d'un point de tracé (calculée une fois, à la demande)
	ground( p ) {
		if ( p.y === null ) {
			const g = this.geo.groundAt( p.x, p.z );
			if ( g === null ) return null;
			p.y = g;
		}
		return p.y;
	}

	spawn( kind, pos, near ) {
		const list = this.paths[ kind ].filter( ( pa ) => pa.length > 20 );
		if ( ! list.length ) return false;
		for ( let tries = 0; tries < 12; tries ++ ) {
			const path = pick( list );
			const s = Math.random() * path.length;
			const p = path.sample( s, this.tmp );
			const d = Math.hypot( p.x - pos.x, p.z - pos.z );
			if ( d > near || d < ( kind === 'foot' ? 12 : 30 ) ) continue;
			if ( this.ground( path.pts[ p.ia ] ) === null ) continue;
			const dir = path.oneway ? 1 : ( Math.random() < 0.5 ? 1 : - 1 );
			this.agents.push( this.makeAgent( kind, path, s, dir ) );
			return true;
		}
		return false;
	}

	makeAgent( kind, path, s, dir ) {
		const a = { kind, path, s, dir, phase: Math.random() * 10 };
		if ( kind === 'foot' ) {
			const { body, leg, arm, h } = personParts();
			const obj = new THREE.Group();
			const m = new THREE.Mesh( body, this.mat ); obj.add( m );
			a.legs = [ - 0.09, 0.09 ].map( ( x ) => { const l = new THREE.Mesh( leg, this.mat ); l.position.set( x, 0.88, 0 ); obj.add( l ); return l; } );
			a.arms = [ - 0.24, 0.24 ].map( ( x ) => { const r = new THREE.Mesh( arm, this.mat ); r.position.set( x, 1.45, 0 ); obj.add( r ); return r; } );
			obj.scale.setScalar( h );
			a.obj = obj;
			a.speed = 1.05 + Math.random() * 0.5;
			a.lateral = ( Math.random() - 0.5 ) * 1.2;
		} else {
			const obj = new THREE.Group();
			const model = kind === 'tram' ? makeTram( this.renderer ) : makeCar( this.renderer );
			obj.add( model );
			a.wheels = model.userData.wheels || [];
			a.R = model.userData.radius || 0.33;
			const half = model.userData.half + 0.03, w = kind === 'tram' ? 0.85 : 0.6, y = kind === 'tram' ? 0.9 : 0.74;
			for ( const x of [ - w, w ] ) {
				const hl = new THREE.Mesh( this.lightGeo, this.headMat ); hl.position.set( x, y, - half - 0.02 ); hl.rotation.y = Math.PI; obj.add( hl );
				const tl = new THREE.Mesh( this.lightGeo, this.tailMat ); tl.position.set( x, y, half + 0.02 ); obj.add( tl );
			}
			a.obj = obj;
			a.cruise = kind === 'tram' ? 8 + Math.random() * 3 : ( 7 + Math.random() * 6 );
			a.speed = a.cruise;
		}
		this.group.add( a.obj );
		return a;
	}

	update( dt, pos, quiet ) {
		if ( ! this.loading && ( ! this.center || this.farFromCenter() ) ) { this.reset(); this.load( this.geo.here() ); }
		if ( quiet ) { this.group.visible = false; return; }
		this.group.visible = true;

		// garder le bon nombre de voitures, trams et passants autour du joueur
		const want = this.counts;
		const n = { car: 0, tram: 0, foot: 0 };
		for ( const a of this.agents ) n[ a.kind ] ++;
		let budget = 2;
		for ( const kind of [ 'foot', 'car', 'tram' ] ) {
			const near = kind === 'foot' ? 160 : kind === 'tram' ? 420 : 320;
			while ( n[ kind ] < want[ kind ] && budget -- > 0 ) { if ( this.spawn( kind, pos, near ) ) n[ kind ] ++; else break; }
		}

		const p = this.tmp;
		for ( let i = this.agents.length - 1; i >= 0; i -- ) {
			const a = this.agents[ i ];
			// trop loin : on le retire (un autre apparaîtra plus près)
			const far = a.kind === 'foot' ? 200 : 450;
			p.x = a.obj.position.x; p.z = a.obj.position.z;
			if ( a.placed && Math.hypot( p.x - pos.x, p.z - pos.z ) > far ) { this.group.remove( a.obj ); this.agents.splice( i, 1 ); continue; }

			// voitures : ralentir derrière celle de devant
			if ( a.kind === 'car' ) {
				let gap = Infinity;
				for ( const b of this.agents ) if ( b !== a && b.path === a.path && b.dir === a.dir && b.kind === 'car' ) {
					const ds = ( b.s - a.s ) * a.dir;
					if ( ds > 0 && ds < gap ) gap = ds;
				}
				const target = gap < 9 ? 0 : gap < 22 ? a.cruise * ( gap - 9 ) / 13 : a.cruise;
				a.speed += ( target - a.speed ) * Math.min( 1, dt * 2 );
			}

			a.s += a.speed * a.dir * dt;
			if ( a.s < 0 || a.s > a.path.length ) {
				if ( a.kind === 'foot' ) { a.dir = - a.dir; a.s = Math.max( 0, Math.min( a.path.length, a.s ) ); } // demi-tour au bout du trottoir
				else if ( ! this.continueOn( a ) ) { this.group.remove( a.obj ); this.agents.splice( i, 1 ); continue; }
			}
			a.path.sample( a.s, p );
			const ya = this.ground( a.path.pts[ p.ia ] ), yb = this.ground( a.path.pts[ p.ib ] );
			if ( ya === null || yb === null ) { a.obj.visible = a.placed && a.obj.visible; continue; }
			// voitures à droite de la chaussée, trams sur leur rail, passants un peu décalés
			const fx = p.dx * a.dir, fz = p.dz * a.dir;
			const side = a.kind === 'car' ? ( a.path.oneway ? 0 : 1.7 ) : a.kind === 'foot' ? a.lateral : 0;
			const x = p.x - fz * side, z = p.z + fx * side;
			a.obj.position.set( x, ya + ( yb - ya ) * p.t + ( a.kind === 'foot' ? 0.05 : 0 ), z );
			const yaw = Math.atan2( - fx, - fz );
			if ( a.yaw === undefined ) a.yaw = yaw;
			let dyaw = yaw - a.yaw; dyaw = Math.atan2( Math.sin( dyaw ), Math.cos( dyaw ) );
			a.yaw += dyaw * Math.min( 1, dt * ( a.kind === 'foot' ? 6 : 4 ) );
			a.obj.rotation.y = a.yaw;
			a.obj.visible = true;
			a.placed = true;
			if ( a.wheels?.length ) for ( const w of a.wheels ) w.rotation.x -= a.speed * dt / a.R; // les roues tournent
			if ( a.kind === 'foot' ) {
				a.phase += dt * a.speed * 3.6;
				const sw = Math.sin( a.phase ) * 0.5;
				a.legs[ 0 ].rotation.x = sw; a.legs[ 1 ].rotation.x = - sw;
				a.arms[ 0 ].rotation.x = - sw * 0.8; a.arms[ 1 ].rotation.x = sw * 0.8;
			}
		}
	}

	// au bout d'une rue : prendre une rue qui part du même carrefour
	continueOn( a ) {
		const endAtStart = a.s < 0;
		const end = endAtStart ? a.path.pts[ 0 ] : a.path.pts[ a.path.pts.length - 1 ];
		const options = [];
		for ( const pa of this.paths[ a.kind ] ) {
			if ( pa === a.path ) continue;
			const s0 = pa.pts[ 0 ], s1 = pa.pts[ pa.pts.length - 1 ];
			if ( Math.hypot( s0.x - end.x, s0.z - end.z ) < 3 ) options.push( [ pa, 0, 1 ] );
			else if ( ! pa.oneway && Math.hypot( s1.x - end.x, s1.z - end.z ) < 3 ) options.push( [ pa, pa.length, - 1 ] );
		}
		if ( ! options.length ) return false;
		const [ pa, s, dir ] = pick( options );
		a.path = pa; a.s = s; a.dir = dir;
		return true;
	}

	// explosion : ce qui est dans le souffle disparaît, les passants proches s'enfuient en courant
	blast( p, r ) {
		for ( let i = this.agents.length - 1; i >= 0; i -- ) {
			const a = this.agents[ i ], o = a.obj.position, d = Math.hypot( o.x - p.x, o.z - p.z );
			if ( d < r ) { this.group.remove( a.obj ); this.agents.splice( i, 1 ); continue; }
			if ( a.kind === 'foot' && d < 120 ) {
				const s = a.path.sample( a.s, this.tmp );
				a.dir = ( ( o.x - p.x ) * s.dx + ( o.z - p.z ) * s.dz ) >= 0 ? 1 : - 1;
				a.speed = 3.2 + Math.random();
			}
		}
	}

	farFromCenter() {
		const h = this.geo.here(), c = this.center;
		return Math.hypot( ( h.lat - c.lat ) * 111320, ( h.lon - c.lon ) * 111320 * Math.cos( h.lat * Math.PI / 180 ) ) > RADIUS * 0.55;
	}

}
