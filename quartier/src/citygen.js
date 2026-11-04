// Là où Google n'a pas de 3D (tout est plat, comme à Court-Saint-Étienne), le jeu construit lui-même
// la ville : chaque bâtiment d'OpenStreetMap absent du relief Google est élevé en 3D (murs en brique
// ou en enduit, fenêtres, portes, toit en tuiles ou en ardoise), et les arbres d'OSM sont plantés.
// Le test se fait bâtiment par bâtiment : un rayon vise le toit ; s'il retombe au niveau du sol, le
// bâtiment manque dans la 3D Google et on le construit.
import * as THREE from 'three';

import { osmArea } from './osm.js';
const RADIUS = 420;

// --- textures de façade (une travée = 1 fenêtre × 1 étage, répétée) ---------------------------------------
function tex( w, h, draw ) {
	const c = document.createElement( 'canvas' ); c.width = w; c.height = h;
	draw( c.getContext( '2d' ), w, h );
	const t = new THREE.CanvasTexture( c );
	t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
	return t;
}
function brick( g, w, h, base ) {
	const c = new THREE.Color( base );
	for ( let y = 0; y < h; y += 8 ) for ( let x = - ( y / 8 % 2 ) * 12; x < w; x += 24 ) {
		const k = 0.85 + Math.random() * 0.3;
		g.fillStyle = `rgb(${ c.r * 255 * k | 0 },${ c.g * 255 * k | 0 },${ c.b * 255 * k | 0 })`;
		g.fillRect( x + 1, y + 1, 22, 6 );
	}
}
function facadeTexture( style, door = false ) {
	return tex( 256, 256, ( g, w, h ) => {
		// mur
		if ( style.brick ) { g.fillStyle = '#b9b1a5'; g.fillRect( 0, 0, w, h ); brick( g, w, h, style.wall ); }
		else { g.fillStyle = style.wall; g.fillRect( 0, 0, w, h ); for ( let i = 0; i < 1500; i ++ ) { g.fillStyle = `rgba(0,0,0,${ Math.random() * 0.05 })`; g.fillRect( Math.random() * w, Math.random() * h, 2, 2 ); } }
		// cordon entre étages
		g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect( 0, h - 6, w, 6 );
		if ( door ) {
			g.fillStyle = style.frame; g.fillRect( 80, 70, 96, 186 );
			g.fillStyle = style.doorCol; g.fillRect( 88, 78, 80, 178 );
			g.fillStyle = 'rgba(255,255,255,0.15)'; g.fillRect( 96, 90, 64, 70 );
			g.fillStyle = '#d4af37'; g.fillRect( 150, 170, 8, 8 );
			return;
		}
		// fenêtre : appui, encadrement, vitres (reflet), croisillon
		g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect( 66, 58, 128, 150 );
		g.fillStyle = style.frame; g.fillRect( 70, 54, 120, 150 );
		const gr = g.createLinearGradient( 0, 60, 0, 200 ); gr.addColorStop( 0, '#9fb6cc' ); gr.addColorStop( 0.45, '#3b4a5a' ); gr.addColorStop( 1, '#1d252e' );
		g.fillStyle = gr; g.fillRect( 78, 62, 104, 134 );
		g.fillStyle = style.frame; g.fillRect( 127, 62, 6, 134 ); g.fillRect( 78, 112, 104, 5 );
		g.fillStyle = 'rgba(255,255,255,0.18)'; g.beginPath(); g.moveTo( 80, 64 ); g.lineTo( 120, 64 ); g.lineTo( 80, 150 ); g.fill();
		g.fillStyle = style.sill; g.fillRect( 62, 204, 136, 10 );
		if ( style.shutters ) { g.fillStyle = style.shutters; g.fillRect( 44, 54, 24, 150 ); g.fillRect( 192, 54, 24, 150 ); }
	} );
}
function roofTexture( col ) {
	return tex( 128, 128, ( g, w, h ) => {
		const c = new THREE.Color( col );
		for ( let y = 0; y < h; y += 10 ) for ( let x = - ( y / 10 % 2 ) * 8; x < w; x += 16 ) {
			const k = 0.8 + Math.random() * 0.35;
			g.fillStyle = `rgb(${ c.r * 255 * k | 0 },${ c.g * 255 * k | 0 },${ c.b * 255 * k | 0 })`;
			g.fillRect( x, y, 15, 9 );
			g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect( x, y + 8, 15, 2 );
		}
	} );
}

