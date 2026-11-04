// Intérieurs de magasins : quand on entre dans un vrai commerce du quartier (nom et type venant
// d'OpenStreetMap), on se retrouve dans un intérieur fabriqué selon son type : boulangerie,
// supermarché, pharmacie, café, vêtements… On prend des articles, on paye à la caisse.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// --- catalogue (prix réalistes en Belgique) ---------------------------------------------------------
const CATALOG = {
	boulangerie: [
		[ 'Baguette', 1.6, 'baguette', 0xd59a4a ], [ 'Croissant', 1.3, 'croissant', 0xd9973d ], [ 'Pain au chocolat', 1.5, 'loaf', 0xc98a3c ],
		[ 'Pain gris', 3.2, 'loaf', 0x8a5a2f ], [ 'Cramique', 4.5, 'loaf', 0xc28a42 ], [ 'Éclair au chocolat', 2.9, 'eclair', 0x5a3320 ],
		[ 'Tarte au riz', 3.5, 'tart', 0xe8c97a ], [ 'Cougnou', 4.2, 'loaf', 0xd8a75a ], [ 'Pistolet', 0.6, 'roll', 0xd9a457 ],
	],
	supermarche: [
		[ 'Lait demi-écrémé 1 L', 1.15, 'carton', 0x2a6fd1 ], [ 'Eau plate 1,5 L', 0.65, 'bottle', 0x7fc4ff ], [ 'Coca 1,5 L', 2.2, 'bottle', 0xb3141b ],
		[ 'Bière (6 × 25 cl)', 6.5, 'can', 0xd9a520 ], [ 'Chips paprika', 2.1, 'bag', 0xe0302a ], [ 'Spéculoos', 2.4, 'box', 0xb5652b ],
		[ 'Chocolat noir', 2.8, 'box', 0x3b2416 ], [ 'Céréales', 3.9, 'box', 0xe7a52c ], [ 'Pâtes 500 g', 1.4, 'box', 0x1d4f9c ],
		[ 'Sauce tomate', 1.9, 'jar', 0xc0392b ], [ 'Pommes (1 kg)', 2.6, 'fruit', 0xc0392b ], [ 'Bananes (1 kg)', 1.9, 'banana', 0xf1c40f ],
		[ 'Oranges (1 kg)', 2.9, 'fruit', 0xf39c12 ], [ 'Jus d\'orange 1 L', 2.5, 'carton', 0xf39c12 ], [ 'Café moulu', 5.9, 'bag', 0x4a2c1a ],
		[ 'Fromage', 3.6, 'box', 0xf3d36b ], [ 'Yaourts (×4)', 2.3, 'box', 0xeeeeee ], [ 'Gaufres', 3.3, 'box', 0xd8a04a ],
	],
	pharmacie: [
		[ 'Paracétamol', 3.9, 'smallbox', 0x2e86de ], [ 'Pastilles gorge', 6.5, 'smallbox', 0x27ae60 ], [ 'Crème mains', 7.9, 'tube', 0xf5f5f5 ],
		[ 'Vitamine C', 8.5, 'smallbox', 0xf39c12 ], [ 'Pansements', 4.2, 'smallbox', 0xe74c3c ], [ 'Gel désinfectant', 3.5, 'bottle', 0x74b9ff ],
		[ 'Spray nasal', 7.2, 'smallbox', 0x6c5ce7 ], [ 'Crème solaire', 14.9, 'tube', 0xfdcb6e ], [ 'Brosse à dents', 3.2, 'smallbox', 0x00cec9 ],
	],
	cafe: [
		[ 'Expresso', 2.5, 'cup', 0xffffff ], [ 'Cappuccino', 3.6, 'cup', 0xffffff ], [ 'Chocolat chaud', 3.8, 'cup', 0xffffff ],
		[ 'Thé', 3.0, 'cup', 0xffffff ], [ 'Gaufre de Liège', 3.5, 'tart', 0xd8a04a ], [ 'Croque-monsieur', 7.5, 'loaf', 0xd9a457 ],
		[ 'Jus pressé', 4.8, 'glass', 0xf39c12 ], [ 'Bière pression', 3.9, 'glass', 0xe1a52a ], [ 'Cookie', 2.5, 'roll', 0x9c6b3c ],
	],
	vetements: [
		[ 'T-shirt', 15.9, 'shirt', 0xffffff ], [ 'Pull', 39.9, 'shirt', 0x2c3e50 ], [ 'Hoodie', 49.9, 'shirt', 0x7f8c8d ],
		[ 'Jean', 59.9, 'pants', 0x2c4a7a ], [ 'Veste', 89.9, 'shirt', 0x1b1b1b ], [ 'Baskets', 79.9, 'shoe', 0xf5f5f5 ],
		[ 'Bonnet', 14.9, 'roll', 0xc0392b ], [ 'Écharpe', 19.9, 'carton', 0x8e44ad ], [ 'Chaussettes', 7.9, 'smallbox', 0x34495e ],
	],
	autre: [
		[ 'Article', 9.9, 'box', 0x3d6ea8 ], [ 'Petit article', 4.5, 'smallbox', 0xc0392b ], [ 'Grand article', 24.9, 'box', 0x27ae60 ],
		[ 'Cadeau', 15.0, 'box', 0x8e44ad ], [ 'Accessoire', 7.9, 'smallbox', 0xf39c12 ],
	],
};

