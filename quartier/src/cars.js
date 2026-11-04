// Voitures et trams lisses, fabriqués par « sculpture » : la carrosserie est une suite de sections
// arrondies (super-ellipses) le long de la voiture, comme les couples d'une coque de bateau.
// Plusieurs silhouettes inspirées des voitures qu'on croise à Bruxelles (sans logos) :
// citadine, compacte, berline, break, SUV, mini, et de temps en temps une supercar.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- vrais modèles 3D (facultatif) ----------------------------------------------------------------------
// Dépose des fichiers .glb dans quartier/models/cars/ et liste-les dans quartier/models/cars/list.json :
// [ { "file": "clio.glb", "length": 4.05, "rotate": 0, "weight": 3 }, … ]
// length = longueur réelle en mètres ; rotate = degrés pour que l'avant regarde vers -z.
export const customCars = [];
export async function loadCustomCars() {
	try {
		const res = await fetch( 'models/cars/list.json' );
		if ( ! res.ok ) return;
		const list = await res.json();
		const loader = new GLTFLoader();
		for ( const e of list ) {
			try {
				const gltf = await loader.loadAsync( 'models/cars/' + e.file );
				const root = gltf.scene;
				root.rotation.y = ( e.rotate || 0 ) * Math.PI / 180;
				root.updateMatrixWorld( true );
				const box = new THREE.Box3().setFromObject( root ), size = box.getSize( new THREE.Vector3() );
				const k = ( e.length || 4.3 ) / Math.max( size.x, size.z );
				root.scale.multiplyScalar( k );
				root.updateMatrixWorld( true );
				box.setFromObject( root );
				const c = box.getCenter( new THREE.Vector3() );
				const holder = new THREE.Group();
				root.position.sub( new THREE.Vector3( c.x, box.min.y, c.z ) );
				holder.add( root );
				holder.userData.half = ( box.max.z - box.min.z ) / 2;
				for ( let i = 0; i < ( e.weight || 1 ); i ++ ) customCars.push( holder );
			} catch { /* fichier illisible : ignoré */ }
		}
	} catch { /* pas de liste : voitures fabriquées seulement */ }
}

// --- silhouettes ----------------------------------------------------------------------------------
// L longueur, W largeur, H hauteur du toit, belt ligne de caisse, hood hauteur du capot à l'avant,
// a/b/c/d : début pare-brise, haut pare-brise, fin du toit, bas de lunette (en fraction de longueur
// depuis l'avant), wheel rayon des roues, clear garde au sol, tail : hauteur du coffre à l'arrière.
export const TYPES = {
	citadine: { w: 30, L: 4.05, W: 1.75, H: 1.45, belt: 0.95, hood: 0.78, tail: 0.98, a: 0.24, b: 0.43, c: 0.78, d: 0.97, wheel: 0.31, clear: 0.15, colors: [ 0xf4f4f2, 0x1b1c1f, 0x9aa0a6, 0xc0392b, 0x2e5c9a, 0xe7e1d3, 0x4b5320 ] },
	compacte: { w: 20, L: 4.35, W: 1.8, H: 1.47, belt: 0.98, hood: 0.8, tail: 1.0, a: 0.25, b: 0.44, c: 0.8, d: 0.97, wheel: 0.33, clear: 0.15, colors: [ 0xf4f4f2, 0x111214, 0x5d6168, 0x9aa0a6, 0x1f3b63, 0x7a1f1f ] },
	berline: { w: 15, L: 4.85, W: 1.84, H: 1.44, belt: 1.0, hood: 0.84, tail: 1.02, a: 0.3, b: 0.47, c: 0.7, d: 0.84, wheel: 0.34, clear: 0.14, colors: [ 0x0d0e10, 0x1b1c1f, 0x2b2f36, 0x8d939a, 0xe9e9e6, 0x1c2c4a ] },
	break: { w: 10, L: 4.75, W: 1.86, H: 1.5, belt: 1.0, hood: 0.84, tail: 1.05, a: 0.28, b: 0.45, c: 0.92, d: 0.98, wheel: 0.34, clear: 0.15, colors: [ 0x1b1c1f, 0x8d939a, 0x4f5b66, 0xe9e9e6, 0x5a3e2b, 0x2a3a2e ] },
	suv: { w: 18, L: 4.55, W: 1.86, H: 1.68, belt: 1.12, hood: 0.98, tail: 1.12, a: 0.27, b: 0.43, c: 0.88, d: 0.98, wheel: 0.37, clear: 0.2, colors: [ 0xf4f4f2, 0x1b1c1f, 0x6c7178, 0x8a1f1f, 0x2d4a3e, 0x3d5a80 ] },
	mini: { w: 5, L: 3.85, W: 1.73, H: 1.42, belt: 0.98, hood: 0.86, tail: 1.0, a: 0.25, b: 0.4, c: 0.88, d: 0.98, wheel: 0.3, clear: 0.15, roof: 0xf4f4f2, colors: [ 0x8a1c1c, 0x1d4d2a, 0x1e2d4a, 0xc8a12b, 0x7f8c8d ] },
	supercar: { w: 2, L: 4.6, W: 2.0, H: 1.15, belt: 0.82, hood: 0.62, tail: 0.95, a: 0.27, b: 0.5, c: 0.62, d: 0.9, wheel: 0.35, clear: 0.11, colors: [ 0xd8231a, 0xf1c40f, 0xff7a00, 0x2ecc71, 0x111111, 0xe8e8e8 ] },
};