// styles typiques en Belgique
const STYLES = [
	{ w: 5, wall: '#9b4a34', brick: true, frame: '#f2f2ee', sill: '#d8d3c8', doorCol: '#3a2a20', roof: '#3b3f45' },  // brique rouge, ardoise
	{ w: 3, wall: '#b5653f', brick: true, frame: '#ffffff', sill: '#e0dbd2', doorCol: '#24425e', roof: '#8a3b25' },  // brique orangée, tuiles
	{ w: 3, wall: '#efe9dd', frame: '#2d3138', sill: '#cfc8bb', doorCol: '#5a1f1f', roof: '#3b3f45' },               // enduit blanc
	{ w: 2, wall: '#d9cbb0', frame: '#ffffff', sill: '#bfb5a2', doorCol: '#2c4a2e', roof: '#8a3b25', shutters: '#3e5f45' },
	{ w: 2, wall: '#c9a46a', brick: true, frame: '#f0efe9', sill: '#dcd6ca', doorCol: '#3a2a20', roof: '#3b3f45' },  // brique jaune
	{ w: 1, wall: '#a9a9a3', frame: '#222222', sill: '#9a9a94', doorCol: '#222222', roof: '#55595e' },               // béton / moderne
];
const pickStyle = ( r ) => { let x = r * STYLES.reduce( ( n, s ) => n + s.w, 0 ); for ( const s of STYLES ) { x -= s.w; if ( x <= 0 ) return s; } return STYLES[ 0 ]; };

const matCache = new Map();
function styleMats( s ) {
	if ( ! matCache.has( s ) ) {
		matCache.set( s, {
			wall: new THREE.MeshStandardMaterial( { map: facadeTexture( s ), roughness: 0.85 } ),
			door: new THREE.MeshStandardMaterial( { map: facadeTexture( s, true ), roughness: 0.8 } ),
			roof: new THREE.MeshStandardMaterial( { map: roofTexture( s.roof ), roughness: 0.75 } ),
			flat: new THREE.MeshStandardMaterial( { color: 0x6f6f6a, roughness: 0.95 } ),
		} );
	}
	return matCache.get( s );
}