export function shopKind( tags ) {
	const s = tags.shop || '', a = tags.amenity || '';
	if ( /bakery|pastry|confectionery/.test( s ) ) return 'boulangerie';
	if ( /supermarket|convenience|greengrocer|deli|butcher|alcohol|beverages|general|frozen_food|wine/.test( s ) ) return 'supermarche';
	if ( a === 'pharmacy' || /chemist|cosmetics|medical|optician/.test( s ) ) return 'pharmacie';
	if ( /^(cafe|restaurant|fast_food|bar|pub|ice_cream)$/.test( a ) ) return 'cafe';
	if ( /clothes|shoes|sports|fashion|boutique|bag/.test( s ) ) return 'vetements';
	return 'autre';
}
export const KIND_LABEL = { boulangerie: 'Boulangerie', supermarche: 'Supermarché', pharmacie: 'Pharmacie', cafe: 'Café', vetements: 'Vêtements', autre: 'Magasin' };

// --- textures fabriquées --------------------------------------------------------------------------
function canvasTex( w, h, draw, repeat ) {
	const c = document.createElement( 'canvas' ); c.width = w; c.height = h;
	draw( c.getContext( '2d' ), w, h );
	const t = new THREE.CanvasTexture( c );
	t.colorSpace = THREE.SRGBColorSpace;
	t.anisotropy = 8;
	if ( repeat ) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set( repeat[ 0 ], repeat[ 1 ] ); }
	return t;
}
const floorTiles = ( a, b, rep ) => canvasTex( 256, 256, ( g, w, h ) => {
	for ( let y = 0; y < 4; y ++ ) for ( let x = 0; x < 4; x ++ ) {
		g.fillStyle = ( x + y ) % 2 ? a : b; g.fillRect( x * 64, y * 64, 64, 64 );
		g.fillStyle = 'rgba(255,255,255,0.05)'; g.fillRect( x * 64 + 6, y * 64 + 6, 30, 20 );
	}
	g.strokeStyle = 'rgba(0,0,0,0.18)'; g.lineWidth = 2;
	for ( let i = 0; i <= 4; i ++ ) { g.beginPath(); g.moveTo( i * 64, 0 ); g.lineTo( i * 64, h ); g.moveTo( 0, i * 64 ); g.lineTo( w, i * 64 ); g.stroke(); }
}, rep );
const woodFloor = ( rep ) => canvasTex( 256, 256, ( g ) => {
	for ( let i = 0; i < 8; i ++ ) {
		const l = 40 + Math.random() * 16;
		g.fillStyle = `hsl(28, 38%, ${ l }%)`; g.fillRect( 0, i * 32, 256, 32 );
		g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect( 0, i * 32, 256, 2 ); g.fillRect( ( i * 97 ) % 256, i * 32, 2, 32 );
		for ( let k = 0; k < 18; k ++ ) { g.fillStyle = `rgba(60,30,10,${ Math.random() * 0.12 })`; g.fillRect( Math.random() * 256, i * 32 + Math.random() * 30, 40 + Math.random() * 60, 1 ); }
	}
}, rep );
const plaster = ( col ) => canvasTex( 128, 128, ( g ) => {
	g.fillStyle = col; g.fillRect( 0, 0, 128, 128 );
	for ( let i = 0; i < 900; i ++ ) { g.fillStyle = `rgba(0,0,0,${ Math.random() * 0.035 })`; g.fillRect( Math.random() * 128, Math.random() * 128, 2, 2 ); }
}, [ 4, 2 ] );

const labelCache = new Map();
function labelTex( name, color ) {
	const k = name + color;
	if ( labelCache.has( k ) ) return labelCache.get( k );
	const c = new THREE.Color( color );
	const t = canvasTex( 128, 128, ( g ) => {
		g.fillStyle = '#' + c.getHexString(); g.fillRect( 0, 0, 128, 128 );
		g.fillStyle = 'rgba(255,255,255,0.88)'; g.fillRect( 8, 40, 112, 48 );
		g.fillStyle = '#222'; g.font = 'bold 15px system-ui, sans-serif'; g.textAlign = 'center';
		const words = name.split( ' ' );
		g.fillText( words.slice( 0, 2 ).join( ' ' ), 64, 60 );
		if ( words.length > 2 ) g.fillText( words.slice( 2 ).join( ' ' ), 64, 78 );
		g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect( 0, 0, 128, 14 );
	} );
	labelCache.set( k, t );
	return t;
}