export function randomType() {
	const list = Object.entries( TYPES );
	let r = Math.random() * list.reduce( ( n, [ , t ] ) => n + t.w, 0 );
	for ( const [ name, t ] of list ) { r -= t.w; if ( r <= 0 ) return name; }
	return 'citadine';
}

const smooth = ( e0, e1, x ) => { const t = Math.min( 1, Math.max( 0, ( x - e0 ) / ( e1 - e0 ) ) ); return t * t * ( 3 - 2 * t ); };
const se = ( c, n ) => Math.sign( c ) * Math.pow( Math.abs( c ), 2 / n ); // super-ellipse

// Coque : rings × segs sommets ; f(u) donne la section à la position u ∈ [0, 1] (avant → arrière)
// { y0, y1 (bas / haut), w (demi-largeur), n (rondeur), shade(θ, u) -> couleur }
function loft( rings, segs, f ) {
	const pos = [], col = [], idx = [];
	for ( let i = 0; i <= rings; i ++ ) {
		const u = i / rings, s = f( u );
		for ( let j = 0; j < segs; j ++ ) {
			const th = j / segs * Math.PI * 2;
			const c = Math.cos( th ), sn = Math.sin( th );
			const x = s.w * se( c, s.n ), yy = ( s.y0 + s.y1 ) / 2 + ( s.y1 - s.y0 ) / 2 * se( sn, s.n );
			pos.push( x, yy, s.z );
			const k = s.shade( th, u, x, yy );
			col.push( k.r, k.g, k.b );
		}
	}
	for ( let i = 0; i < rings; i ++ ) for ( let j = 0; j < segs; j ++ ) {
		const a = i * segs + j, b = i * segs + ( j + 1 ) % segs, c = a + segs, d = b + segs;
		idx.push( a, b, c, b, d, c ); // faces tournées vers l'extérieur
	}
	// bouchons avant / arrière
	for ( const [ ring, flip ] of [ [ 0, true ], [ rings, false ] ] ) {
		const center = pos.length / 3, s = f( ring / rings );
		pos.push( 0, ( s.y0 + s.y1 ) / 2, s.z );
		const k = s.shade( 0, ring / rings, 0, ( s.y0 + s.y1 ) / 2 ); col.push( k.r, k.g, k.b );
		for ( let j = 0; j < segs; j ++ ) {
			const a = ring * segs + j, b = ring * segs + ( j + 1 ) % segs;
			if ( flip ) idx.push( center, b, a ); else idx.push( center, a, b );
		}
	}
	const g = new THREE.BufferGeometry();
	g.setAttribute( 'position', new THREE.Float32BufferAttribute( pos, 3 ) );
	g.setAttribute( 'color', new THREE.Float32BufferAttribute( col, 3 ) );
	g.setIndex( idx );
	g.computeVertexNormals();
	return g;
}

const WHITE = new THREE.Color( 1, 1, 1 ), GLASS = new THREE.Color( 0.05, 0.06, 0.075 ), BLACK = new THREE.Color( 0.04, 0.04, 0.045 ),
	HEAD = new THREE.Color( 2.2, 2.15, 2.0 ), TAIL = new THREE.Color( 0.7, 0.03, 0.02 ), GRILLE = new THREE.Color( 0.06, 0.06, 0.07 );

const LENS_HEAD = new THREE.MeshStandardMaterial( { color: 0xeef3f8, roughness: 0.1, metalness: 0.3 } );
const LENS_TAIL = new THREE.MeshStandardMaterial( { color: 0x9a0d0d, roughness: 0.25, metalness: 0.1, emissive: 0x3a0000 } );