// --- un bâtiment ---------------------------------------------------------------------------------------
function buildingMesh( b, rnd ) {
	const s = pickStyle( rnd() );
	const M = styleMats( s );
	const pts = b.pts.slice( 0, - 1 ); // contour sans répéter le premier point
	const ccw = b.ccw;
	const g0 = b.ground - 0.6, top = b.ground + b.h;
	const group = new THREE.Group();

	// murs : une bande par côté, UV en travées de 3,2 m × étages de 3 m
	const pos = [], uv = [], idx = [];
	const doorPos = [], doorUv = [], doorIdx = [];
	let longest = 0, longestI = 0;
	pts.forEach( ( a, i ) => { const c = pts[ ( i + 1 ) % pts.length ]; const l = Math.hypot( c.x - a.x, c.z - a.z ); if ( l > longest ) { longest = l; longestI = i; } } );
	pts.forEach( ( a, i ) => {
		const c = pts[ ( i + 1 ) % pts.length ];
		const len = Math.hypot( c.x - a.x, c.z - a.z );
		if ( len < 0.05 ) return;
		const bays = Math.max( 1, Math.round( len / 3.2 ) );
		const P = ( i === longestI && len > 4 ) ? { p: doorPos, u: doorUv, i: doorIdx } : { p: pos, u: uv, i: idx };
		// le côté le plus long a une porte au rez-de-chaussée (travée du milieu)
		const quad = ( x0, z0, x1, z1, y0, y1, u0, u1, v0, v1, T ) => {
			const base = T.p.length / 3;
			T.p.push( x0, y0, z0, x1, y0, z1, x1, y1, z1, x0, y1, z0 );
			T.u.push( u0, v0, u1, v0, u1, v1, u0, v1 );
			// faces tournées vers l'extérieur
			if ( ccw ) T.i.push( base, base + 2, base + 1, base, base + 3, base + 2 ); else T.i.push( base, base + 1, base + 2, base, base + 2, base + 3 );
		};
		const floorsV = ( top - b.ground ) / 3;
		if ( P.p === doorPos ) {
			const mid = Math.floor( bays / 2 ), t0 = mid / bays, t1 = ( mid + 1 ) / bays;
			const lerp = ( t ) => [ a.x + ( c.x - a.x ) * t, a.z + ( c.z - a.z ) * t ];
			const [ dx0, dz0 ] = lerp( t0 ), [ dx1, dz1 ] = lerp( t1 );
			quad( dx0, dz0, dx1, dz1, g0, b.ground + 3, 0, 1, - 0.2, 1, P );                                 // porte
			quad( a.x, a.z, dx0, dz0, g0, b.ground + 3, 0, mid, - 0.2, 1, { p: pos, u: uv, i: idx } );      // reste du rez
			quad( dx1, dz1, c.x, c.z, g0, b.ground + 3, mid + 1, bays, - 0.2, 1, { p: pos, u: uv, i: idx } );
			if ( floorsV > 1 ) quad( a.x, a.z, c.x, c.z, b.ground + 3, top, 0, bays, 1, floorsV, { p: pos, u: uv, i: idx } );
		} else quad( a.x, a.z, c.x, c.z, g0, top, 0, bays, - 0.2, floorsV, P );
	} );
	const mk = ( p, u, i, mat ) => {
		if ( ! i.length ) return;
		const geo = new THREE.BufferGeometry();
		geo.setAttribute( 'position', new THREE.Float32BufferAttribute( p, 3 ) );
		geo.setAttribute( 'uv', new THREE.Float32BufferAttribute( u, 2 ) );
		geo.setIndex( i ); geo.computeVertexNormals();
		group.add( new THREE.Mesh( geo, mat ) );
	};
	mk( pos, uv, idx, M.wall );
	mk( doorPos, doorUv, doorIdx, M.door );

	// toit : à quatre pans pour les maisons, plat avec acrotère pour les immeubles
	const cx = pts.reduce( ( n, p ) => n + p.x, 0 ) / pts.length, cz = pts.reduce( ( n, p ) => n + p.z, 0 ) / pts.length;
	const house = b.house;
	const shape = new THREE.Shape( pts.map( ( p ) => new THREE.Vector2( p.x, - p.z ) ) );
	if ( house ) {
		const rh = Math.min( 4, Math.sqrt( b.area ) * 0.45 ), k = 0.35; // hauteur et pincement du faîte
		const rp = [], ru = [], ri = [];
		const n = pts.length, eave = 0.35;
		pts.forEach( ( a, i ) => {
			const c = pts[ ( i + 1 ) % n ];
			// débord de toit : on pousse les points vers l'extérieur
			const ea = { x: a.x + ( a.x - cx ) * eave / ( Math.hypot( a.x - cx, a.z - cz ) || 1 ), z: a.z + ( a.z - cz ) * eave / ( Math.hypot( a.x - cx, a.z - cz ) || 1 ) };
			const ec = { x: c.x + ( c.x - cx ) * eave / ( Math.hypot( c.x - cx, c.z - cz ) || 1 ), z: c.z + ( c.z - cz ) * eave / ( Math.hypot( c.x - cx, c.z - cz ) || 1 ) };
			const ta = { x: cx + ( a.x - cx ) * k, z: cz + ( a.z - cz ) * k }, tc = { x: cx + ( c.x - cx ) * k, z: cz + ( c.z - cz ) * k };
			const base = rp.length / 3;
			rp.push( ea.x, top, ea.z, ec.x, top, ec.z, tc.x, top + rh, tc.z, ta.x, top + rh, ta.z );
			const len = Math.hypot( c.x - a.x, c.z - a.z );
			ru.push( 0, 0, len / 2, 0, len / 2 * ( 0.5 + k ), rh / 1.5, len / 2 * ( 0.5 - k ), rh / 1.5 );
			if ( ccw ) ri.push( base, base + 2, base + 1, base, base + 3, base + 2 ); else ri.push( base, base + 1, base + 2, base, base + 2, base + 3 );
		} );
		mk( rp, ru, ri, M.roof );
		// dessus (petite surface plate au faîte)
		const capShape = new THREE.Shape( pts.map( ( p ) => new THREE.Vector2( cx + ( p.x - cx ) * k, - ( cz + ( p.z - cz ) * k ) ) ) );
		const cap = new THREE.Mesh( new THREE.ShapeGeometry( capShape ).rotateX( - Math.PI / 2 ).translate( 0, top + rh, 0 ), M.roof );
		group.add( cap );
	} else {
		const roof = new THREE.Mesh( new THREE.ShapeGeometry( shape ).rotateX( - Math.PI / 2 ).translate( 0, top, 0 ), M.flat );
		group.add( roof );
		const par = new THREE.Mesh( new THREE.ExtrudeGeometry( shape, { depth: 0.6, bevelEnabled: false } ).rotateX( - Math.PI / 2 ).translate( 0, top, 0 ), M.flat );
		par.scale.set( 1, 1, 1 );
		group.add( par );
	}
	return group;
}