// --- articles en 3D ---------------------------------------------------------------------------------
const std = ( o ) => new THREE.MeshStandardMaterial( { roughness: 0.6, metalness: 0, ...o } );
function productMesh( name, shape, color ) {
	const label = labelTex( name, color );
	let m;
	switch ( shape ) {
		case 'baguette': m = new THREE.Mesh( new THREE.CapsuleGeometry( 0.035, 0.5, 6, 12 ).rotateZ( Math.PI / 2 ), std( { color } ) ); break;
		case 'croissant': m = new THREE.Mesh( new THREE.TorusGeometry( 0.06, 0.03, 8, 14, Math.PI * 1.3 ), std( { color } ) ); m.rotation.x = - Math.PI / 2; break;
		case 'loaf': m = new THREE.Mesh( new THREE.CapsuleGeometry( 0.06, 0.12, 6, 12 ).rotateZ( Math.PI / 2 ).scale( 1, 0.8, 1 ), std( { color } ) ); break;
		case 'roll': m = new THREE.Mesh( new THREE.SphereGeometry( 0.05, 12, 8 ).scale( 1.2, 0.8, 1 ), std( { color } ) ); break;
		case 'eclair': m = new THREE.Mesh( new THREE.CapsuleGeometry( 0.025, 0.12, 6, 10 ).rotateZ( Math.PI / 2 ), std( { color } ) ); break;
		case 'tart': m = new THREE.Mesh( new THREE.CylinderGeometry( 0.12, 0.11, 0.035, 24 ), std( { color } ) ); break;
		case 'bottle': m = new THREE.Mesh( new THREE.LatheGeometry( [ [ 0, 0 ], [ 0.045, 0 ], [ 0.047, 0.2 ], [ 0.02, 0.27 ], [ 0.016, 0.31 ], [ 0, 0.31 ] ].map( ( [ x, y ] ) => new THREE.Vector2( x, y ) ), 16 ), std( { color, roughness: 0.15, transparent: true, opacity: 0.85 } ) ); m.position.y = - 0.15; break;
		case 'can': m = new THREE.Mesh( new THREE.CylinderGeometry( 0.033, 0.033, 0.12, 16 ), [ std( { map: label, metalness: 0.4, roughness: 0.3 } ), std( { color: 0xcccccc, metalness: 0.9, roughness: 0.3 } ), std( { color: 0xcccccc, metalness: 0.9 } ) ] ); break;
		case 'jar': m = new THREE.Mesh( new THREE.CylinderGeometry( 0.04, 0.04, 0.11, 16 ), [ std( { map: label } ), std( { color: 0xd4af37, metalness: 0.8 } ), std( { color } ) ] ); break;
		case 'fruit': m = new THREE.Mesh( new THREE.SphereGeometry( 0.04, 12, 10 ), std( { color, roughness: 0.4 } ) ); break;
		case 'banana': m = new THREE.Mesh( new THREE.TorusGeometry( 0.09, 0.018, 6, 12, Math.PI * 0.6 ), std( { color } ) ); break;
		case 'cup': m = new THREE.Mesh( new THREE.CylinderGeometry( 0.045, 0.035, 0.08, 16 ), std( { color: 0xffffff, roughness: 0.2 } ) ); break;
		case 'glass': m = new THREE.Mesh( new THREE.CylinderGeometry( 0.035, 0.03, 0.14, 16 ), std( { color, roughness: 0.1, transparent: true, opacity: 0.8 } ) ); break;
		case 'tube': m = new THREE.Mesh( new THREE.CylinderGeometry( 0.025, 0.03, 0.15, 12 ), [ std( { map: label } ), std( { color: 0xffffff } ), std( { color: 0x333333 } ) ] ); break;
		case 'shirt': {
			const s = new THREE.Shape(); s.moveTo( - 0.18, 0 ); s.lineTo( 0.18, 0 ); s.lineTo( 0.18, 0.42 ); s.lineTo( 0.3, 0.36 ); s.lineTo( 0.36, 0.46 ); s.lineTo( 0.12, 0.6 ); s.lineTo( - 0.12, 0.6 ); s.lineTo( - 0.36, 0.46 ); s.lineTo( - 0.3, 0.36 ); s.lineTo( - 0.18, 0.42 ); s.lineTo( - 0.18, 0 );
			m = new THREE.Mesh( new THREE.ExtrudeGeometry( s, { depth: 0.05, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 } ).translate( 0, - 0.6, 0 ), std( { color, roughness: 0.9 } ) );
			break;
		}
		case 'pants': m = new THREE.Mesh( new THREE.BoxGeometry( 0.36, 0.7, 0.05 ).translate( 0, - 0.35, 0 ), std( { color, roughness: 0.9 } ) ); break;
		case 'shoe': m = new THREE.Mesh( new THREE.CapsuleGeometry( 0.045, 0.16, 6, 10 ).rotateX( Math.PI / 2 ).scale( 1.1, 0.8, 1 ), std( { color, roughness: 0.5 } ) ); break;
		case 'bag': m = new THREE.Mesh( new THREE.CapsuleGeometry( 0.06, 0.12, 4, 10 ).scale( 1.3, 1, 0.5 ), std( { map: label, roughness: 0.35, metalness: 0.3 } ) ); break;
		case 'carton': m = new THREE.Mesh( new THREE.BoxGeometry( 0.07, 0.2, 0.07 ), std( { map: label } ) ); break;
		case 'smallbox': m = new THREE.Mesh( new THREE.BoxGeometry( 0.09, 0.06, 0.035 ), std( { map: label } ) ); break;
		default: m = new THREE.Mesh( new THREE.BoxGeometry( 0.16, 0.24, 0.06 ), std( { map: label } ) );
	}
	return m;
}