// --- matériaux partagés --------------------------------------------------------------------------
let ENV = null;
const paints = new Map();
export function carEnv( renderer ) {
	if ( ! ENV ) {
		const pm = new THREE.PMREMGenerator( renderer );
		ENV = pm.fromScene( new RoomEnvironment(), 0.04 ).texture;
		pm.dispose();
	}
	return ENV;
}
export function paint( hex, renderer ) {
	if ( ! paints.has( hex ) ) {
		paints.set( hex, new THREE.MeshStandardMaterial( { color: hex, vertexColors: true, metalness: 0.55, roughness: 0.32, envMap: carEnv( renderer ), envMapIntensity: 0.9 } ) );
	}
	return paints.get( hex );
}
let rubber, alloy;
function wheelMats( renderer ) {
	rubber ??= new THREE.MeshStandardMaterial( { color: 0x151515, roughness: 0.9, metalness: 0 } );
	alloy ??= new THREE.MeshStandardMaterial( { color: 0xb8bcc2, roughness: 0.28, metalness: 0.9, envMap: carEnv( renderer ) } );
	return { rubber, alloy };
}
export const allCarMaterials = () => [ ...paints.values(), rubber, alloy ].filter( Boolean );

// --- voiture -----------------------------------------------------------------------------------------
export function makeCar( renderer, typeName = randomType() ) {
	if ( customCars.length && Math.random() < 0.8 ) {
		const g = customCars[ Math.floor( Math.random() * customCars.length ) ].clone( true );
		g.userData.half = g.userData.half || 2.2;
		g.userData.radius = 0.33;
		return g;
	}
	const T = TYPES[ typeName ];
	const L = T.L * ( 0.97 + Math.random() * 0.06 ), W = T.W, hl = L / 2, hw = W / 2;
	const color = T.colors[ Math.floor( Math.random() * T.colors.length ) ];
	const roofColor = T.roof && Math.random() < 0.6 ? new THREE.Color( T.roof ).multiply( new THREE.Color( 1 / ( ( color >> 16 & 255 ) / 255 + 0.02 ), 1 / ( ( color >> 8 & 255 ) / 255 + 0.02 ), 1 / ( ( color & 255 ) / 255 + 0.02 ) ) ) : null;
	const wheelZ = [ - hl + L * 0.18, hl - L * 0.19 ];
	const R = T.wheel;

	// caisse (sous la ligne de caisse) : capot à l'avant, coffre à l'arrière, côtés bombés
	const body = loft( 48, 32, ( u ) => {
		const z = - hl + u * L;
		// avant et arrière arrondis : la section se resserre vers les bouts (pas de « bouchon » plat)
		const fr = Math.sqrt( smooth( 0, 0.07, u ) ), bk = Math.sqrt( smooth( 0, 0.05, 1 - u ) );
		const end = fr * bk;
		const top = T.hood + ( T.belt - T.hood ) * smooth( 0.08, T.a + 0.02, u ) + ( T.tail - T.belt ) * smooth( T.d - 0.06, 1, u );
		// passages de roue : la caisse « s'ouvre » au-dessus de chaque roue, qui reste bien visible
		let y0 = T.clear + 0.1 * ( 1 - end );
		for ( const wz of wheelZ ) {
			const k = 1 - ( ( z - wz ) / ( R * 1.18 ) ) ** 2;
			if ( k > 0 ) y0 = Math.max( y0, Math.min( top - 0.28, T.clear + R + R * 1.06 * Math.sqrt( k ) - R * 0.2 ) );
		}
		const y1 = top - 0.12 * ( 1 - end );
		const w = hw * ( 0.62 + 0.38 * end );
		return {
			z, y0, y1, w, n: 5.5,
			shade: ( th, uu, x, y ) => {
				// passages de roue sombres, calandre, bas de caisse
				if ( uu < 0.03 && Math.abs( x ) < w * 0.45 && y < top - 0.14 && y > y0 + 0.1 ) return GRILLE;
				if ( y < y0 + 0.06 ) return BLACK;
				return WHITE;
			},
		};
	} );

	// habitacle : pare-brise incliné, toit, lunette ; vitres sombres, toit couleur carrosserie
	const span = T.d - T.a;
	const cabin = loft( 30, 24, ( u ) => {
		const uu = T.a + u * span;
		const z = - hl + uu * L;
		const rise = smooth( T.a, T.b, uu ) * ( 1 - smooth( T.c, T.d, uu ) );
		const y1 = T.belt + ( T.H - T.belt ) * ( 0.06 + 0.94 * rise );
		const w = hw * ( 0.9 - 0.12 * rise );
		return {
			z, y0: T.belt - 0.12, y1, w, n: 4.2,
			shade: ( th, u2, x, y ) => ( y > y1 - 0.06 && rise > 0.6 ? ( roofColor || WHITE ) : y > T.belt - 0.02 ? GLASS : WHITE ),
		};
	} );

	const mat = paint( color, renderer );
	const g = new THREE.Group();
	g.add( new THREE.Mesh( body, mat ), new THREE.Mesh( cabin, mat ) );

	// roues : pneu arrondi + jante alu à rayons
	const { rubber: rb, alloy: al } = wheelMats( renderer );
	const tire = new THREE.TorusGeometry( R * 0.78, R * 0.24, 10, 24 ).rotateY( Math.PI / 2 );
	const rim = new THREE.CylinderGeometry( R * 0.62, R * 0.62, 0.16, 20 ).rotateZ( Math.PI / 2 );
	const spokes = new THREE.BoxGeometry( 0.05, R * 1.1, 0.07 );
	for ( const wz of wheelZ ) for ( const sx of [ - 1, 1 ] ) {
		const wheel = new THREE.Group();
		wheel.add( new THREE.Mesh( tire, rb ), new THREE.Mesh( rim, al ) );
		for ( let k = 0; k < 5; k ++ ) { const sp = new THREE.Mesh( spokes, al ); sp.rotation.x = k * Math.PI / 5; sp.position.x = sx * 0.06; wheel.add( sp ); }
		wheel.position.set( sx * ( hw * 0.9 - 0.1 ), T.clear + R, wz );
		g.add( wheel );
		( g.userData.wheels ||= [] ).push( wheel );
	}
	// phares et feux : petites optiques en relief (les phares s'allument vraiment la nuit, voir traffic.js)
	const lens = new THREE.SphereGeometry( 1, 14, 8 );
	const headTop = T.hood - 0.1, tailTop = T.tail - 0.14;
	for ( const sx of [ - 1, 1 ] ) {
		const h1 = new THREE.Mesh( lens, LENS_HEAD );
		h1.scale.set( 0.2, 0.065, 0.08 ); h1.position.set( sx * hw * 0.62, headTop, - hl + 0.16 ); h1.rotation.y = sx * 0.35;
		const t1 = new THREE.Mesh( lens, LENS_TAIL );
		t1.scale.set( 0.2, 0.06, 0.06 ); t1.position.set( sx * hw * 0.64, tailTop, hl - 0.12 ); t1.rotation.y = - sx * 0.35;
		g.add( h1, t1 );
	}
	// rétroviseurs
	const mirror = new THREE.SphereGeometry( 0.09, 10, 8 ).scale( 1.3, 0.8, 0.7 );
	for ( const sx of [ - 1, 1 ] ) {
		const m = new THREE.Mesh( mirror, mat );
		m.position.set( sx * ( hw * 0.98 ), T.belt + 0.08, - hl + L * ( T.a + 0.02 ) );
		g.add( m );
	}
	g.userData.radius = R;
	g.userData.half = hl;
	return g;
}