// --- arbre (silhouette arrondie, feuillage en plusieurs masses) ---------------------------------------------
const trunkMat = new THREE.MeshStandardMaterial( { color: 0x4a3626, roughness: 0.95 } );
const leafMats = [ 0x3f6b2e, 0x4e7a34, 0x355f2a, 0x5b7f3a ].map( ( c ) => new THREE.MeshStandardMaterial( { color: c, roughness: 0.9, flatShading: true } ) );
function treeMesh( rnd, autumn ) {
	const g = new THREE.Group();
	const h = 6 + rnd() * 7, r = 1.8 + rnd() * 2.2;
	const trunk = new THREE.Mesh( new THREE.CylinderGeometry( 0.14, 0.24, h * 0.55, 8 ).translate( 0, h * 0.275, 0 ), trunkMat );
	g.add( trunk );
	const mat = autumn ? new THREE.MeshStandardMaterial( { color: [ 0x9c6a2a, 0xb7832f, 0x7f5a2a, 0x6b7a35 ][ Math.floor( rnd() * 4 ) ], roughness: 0.9, flatShading: true } ) : leafMats[ Math.floor( rnd() * leafMats.length ) ];
	for ( let i = 0; i < 5; i ++ ) {
		const s = r * ( 0.55 + rnd() * 0.4 );
		const blob = new THREE.Mesh( new THREE.IcosahedronGeometry( s, 1 ), mat );
		blob.position.set( ( rnd() - 0.5 ) * r, h * 0.6 + rnd() * h * 0.35, ( rnd() - 0.5 ) * r );
		blob.scale.y = 0.8 + rnd() * 0.3;
		g.add( blob );
	}
	return g;
}

export class CityGen {

	// geo = { here(), toLocal(lat, lon, target), groundAt(x, z), roofAt(x, z), Vector3 }
	constructor( scene, geo ) {
		this.geo = geo;
		this.group = new THREE.Group();
		scene.add( this.group );
		this.items = [];
		this.center = null;
		this.loading = false;
		this.built = 0;
	}

	reset() {
		this.group.traverse( ( o ) => { if ( o.geometry ) o.geometry.dispose(); } );
		this.group.clear();
		this.items = []; this.center = null; this.built = 0;
	}