// --- mobilier ---------------------------------------------------------------------------------------------
const metal = std( { color: 0xc9cdd2, metalness: 0.7, roughness: 0.35 } );
const darkMetal = std( { color: 0x3a3f45, metalness: 0.6, roughness: 0.4 } );
const wood = std( { color: 0x8a5a33, roughness: 0.55 } );
const whiteLam = std( { color: 0xf3f3f1, roughness: 0.4 } );

function shelf( w, h, d, levels, mat ) {
	const g = new THREE.Group();
	for ( const sx of [ - 1, 1 ] ) { const s = new THREE.Mesh( new THREE.BoxGeometry( 0.04, h, d ), mat ); s.position.set( sx * w / 2, h / 2, 0 ); g.add( s ); }
	const back = new THREE.Mesh( new THREE.BoxGeometry( w, h, 0.02 ), mat ); back.position.set( 0, h / 2, - d / 2 ); g.add( back );
	const ys = [];
	for ( let i = 0; i < levels; i ++ ) {
		const y = 0.12 + i * ( h - 0.2 ) / ( levels - 1 || 1 );
		const p = new THREE.Mesh( new THREE.BoxGeometry( w, 0.025, d ), mat ); p.position.set( 0, y, 0 ); g.add( p );
		ys.push( y );
	}
	return { g, ys };
}

// --- intérieur ----------------------------------------------------------------------------------------------
export class Interior {

	constructor( renderer ) {
		this.renderer = renderer;
		this.active = false;
		this.scene = null;
		this.raycaster = new THREE.Raycaster();
		this.basket = [];
		const pm = new THREE.PMREMGenerator( renderer );
		this.env = pm.fromScene( new RoomEnvironment(), 0.04 ).texture;
		pm.dispose();
		try { this.wallet = JSON.parse( localStorage.getItem( 'quartier.wallet' ) || 'null' ) ?? 50; } catch { this.wallet = 50; }
		try { this.bag = JSON.parse( localStorage.getItem( 'quartier.bag' ) || '[]' ); } catch { this.bag = []; }
	}

	save() {
		try { localStorage.setItem( 'quartier.wallet', JSON.stringify( Math.round( this.wallet * 100 ) / 100 ) ); localStorage.setItem( 'quartier.bag', JSON.stringify( this.bag.slice( - 200 ) ) ); } catch { /* */ }
	}