// --- tram : modules articulés, nez arrondi, grande bande vitrée -------------------------------------
export function makeTram( renderer ) {
	const L = 32, hl = L / 2, W = 2.3, hw = W / 2;
	const body = loft( 90, 26, ( u ) => {
		const z = - hl + u * L;
		const nose = Math.sqrt( smooth( 0, 0.04, u ) * smooth( 0, 0.04, 1 - u ) );
		const w = hw * ( 0.6 + 0.4 * nose );
		return {
			z, y0: 0.35 + 0.1 * ( 1 - nose ), y1: 3.35 - 0.45 * ( 1 - nose ), w, n: 6,
			shade: ( th, uu, x, y ) => {
				const joint = [ 0.25, 0.5, 0.75 ].some( ( j ) => Math.abs( uu - j ) < 0.006 );
				if ( joint ) return BLACK;
				if ( ( uu < 0.035 || uu > 0.965 ) && y > 1.5 && y < 3.0 ) return GLASS;           // pare-brise
				if ( y > 1.35 && y < 2.75 && Math.abs( x ) > w * 0.8 ) return GLASS;               // fenêtres
				if ( y > 1.18 && y < 1.32 ) return new THREE.Color( 0.75, 0.08, 0.1 );           // bande rouge
				if ( y < 0.5 ) return BLACK;
				return WHITE;
			},
		};
	} );
	const mat = paint( 0xdfe2e6, renderer );
	const g = new THREE.Group();
	g.add( new THREE.Mesh( body, mat ) );
	const pant = new THREE.Mesh( new THREE.BoxGeometry( 0.08, 0.7, 1.8 ).translate( 0, 3.75, 0 ), paint( 0x2a2a2a, renderer ) );
	g.add( pant );
	g.userData.half = hl;
	return g;
}