	async load( c ) {
		this.loading = true;
		this.center = c;
		const d = RADIUS / 111320, e = d / Math.cos( c.lat * Math.PI / 180 );
		const bbox = [ c.lat - d, c.lon - e, c.lat + d, c.lon + e ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
		const q = `[out:json][timeout:25];(way["building"](${ bbox });node["natural"="tree"](${ bbox }););out geom;`;
		try {
			const els = this.geo.fake ? this.geo.fake() : await osmArea( c.lat, c.lon );
			if ( this.center !== c ) { this.loading = false; return; }
			const P = new this.geo.Vector3();
			for ( const el of els ) {
				if ( el.type === 'node' && el.tags?.natural === 'tree' ) {
					this.geo.toLocal( el.lat, el.lon, P );
					this.items.push( { type: 'tree', x: P.x, z: P.z, id: el.id, state: 'new' } );
				} else if ( el.type === 'way' && el.tags?.building && el.geometry?.length > 3 ) {
					const pts = el.geometry.map( ( g ) => { this.geo.toLocal( g.lat, g.lon, P ); return { x: P.x, z: P.z }; } );
					let area = 0, cx = 0, cz = 0;
					for ( let i = 0; i < pts.length - 1; i ++ ) { area += pts[ i ].x * pts[ i + 1 ].z - pts[ i + 1 ].x * pts[ i ].z; cx += pts[ i ].x; cz += pts[ i ].z; }
					cx /= pts.length - 1; cz /= pts.length - 1;
					const t = el.tags;
					const levels = parseFloat( t[ 'building:levels' ] );
					const small = Math.abs( area / 2 ) < 25 || /^(garage|garages|shed|carport|hut|kiosk|roof)$/.test( t.building );
					let h = parseFloat( t.height ) || ( levels ? levels * 3 : small ? 2.6 : Math.abs( area / 2 ) < 160 ? 6 + ( el.id % 3 ) : 9 + ( el.id % 4 ) * 3 );
					const house = ! small && ( /^(house|detached|semidetached_house|terrace|residential|yes)$/.test( t.building ) && Math.abs( area / 2 ) < 260 ) && t[ 'roof:shape' ] !== 'flat';
					this.items.push( { type: 'building', id: el.id, pts, ccw: area > 0, area: Math.abs( area / 2 ), cx, cz, h, house, ground: null, state: 'new' } );
				}
			}
		} catch { this.center = null; }
		this.loading = false;
	}

	update( pos ) {
		const here = this.geo.here();
		if ( ! this.loading && ( ! this.center || Math.hypot( ( here.lat - this.center.lat ) * 111320, ( here.lon - this.center.lon ) * 111320 * Math.cos( here.lat * Math.PI / 180 ) ) > RADIUS * 0.5 ) ) {
			this.reset(); this.load( here );
		}
		// quelques vérifications par image, en commençant par ce qui est proche
		let budget = 14;
		const autumn = new Date().getMonth() >= 9 || new Date().getMonth() <= 1;
		for ( const it of this.items ) {
			if ( budget <= 0 ) break;
			if ( it.state !== 'new' ) continue;
			const x = it.type === 'tree' ? it.x : it.cx, z = it.type === 'tree' ? it.z : it.cz;
			if ( Math.hypot( x - pos.x, z - pos.z ) > 320 ) continue;
			budget --;
			if ( it.type === 'tree' ) {
				const g = this.geo.groundAt( x, z ), top = this.geo.roofAt( x, z );
				if ( g === null || top === null ) continue;
				it.state = 'done';
				if ( top - g > 3 ) continue; // l'arbre existe déjà dans la 3D Google
				let seed = it.id % 2147483646 + 1; const rnd = () => ( seed = seed * 16807 % 2147483647 ) / 2147483647;
				const t = treeMesh( rnd, autumn ); t.position.set( x, g, z ); this.group.add( t );
				continue;
			}
			// sol : devant la plus longue façade ; toit : rayon au centre
			if ( it.ground === null ) {
				const a = it.pts[ 0 ], c = it.pts[ 1 ];
				const nx = ( c.z - a.z ), nz = - ( c.x - a.x ), l = Math.hypot( nx, nz ) || 1, s = it.ccw ? 1 : - 1;
				const g = this.geo.groundAt( ( a.x + c.x ) / 2 + s * nx / l * 2.5, ( a.z + c.z ) / 2 + s * nz / l * 2.5 );
				if ( g === null ) continue;
				it.ground = g;
			}
			const roof = this.geo.roofAt( it.cx, it.cz );
			if ( roof === null ) continue;
			it.state = 'done';
			if ( roof - it.ground > 2.2 ) continue; // déjà en 3D chez Google
			let seed = it.id % 2147483646 + 1; const rnd = () => ( seed = seed * 16807 % 2147483647 ) / 2147483647;
			this.group.add( buildingMesh( it, rnd ) );
			this.built ++;
			if ( this.built === 3 ) this.onStatus?.( '🏗️ Pas de 3D Google ici : le jeu construit les bâtiments' );
		}
	}

}