	enter( shop, night ) {
		this.dispose();
		this.shop = shop;
		this.kind = shop.kind;
		const scene = this.scene = new THREE.Scene();
		scene.environment = this.env;
		scene.background = new THREE.Color( 0x111111 );
		this.items = [];
		this.solids = []; // boîtes de collision {minX, maxX, minZ, maxZ}
		const K = this.kind;
		const dims = { boulangerie: [ 8, 9, 3.1 ], supermarche: [ 16, 22, 4.2 ], pharmacie: [ 9, 11, 3.1 ], cafe: [ 10, 12, 3.3 ], vetements: [ 12, 15, 3.4 ], autre: [ 9, 11, 3.1 ] }[ K ];
		const [ W, D, H ] = dims;
		this.W = W; this.D = D;

		// pièce : sol, murs, plafond
		const floor = new THREE.Mesh( new THREE.PlaneGeometry( W, D ).rotateX( - Math.PI / 2 ),
			std( { map: K === 'cafe' || K === 'vetements' ? woodFloor( [ W / 3, D / 3 ] ) : floorTiles( K === 'pharmacie' ? '#e8ecef' : '#d9d4c9', K === 'pharmacie' ? '#dfe5ea' : '#cfc8bb', [ W / 2, D / 2 ] ), roughness: 0.35 } ) );
		scene.add( floor );
		const wallCol = { boulangerie: '#efe3cf', supermarche: '#f1f1ee', pharmacie: '#f4f7f8', cafe: '#3d3530', vetements: '#e9e6e1', autre: '#ecebe7' }[ K ];
		const wallMat = std( { map: plaster( wallCol ), roughness: 0.9 } );
		const mkWall = ( w, x, z, ry ) => { const m = new THREE.Mesh( new THREE.PlaneGeometry( w, H ), wallMat ); m.position.set( x, H / 2, z ); m.rotation.y = ry; scene.add( m ); };
		mkWall( W, 0, - D / 2, 0 ); mkWall( W, 0, D / 2, Math.PI ); mkWall( D, - W / 2, 0, Math.PI / 2 ); mkWall( D, W / 2, 0, - Math.PI / 2 );
		const ceil = new THREE.Mesh( new THREE.PlaneGeometry( W, D ).rotateX( Math.PI / 2 ), std( { color: 0xf2f2f0, roughness: 0.95 } ) );
		ceil.position.y = H; scene.add( ceil );

		// lumière : panneaux lumineux au plafond + lumière d'ambiance (le reflet vient de l'environnement)
		scene.add( new THREE.HemisphereLight( 0xfff6ea, 0x6b6157, K === 'cafe' ? 0.9 : 1.4 ) );
		const warm = K === 'cafe' || K === 'boulangerie' ? 0xffd9a0 : 0xfff6ec;
		const panelMat = new THREE.MeshBasicMaterial( { color: warm } );
		const nx = Math.max( 1, Math.round( W / 4 ) ), nz = Math.max( 1, Math.round( D / 4 ) );
		for ( let i = 0; i < nx; i ++ ) for ( let j = 0; j < nz; j ++ ) {
			const x = - W / 2 + ( i + 0.5 ) * W / nx, z = - D / 2 + ( j + 0.5 ) * D / nz;
			const p = new THREE.Mesh( new THREE.PlaneGeometry( 1.2, 0.3 ).rotateX( Math.PI / 2 ), panelMat ); p.position.set( x, H - 0.01, z ); scene.add( p );
		}
		const lights = [ [ - W / 4, - D / 4 ], [ W / 4, - D / 4 ], [ 0, D / 4 ] ];
		for ( const [ x, z ] of lights ) { const l = new THREE.PointLight( warm, K === 'cafe' ? 14 : 22, Math.max( W, D ) * 1.2, 1.6 ); l.position.set( x, H - 0.4, z ); scene.add( l ); }

		// vitrine et porte côté rue (z = +D/2) : on voit dehors (jour ou nuit)
		const outside = new THREE.MeshBasicMaterial( { color: night ? 0x0d1424 : 0xbcd3ea } );
		for ( const x of [ - W / 3, W / 3 ] ) { const win = new THREE.Mesh( new THREE.PlaneGeometry( W / 3 - 0.4, H * 0.6 ), outside ); win.position.set( x, H * 0.45, D / 2 - 0.02 ); win.rotation.y = Math.PI; scene.add( win ); }
		const door = new THREE.Mesh( new THREE.PlaneGeometry( 1.6, 2.3 ), outside ); door.position.set( 0, 1.15, D / 2 - 0.02 ); door.rotation.y = Math.PI; scene.add( door );
		const frame = new THREE.Mesh( new THREE.BoxGeometry( 1.8, 0.08, 0.06 ), darkMetal ); frame.position.set( 0, 2.32, D / 2 - 0.04 ); scene.add( frame );
		this.doorZ = D / 2 - 0.8;

		// enseigne au fond, avec le vrai nom
		const sign = new THREE.Mesh( new THREE.PlaneGeometry( Math.min( W - 1, 4.5 ), 0.7 ), new THREE.MeshBasicMaterial( { map: canvasTex( 512, 80, ( g, w, h ) => {
			g.fillStyle = K === 'pharmacie' ? '#0b8a4a' : K === 'cafe' ? '#2b1d14' : '#1f2a36'; g.fillRect( 0, 0, w, h );
			g.fillStyle = '#fff'; g.font = 'bold 44px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
			g.fillText( ( shop.name || KIND_LABEL[ K ] ).slice( 0, 22 ), w / 2, h / 2 + 2 );
		} ) } ) );
		sign.position.set( 0, H - 0.6, - D / 2 + 0.03 ); scene.add( sign );

		this.build( K, W, D, H );
		// caisse près de l'entrée
		const counter = new THREE.Mesh( new THREE.BoxGeometry( 2.2, 1.0, 0.7 ), K === 'cafe' || K === 'boulangerie' ? wood : whiteLam );
		const cx = W / 2 - 2.2, cz = D / 2 - 2.6;
		counter.position.set( cx, 0.5, cz ); scene.add( counter );
		const reg = new THREE.Mesh( new THREE.BoxGeometry( 0.4, 0.25, 0.35 ), darkMetal ); reg.position.set( cx + 0.5, 1.13, cz ); scene.add( reg );
		const screen = new THREE.Mesh( new THREE.PlaneGeometry( 0.3, 0.18 ), new THREE.MeshBasicMaterial( { color: 0x7fd3ff } ) ); screen.position.set( cx + 0.5, 1.35, cz + 0.05 ); screen.rotation.x = - 0.3; scene.add( screen );
		this.solids.push( { minX: cx - 1.15, maxX: cx + 1.15, minZ: cz - 0.4, maxZ: cz + 0.4 } );
		this.checkout = new THREE.Vector3( cx, 0, cz + 1.0 );

		// on arrive juste devant la porte, face à l'intérieur
		this.pos = new THREE.Vector3( 0, 1.65, D / 2 - 1.2 );
		this.active = true;
		this.basket = [];
	}

	// remplit le magasin selon son type
	build( K, W, D, H ) {
		const list = CATALOG[ K ];
		const scene = this.scene;
		const addItem = ( def, x, y, z, ry = 0 ) => {
			const [ name, price, shape, color ] = def;
			const m = productMesh( name, shape, color );
			m.position.set( x, y, z ); m.rotation.y += ry;
			m.userData.item = { name, price };
			scene.add( m );
			this.items.push( m );
		};
		const placeShelf = ( x, z, ry, w, h, d, levels, mat, fill ) => {
			const { g, ys } = shelf( w, h, d, levels, mat );
			g.position.set( x, 0, z ); g.rotation.y = ry; scene.add( g );
			const c = Math.abs( Math.cos( ry ) ), s = Math.abs( Math.sin( ry ) );
			const hx = ( w * c + d * s ) / 2, hz = ( w * s + d * c ) / 2;
			this.solids.push( { minX: x - hx, maxX: x + hx, minZ: z - hz, maxZ: z + hz } );
			ys.forEach( ( y, li ) => {
				const n = Math.floor( w / 0.22 );
				const def = fill( li );
				for ( let k = 0; k < n; k ++ ) {
					const lx = - w / 2 + 0.12 + k * ( w - 0.24 ) / Math.max( 1, n - 1 );
					const v = new THREE.Vector3( lx, y + 0.015, 0.02 ).applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), ry );
					const it = typeof def === 'function' ? def( k ) : def;
					addItem( it, x + v.x, y + 0.13, z + v.z, ry );
				}
			} );
		};
		const pick = ( i ) => list[ i % list.length ];
		if ( K === 'supermarche' ) {
			for ( let r = 0; r < 4; r ++ ) for ( const side of [ - 1, 1 ] ) {
				const x = - W / 2 + 3 + r * 3.2;
				placeShelf( x + side * 0.45, - 2, side > 0 ? Math.PI / 2 : - Math.PI / 2, 9, 1.9, 0.45, 4, metal, ( li ) => pick( r * 7 + li * 3 + ( side > 0 ? 1 : 0 ) ) );
			}
			// frigos lumineux au fond
			for ( let i = 0; i < 4; i ++ ) {
				const x = - W / 2 + 2 + i * 2.2;
				const fr = new THREE.Mesh( new THREE.BoxGeometry( 2.0, 2.1, 0.8 ), whiteLam ); fr.position.set( x, 1.05, - D / 2 + 0.45 ); scene.add( fr );
				const glow = new THREE.Mesh( new THREE.PlaneGeometry( 1.8, 1.7 ), new THREE.MeshBasicMaterial( { color: 0xdff2ff, transparent: true, opacity: 0.35 } ) ); glow.position.set( x, 1.1, - D / 2 + 0.86 ); scene.add( glow );
				for ( let k = 0; k < 7; k ++ ) for ( let l = 0; l < 3; l ++ ) addItem( pick( [ 0, 13, 15, 16 ][ ( i + l ) % 4 ] ), x - 0.75 + k * 0.25, 0.55 + l * 0.55, - D / 2 + 0.7 );
				this.solids.push( { minX: x - 1, maxX: x + 1, minZ: - D / 2, maxZ: - D / 2 + 0.9 } );
			}
			// étal de fruits
			for ( const [ i, fx ] of [ [ 10, 3 ], [ 11, 4.4 ], [ 12, 5.8 ] ] ) {
				const crate = new THREE.Mesh( new THREE.BoxGeometry( 1.2, 0.8, 0.9 ), wood ); crate.position.set( W / 2 - fx, 0.4, D / 2 - 6 ); scene.add( crate );
				this.solids.push( { minX: W / 2 - fx - 0.6, maxX: W / 2 - fx + 0.6, minZ: D / 2 - 6.45, maxZ: D / 2 - 5.55 } );
				for ( let k = 0; k < 12; k ++ ) addItem( list[ i ], W / 2 - fx - 0.45 + ( k % 4 ) * 0.3, 0.85, D / 2 - 6.3 + Math.floor( k / 4 ) * 0.28 );
			}
		} else if ( K === 'boulangerie' || K === 'cafe' ) {
			// vitrine réfrigérée et étagères à pain derrière
			const vit = new THREE.Mesh( new THREE.BoxGeometry( W - 3, 1.0, 0.8 ), K === 'cafe' ? wood : whiteLam ); vit.position.set( - 0.6, 0.5, - D / 2 + 3 ); scene.add( vit );
			const glass = new THREE.Mesh( new THREE.BoxGeometry( W - 3, 0.35, 0.7 ), std( { color: 0xffffff, transparent: true, opacity: 0.15, roughness: 0.05 } ) ); glass.position.set( - 0.6, 1.18, - D / 2 + 3 ); scene.add( glass );
			this.solids.push( { minX: - 0.6 - ( W - 3 ) / 2, maxX: - 0.6 + ( W - 3 ) / 2, minZ: - D / 2 + 2.6, maxZ: - D / 2 + 3.4 } );
			const n = Math.floor( ( W - 3.4 ) / 0.3 );
			for ( let k = 0; k < n; k ++ ) addItem( pick( k ), - 0.6 - ( W - 3 ) / 2 + 0.25 + k * 0.3, 1.06, - D / 2 + 3 );
			placeShelf( 0, - D / 2 + 0.3, 0, W - 2, 2.0, 0.45, 4, wood, ( li ) => pick( li * 2 + 1 ) );
			if ( K === 'cafe' ) {
				const machine = new THREE.Mesh( new THREE.BoxGeometry( 0.8, 0.5, 0.5 ), metal ); machine.position.set( W / 2 - 2.5, 1.25, D / 2 - 2.6 ); this.scene.add( machine );
				// tables et chaises
				for ( const [ x, z ] of [ [ - W / 2 + 2, 0 ], [ - W / 2 + 2, 2.5 ], [ 0.5, 1 ], [ - W / 2 + 4.3, 1.3 ] ] ) {
					const top = new THREE.Mesh( new THREE.CylinderGeometry( 0.4, 0.4, 0.04, 24 ), wood ); top.position.set( x, 0.75, z ); scene.add( top );
					const leg = new THREE.Mesh( new THREE.CylinderGeometry( 0.04, 0.04, 0.75, 8 ), darkMetal ); leg.position.set( x, 0.37, z ); scene.add( leg );
					for ( const a of [ 0, Math.PI ] ) { const ch = new THREE.Mesh( new THREE.BoxGeometry( 0.4, 0.05, 0.4 ), wood ); ch.position.set( x + Math.cos( a ) * 0.65, 0.45, z ); scene.add( ch ); const bk = new THREE.Mesh( new THREE.BoxGeometry( 0.05, 0.45, 0.4 ), wood ); bk.position.set( x + Math.cos( a ) * 0.85, 0.7, z ); scene.add( bk ); }
					this.solids.push( { minX: x - 0.95, maxX: x + 0.95, minZ: z - 0.45, maxZ: z + 0.45 } );
				}
			}
		} else if ( K === 'vetements' ) {
			for ( let r = 0; r < 3; r ++ ) {
				const z = - D / 2 + 3 + r * 3.2;
				const bar = new THREE.Mesh( new THREE.CylinderGeometry( 0.02, 0.02, 3, 8 ).rotateZ( Math.PI / 2 ), metal ); bar.position.set( - 1, 1.6, z ); scene.add( bar );
				for ( const sx of [ - 1, 1 ] ) { const p = new THREE.Mesh( new THREE.CylinderGeometry( 0.025, 0.025, 1.6, 8 ), metal ); p.position.set( - 1 + sx * 1.5, 0.8, z ); scene.add( p ); }
				for ( let k = 0; k < 9; k ++ ) addItem( pick( r * 2 + ( k % 2 ) ), - 2.3 + k * 0.32, 1.58, z, Math.PI / 2 );
				this.solids.push( { minX: - 2.6, maxX: 0.6, minZ: z - 0.35, maxZ: z + 0.35 } );
			}
			placeShelf( W / 2 - 0.3, - 1, - Math.PI / 2, 6, 1.8, 0.4, 4, wood, ( li ) => pick( 5 + li ) );
		} else {
			for ( let r = 0; r < 3; r ++ ) placeShelf( - W / 2 + 0.3, - D / 2 + 2 + r * 2.4, Math.PI / 2, 2.2, 1.9, 0.4, 4, K === 'pharmacie' ? whiteLam : wood, ( li ) => pick( r * 3 + li ) );
			placeShelf( 0, - D / 2 + 0.3, 0, W - 2, 2.0, 0.4, 5, K === 'pharmacie' ? whiteLam : wood, ( li ) => pick( li * 2 ) );
			placeShelf( 0.5, 0, 0, 3, 1.3, 0.5, 3, K === 'pharmacie' ? whiteLam : wood, ( li ) => pick( li + 4 ) );
		}
	}

	// déplacement dans le magasin ; move = vecteur horizontal (m), yaw/pitch = regard
	update( move, camera, yaw, pitch ) {
		const r = 0.3, p = this.pos;
		const tryMove = ( dx, dz ) => {
			const nx = Math.max( - this.W / 2 + r, Math.min( this.W / 2 - r, p.x + dx ) );
			const nz = Math.max( - this.D / 2 + r, Math.min( this.D / 2 - r, p.z + dz ) );
			for ( const s of this.solids ) if ( nx > s.minX - r && nx < s.maxX + r && nz > s.minZ - r && nz < s.maxZ + r ) return false;
			p.x = nx; p.z = nz; return true;
		};
		if ( ! tryMove( move.x, move.z ) ) { tryMove( move.x, 0 ); tryMove( 0, move.z ); } // on glisse le long des meubles
		camera.position.copy( p );
		camera.rotation.set( pitch, yaw, 0, 'YXZ' );
		camera.updateMatrixWorld();
		this.camera = camera;
	}

	// ce que le joueur peut faire là où il regarde
	hint() {
		if ( ! this.active ) return null;
		if ( this.pos.z > this.doorZ ) return { act: 'exit', text: '🚪 Sortir' + ( this.basket.length ? ' (le panier reste au magasin)' : '' ) };
		if ( this.basket.length && this.pos.distanceTo( this.checkout.clone().setY( this.pos.y ) ) < 1.6 ) {
			const total = this.basket.reduce( ( n, it ) => n + it.price, 0 );
			return { act: 'pay', text: `💳 Payer ${ this.basket.length } article${ this.basket.length > 1 ? 's' : '' } · ${ euro( total ) }` };
		}
		this.raycaster.setFromCamera( new THREE.Vector2( 0, 0 ), this.camera );
		this.raycaster.far = 2.6;
		let obj = this.raycaster.intersectObjects( this.items, false )[ 0 ]?.object;
		if ( ! obj ) {
			// visée tolérante : l'article le plus proche du centre de l'écran, à portée de main
			const ray = this.raycaster.ray, v = new THREE.Vector3();
			let best = 0.2;
			for ( const m of this.items ) {
				m.getWorldPosition( v );
				const along = v.clone().sub( ray.origin ).dot( ray.direction );
				if ( along < 0.2 || along > 2.6 ) continue;
				const d = ray.distanceToPoint( v );
				if ( d < best ) { best = d; obj = m; }
			}
		}
		if ( obj ) { this.target = obj; const it = obj.userData.item; return { act: 'take', text: `🛒 Prendre ${ it.name } · ${ euro( it.price ) }` }; }
		return null;
	}

	// renvoie un message à afficher
	act( kind ) {
		if ( kind === 'take' && this.target ) {
			const it = this.target.userData.item;
			this.basket.push( it );
			this.target.visible = false;
			this.items = this.items.filter( ( m ) => m !== this.target );
			this.target = null;
			return `${ it.name } dans le panier · total ${ euro( this.basket.reduce( ( n, x ) => n + x.price, 0 ) ) }`;
		}
		if ( kind === 'pay' ) {
			const total = this.basket.reduce( ( n, x ) => n + x.price, 0 );
			if ( total > this.wallet ) return `Pas assez d'argent : il te reste ${ euro( this.wallet ) }`;
			this.wallet -= total;
			this.bag.push( ...this.basket.map( ( x ) => x.name ) );
			this.basket = [];
			this.save();
			return `Payé ${ euro( total ) } · merci et à bientôt ! Reste ${ euro( this.wallet ) }`;
		}
		return '';
	}

	render( renderer, camera ) { renderer.render( this.scene, camera ); }

	dispose() {
		if ( ! this.scene ) return;
		this.scene.traverse( ( o ) => { if ( o.geometry ) o.geometry.dispose(); } );
		this.scene = null;
	}

	exit() { this.active = false; this.basket = []; this.dispose(); }

}

export const euro = ( n ) => n.toFixed( 2 ).replace( '.', ',' ) + ' €';
