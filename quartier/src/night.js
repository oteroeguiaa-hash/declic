// La ville la nuit : fenêtres allumées sur les façades, lampadaires (vrais emplacements OpenStreetMap
// quand ils sont connus, sinon le long des rues) qui éclairent la rue, et traînées de phares qui filent
// sur les grands axes, comme sur une photo de nuit en pose longue.
import * as THREE from 'three';

const OVERPASS = 'https://overpass-api.de/api/interpreter';
const RADIUS = 900;        // m autour du joueur pour les lampadaires et les routes
const MAX_LAMPS = 16;      // lampadaires qui éclairent vraiment (les plus proches)
const LAMP_H = 6;          // hauteur des ampoules
const MAJOR = /^(motorway|trunk|primary|secondary|tertiary)(_link)?$/;
const STREET = /^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street)(_link)?$/;

// --- uniforms partagés avec le matériau des tuiles Google -------------------------------------
export const nightUniforms = {
	uNight: { value: 0 },      // 0 jour … 1 nuit noire
	uEmit: { value: 0 },       // force des lumières (compense l'exposition sombre de la nuit)
	uGround: { value: 0 },     // hauteur du sol sous le joueur (pour placer les fenêtres)
	uLamps: { value: Array.from( { length: MAX_LAMPS }, () => new THREE.Vector4() ) },
};

export const NIGHT_VERTEX = [ 'varying vec3 vWPos;', `#include <project_vertex>
	vWPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;` ];

export const NIGHT_HEAD = `
uniform float uNight; uniform float uEmit; uniform float uGround; uniform vec4 uLamps[ ${ MAX_LAMPS } ];
varying vec3 vWPos;
float nHash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
`;

// à insérer dans le bloc d'étalonnage, où « c » est la couleur de la photo
export const NIGHT_CODE = `
	if ( uNight > 0.01 ) {
		// lampadaires : flaques de lumière orangée sur la chaussée et le bas des façades
		// (jamais en hauteur : les arbres et les toits restent dans le noir)
		vec3 nrm = normalize( cross( dFdx( vWPos ), dFdy( vWPos ) ) );
		float low = 1.0 - smoothstep( 2.0, 4.0, vWPos.y - uGround );
		if ( low > 0.0 ) {
			float lamp = 0.0;
			for ( int i = 0; i < ${ MAX_LAMPS }; i ++ ) {
				vec4 L = uLamps[ i ];
				if ( L.w <= 0.0 ) continue;
				vec3 d = vWPos - L.xyz;
				float d2 = dot( d, d );
				lamp += L.w * 14.0 / ( 1.0 + d2 ) * smoothstep( 700.0, 80.0, d2 );
			}
			float facing = 0.25 + 0.75 * clamp( nrm.y, 0.0, 1.0 );
			diffuseColor.rgb += c * min( lamp, 1.6 ) * facing * low * vec3( 1.0, 0.74, 0.45 ) * 1.4 * uEmit;
		}
	}
`;

// --- traînées de phares ------------------------------------------------------------------------
function trailMaterial() {
	return new THREE.ShaderMaterial( {
		uniforms: { uTime: { value: 0 }, uNight: { value: 0 } },
		vertexShader: `
			attribute float aS; attribute float aLane; attribute float aEdge; attribute float aSeed;
			varying float vS; varying float vLane; varying float vEdge; varying float vSeed;
			void main() {
				vS = aS; vLane = aLane; vEdge = aEdge; vSeed = aSeed;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,
		fragmentShader: `
			uniform float uTime; uniform float uNight;
			varying float vS; varying float vLane; varying float vEdge; varying float vSeed;
			float hash( float x ) { return fract( sin( x * 91.7 ) * 43758.5453 ); }
			void main() {
				float dir = vLane < 0.5 ? 1.0 : -1.0;
				float speed = 13.0 + 5.0 * vSeed;
				float s = vS * dir + uTime * speed * -1.0 + vSeed * 50.0;
				float spacing = 42.0;
				float k = floor( s / spacing );
				float ph = fract( s / spacing );
				float on = step( 0.45, hash( k + vSeed * 13.0 + vLane * 7.0 ) );   // pas une voiture à chaque fois
				float streak = on * smoothstep( 0.0, 0.015, ph ) * pow( max( 0.0, 1.0 - ph / 0.32 ), 1.6 );
				float across = 1.0 - abs( vEdge );
				vec3 col = vLane < 0.5 ? vec3( 1.0, 0.93, 0.78 ) : vec3( 1.0, 0.16, 0.1 );
				float a = streak * across * across * uNight;
				if ( a < 0.004 ) discard;
				gl_FragColor = vec4( col * a * 2.2, a );
			}`,
		transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
	} );
}

// fenêtre éclairée vue de la rue : lumière plus forte au centre, croisillon, rideau sur un côté
function windowTexture() {
	const c = document.createElement( 'canvas' );
	c.width = 64; c.height = 96;
	const g = c.getContext( '2d' );
	const r = g.createRadialGradient( 32, 52, 4, 32, 52, 48 );
	r.addColorStop( 0, 'rgba(255,255,255,1)' );
	r.addColorStop( 1, 'rgba(255,255,255,0.55)' );
	g.fillStyle = r;
	g.fillRect( 4, 4, 56, 88 );
	g.fillStyle = 'rgba(0,0,0,0.75)';
	g.fillRect( 30, 4, 4, 88 );   // montant
	g.fillRect( 4, 34, 56, 3 );   // traverse
	g.fillStyle = 'rgba(0,0,0,0.3)';
	g.fillRect( 4, 4, 12, 88 );   // rideau
	const t = new THREE.CanvasTexture( c );
	t.colorSpace = THREE.SRGBColorSpace;
	return t;
}

const WIN_COLORS = [ 0xffcf86, 0xffc070, 0xffdcaa, 0xffe9c8, 0xffb860, 0xffd49a, 0xffe2b8, 0xffc98a, 0xc8dcff ];
const MAX_WINDOWS = 30000;
const BUILD_RADIUS = 420;

function bulbTexture() {
	const c = document.createElement( 'canvas' );
	c.width = c.height = 64;
	const g = c.getContext( '2d' );
	const r = g.createRadialGradient( 32, 32, 0, 32, 32, 32 );
	r.addColorStop( 0, 'rgba(255,240,210,1)' );
	r.addColorStop( 0.18, 'rgba(255,205,130,0.9)' );
	r.addColorStop( 0.5, 'rgba(255,160,70,0.22)' );
	r.addColorStop( 1, 'rgba(255,140,50,0)' );
	g.fillStyle = r;
	g.fillRect( 0, 0, 64, 64 );
	return new THREE.CanvasTexture( c );
}

// --- la ville de nuit autour du joueur ---------------------------------------------------------
export class NightCity {

	// geo = { here(), toLocal(lat, lon, target), groundAt(x, z) }
	constructor( scene, geo ) {
		this.scene = scene;
		this.geo = geo;
		this.group = new THREE.Group();
		scene.add( this.group );
		this.lamps = [];
		this.chunks = [];
		this.center = null;
		this.loading = false;
		this.trailMat = trailMaterial();
		this.bulbMat = new THREE.PointsMaterial( {
			map: bulbTexture(), size: 1.3, sizeAttenuation: true, transparent: true, depthWrite: false,
			blending: THREE.AdditiveBlending, toneMapped: false, fog: false,
		} );
		this.bulbs = new THREE.Points( new THREE.BufferGeometry(), this.bulbMat );
		this.bulbs.frustumCulled = false;
		this.group.add( this.bulbs );

		// fenêtres allumées : de petits rectangles posés sur les façades des vrais bâtiments (OSM)
		this.buildings = [];
		this.winMesh = new THREE.InstancedMesh(
			new THREE.PlaneGeometry( 1, 1 ),
			new THREE.MeshBasicMaterial( { map: windowTexture(), transparent: true, depthWrite: false, toneMapped: false, fog: true } ),
			MAX_WINDOWS,
		);
		this.winMesh.count = 0;
		this.winMesh.frustumCulled = false;
		this.winMesh.instanceColor = new THREE.InstancedBufferAttribute( new Float32Array( MAX_WINDOWS * 3 ), 3 );
		this.group.add( this.winMesh );
		this.winDirty = false;
		this.timer = 0;
		this.cursor = 0;
		this.bulbCount = -1;
	}

	// nouveau repère (téléportation, recentrage) : on repart des coordonnées GPS
	reset() {
		for ( const ch of this.chunks ) if ( ch.mesh ) { this.group.remove( ch.mesh ); ch.mesh.geometry.dispose(); }
		this.lamps = []; this.chunks = []; this.center = null; this.bulbCount = -1;
		this.buildings = []; this.winMesh.count = 0; this.shared = null;
		this.bulbs.geometry.dispose();
		this.bulbs.geometry = new THREE.BufferGeometry();
		for ( const v of nightUniforms.uLamps.value ) v.set( 0, 0, 0, 0 );
	}

	async load( c ) {
		this.loading = true;
		this.center = c;
		const d = RADIUS / 111320, e = d / Math.cos( c.lat * Math.PI / 180 );
		const bbox = [ c.lat - d, c.lon - e, c.lat + d, c.lon + e ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
		const db = BUILD_RADIUS / 111320, eb = db / Math.cos( c.lat * Math.PI / 180 );
		const bboxB = [ c.lat - db, c.lon - eb, c.lat + db, c.lon + eb ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
		const q = `[out:json][timeout:25];(way["building"](${ bboxB });node["highway"="street_lamp"](${ bbox });way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street)(_link)?$"](${ bbox }););out geom;`;
		try {
			if ( this.geo.fake ) { this.build( this.geo.fake() ); this.loading = false; return; } // essais hors ligne
			const res = await fetch( OVERPASS, { method: 'POST', body: 'data=' + encodeURIComponent( q ) } );
			const data = await res.json();
			if ( this.center !== c ) return; // on a bougé entre-temps
			this.build( data.elements || [] );
		} catch { this.center = null; /* réessai plus tard */ }
		this.loading = false;
	}

	build( elements ) {
		const lampsLL = [];
		const ways = [];
		for ( const el of elements ) {
			if ( el.type === 'node' ) lampsLL.push( { lat: el.lat, lon: el.lon } );
			else if ( el.type === 'way' && el.tags?.building && el.geometry?.length > 3 ) this.addBuilding( el );
			else if ( el.type === 'way' && el.geometry && STREET.test( el.tags?.highway || '' ) ) ways.push( el );
		}
		const toXZ = ( p ) => { const v = this.geo.toLocal( p.lat, p.lon, new THREE.Vector3() ); return { x: v.x, z: v.z }; };
		// peu de lampadaires connus ici : on en pose tous les 30 m le long des rues, en quinconce
		if ( lampsLL.length < 40 ) {
			for ( const w of ways ) {
				const pts = w.geometry.map( toXZ );
				let acc = 15, side = 1;
				for ( let i = 0; i < pts.length - 1; i ++ ) {
					const a = pts[ i ], b = pts[ i + 1 ];
					const len = Math.hypot( b.x - a.x, b.z - a.z );
					if ( len < 0.01 ) continue;
					const nx = - ( b.z - a.z ) / len, nz = ( b.x - a.x ) / len;
					while ( acc < len ) {
						const t = acc / len;
						this.lamps.push( { x: a.x + ( b.x - a.x ) * t + nx * 5.5 * side, z: a.z + ( b.z - a.z ) * t + nz * 5.5 * side, y: null } );
						side = - side;
						acc += 30;
					}
					acc -= len;
				}
			}
		} else {
			for ( const p of lampsLL ) { const v = toXZ( p ); this.lamps.push( { x: v.x, z: v.z, y: null } ); }
		}
		// grands axes : découpés en tronçons d'environ 150 m, points tous les 5 m
		for ( const w of ways ) {
			if ( ! MAJOR.test( w.tags.highway ) ) continue;
			const pts = w.geometry.map( toXZ );
			const dense = [];
			for ( let i = 0; i < pts.length - 1; i ++ ) {
				const a = pts[ i ], b = pts[ i + 1 ];
				const len = Math.hypot( b.x - a.x, b.z - a.z );
				const n = Math.max( 1, Math.ceil( len / 5 ) );
				for ( let k = 0; k < n; k ++ ) dense.push( { x: a.x + ( b.x - a.x ) * k / n, z: a.z + ( b.z - a.z ) * k / n, y: null } );
			}
			dense.push( { ...pts[ pts.length - 1 ], y: null } );
			const oneway = w.tags.oneway === 'yes';
			const seed = ( w.id % 1000 ) / 1000;
			for ( let i = 0; i < dense.length - 1; i += 30 ) {
				const part = dense.slice( i, i + 31 );
				if ( part.length < 2 ) continue;
				const cx = part.reduce( ( s, p ) => s + p.x, 0 ) / part.length, cz = part.reduce( ( s, p ) => s + p.z, 0 ) / part.length;
				this.chunks.push( { pts: part, cx, cz, s0: i * 5, oneway, seed, mesh: null } );
			}
		}
	}

	addBuilding( el ) {
		const P = new THREE.Vector3();
		const pts = el.geometry.map( ( g ) => { this.geo.toLocal( g.lat, g.lon, P ); return { x: P.x, z: P.z }; } );
		let area = 0, cx = 0, cz = 0;
		for ( let i = 0; i < pts.length - 1; i ++ ) {
			area += pts[ i ].x * pts[ i + 1 ].z - pts[ i + 1 ].x * pts[ i ].z;
			cx += pts[ i ].x; cz += pts[ i ].z;
		}
		cx /= pts.length - 1; cz /= pts.length - 1;
		const t = el.tags;
		let h = parseFloat( t.height ) || ( parseFloat( t[ 'building:levels' ] ) ? parseFloat( t[ 'building:levels' ] ) * 3 + 1.5 : 0 );
		if ( /^(garage|garages|shed|roof|carport|hut|kiosk|greenhouse|service|transformer_tower)$/.test( t.building ) ) return;
		this.buildings.push( { id: el.id, pts, ccw: area > 0, area: Math.abs( area / 2 ), cx, cz, h, ground: null, done: false } );
	}

	// murs mitoyens (communs à deux maisons) : pas de fenêtres dessus
	sharedEdges() {
		if ( this.shared ) return this.shared;
		const key = ( a, b ) => {
			const k1 = Math.round( a.x * 2 ) + ',' + Math.round( a.z * 2 ), k2 = Math.round( b.x * 2 ) + ',' + Math.round( b.z * 2 );
			return k1 < k2 ? k1 + '|' + k2 : k2 + '|' + k1;
		};
		const count = new Map();
		for ( const b of this.buildings ) for ( let i = 0; i < b.pts.length - 1; i ++ ) {
			const k = key( b.pts[ i ], b.pts[ i + 1 ] );
			count.set( k, ( count.get( k ) || 0 ) + 1 );
		}
		this.shared = { count, key };
		return this.shared;
	}

	buildWindows( b ) {
		const { count, key } = this.sharedEdges();
		const m = new THREE.Matrix4(), q = new THREE.Quaternion(), col = new THREE.Color();
		const up = new THREE.Vector3( 0, 1, 0 );
		const floors = Math.max( 1, Math.min( 25, Math.floor( ( b.h - 0.5 ) / 3 ) ) );
		let seed = ( ( b.id * 2654435761 ) % 2147483646 ) + 1;
		const rnd = () => ( seed = ( seed * 16807 ) % 2147483647 ) / 2147483647;
		for ( let i = 0; i < 4; i ++ ) rnd(); // on mélange un peu avant de tirer
		const dark = rnd() < 0.25; // certains immeubles sont entièrement éteints
		for ( let i = 0; i < b.pts.length - 1; i ++ ) {
			const a = b.pts[ i ], c = b.pts[ i + 1 ];
			if ( count.get( key( a, c ) ) > 1 ) continue;
			const len = Math.hypot( c.x - a.x, c.z - a.z );
			if ( len < 2.5 ) continue;
			const dx = ( c.x - a.x ) / len, dz = ( c.z - a.z ) / len;
			// normale extérieure selon le sens de parcours du contour
			const nx = b.ccw ? dz : - dz, nz = b.ccw ? - dx : dx;
			const cols = Math.max( 1, Math.floor( len / 3.2 ) );
			const step = len / cols;
			q.setFromAxisAngle( up, Math.atan2( nx, nz ) );
			for ( let f = 0; f < floors; f ++ ) {
				const y = b.ground + 1.7 + f * 3;
				for ( let k = 0; k < cols; k ++ ) {
					const p = rnd() < ( dark ? 0.03 : f === 0 ? 0.12 : 0.3 );
					const hue = rnd(), level = rnd();
					if ( ! p || this.winMesh.count >= MAX_WINDOWS ) continue;
					const t = ( k + 0.5 ) * step;
					m.compose( new THREE.Vector3( a.x + dx * t + nx * 0.35, y, a.z + dz * t + nz * 0.35 ), q, new THREE.Vector3( 1.1, 1.5, 1 ) );
					this.winMesh.setMatrixAt( this.winMesh.count, m );
					col.setHex( WIN_COLORS[ Math.floor( hue * WIN_COLORS.length ) ] ).multiplyScalar( 0.55 + level * 0.45 );
					this.winMesh.setColorAt( this.winMesh.count, col );
					this.winMesh.count ++;
				}
			}
		}
		this.winDirty = true;
	}

	resolveBuildings( pos, budget ) {
		let used = 0;
		for ( const b of this.buildings ) {
			if ( b.done || used >= budget ) continue;
			if ( Math.hypot( b.cx - pos.x, b.cz - pos.z ) > BUILD_RADIUS ) continue;
			// sol : juste devant la première façade ; hauteur : OSM, sinon le toit vu par un rayon
			if ( b.ground === null ) {
				const a = b.pts[ 0 ], c = b.pts[ 1 ];
				const mx = ( a.x + c.x ) / 2, mz = ( a.z + c.z ) / 2;
				const ox = ( c.z - a.z ), oz = - ( c.x - a.x ), ol = Math.hypot( ox, oz ) || 1, s = b.ccw ? 1 : - 1;
				const g = this.geo.groundAt( mx + s * ox / ol * 3, mz + s * oz / ol * 3 ); used ++;
				if ( g === null ) continue;
				b.ground = g;
			}
			if ( ! b.h ) {
				const roof = this.geo.roofAt( b.cx, b.cz ); used ++;
				if ( roof === null ) continue;
				// pas de 3D Google ici (toit au niveau du sol) : même hauteur que la ville construite par le jeu
				b.h = roof - b.ground > 2.2 ? Math.max( 3, Math.min( 80, roof - b.ground ) ) : ( Math.abs( b.area || 100 ) < 160 ? 6 : 9 );
			}
			b.done = true;
			if ( b.h >= 3 ) this.buildWindows( b );
		}
	}

	// quelques hauteurs de sol par image (rayons), en commençant par ce qui est proche
	resolve( pos, budget ) {
		const near = ( o, r ) => Math.hypot( o.x - pos.x, o.z - pos.z ) < r;
		let used = 0;
		for ( const l of this.lamps ) {
			if ( used >= budget ) break;
			if ( l.y !== null || ! near( l, 350 ) ) continue;
			const g = this.geo.groundAt( l.x, l.z ); used ++;
			if ( g !== null ) l.y = g;
		}
		for ( const ch of this.chunks ) {
			if ( ch.mesh || used >= budget ) continue;
			if ( Math.hypot( ch.cx - pos.x, ch.cz - pos.z ) > 450 ) continue;
			let missing = 0;
			for ( const p of ch.pts ) {
				if ( p.y !== null ) continue;
				if ( used >= budget ) { missing ++; continue; }
				const g = this.geo.groundAt( p.x, p.z ); used ++;
				if ( g !== null ) p.y = g; else missing ++;
			}
			if ( ! missing ) this.buildChunk( ch );
		}
	}

	buildChunk( ch ) {
		const lanes = ch.oneway ? [ 0 ] : [ 0, 1 ];
		const pos = [], aS = [], aLane = [], aEdge = [], aSeed = [], idx = [];
		const W = 0.4;
		for ( const lane of lanes ) {
			const off = ch.oneway ? 0 : ( lane === 0 ? 1.7 : - 1.7 );
			const base = pos.length / 3;
			ch.pts.forEach( ( p, i ) => {
				const q = ch.pts[ Math.min( i + 1, ch.pts.length - 1 ) ], o = ch.pts[ Math.max( i - 1, 0 ) ];
				let dx = q.x - o.x, dz = q.z - o.z;
				const l = Math.hypot( dx, dz ) || 1; dx /= l; dz /= l;
				const nx = - dz, nz = dx;
				for ( const e of [ - 1, 1 ] ) {
					pos.push( p.x + nx * ( off + e * W ), p.y + 0.75, p.z + nz * ( off + e * W ) );
					aS.push( ch.s0 + i * 5 ); aLane.push( lane ); aEdge.push( e ); aSeed.push( ch.seed );
				}
				if ( i < ch.pts.length - 1 ) {
					const v = base + i * 2;
					idx.push( v, v + 1, v + 2, v + 1, v + 3, v + 2 );
				}
			} );
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute( 'position', new THREE.Float32BufferAttribute( pos, 3 ) );
		g.setAttribute( 'aS', new THREE.Float32BufferAttribute( aS, 1 ) );
		g.setAttribute( 'aLane', new THREE.Float32BufferAttribute( aLane, 1 ) );
		g.setAttribute( 'aEdge', new THREE.Float32BufferAttribute( aEdge, 1 ) );
		g.setAttribute( 'aSeed', new THREE.Float32BufferAttribute( aSeed, 1 ) );
		g.setIndex( idx );
		ch.mesh = new THREE.Mesh( g, this.trailMat );
		ch.mesh.frustumCulled = true;
		g.computeBoundingSphere();
		this.group.add( ch.mesh );
	}

	update( dt, pos, night, exposure, groundY ) {
		nightUniforms.uNight.value = night;
		nightUniforms.uEmit.value = night / Math.max( exposure, 0.2 );
		nightUniforms.uGround.value = groundY;
		this.trailMat.uniforms.uNight.value = night;
		this.trailMat.uniforms.uTime.value = performance.now() / 1000;
		this.group.visible = night > 0.02;
		if ( night <= 0.02 ) return;

		// recharger les rues quand on s'éloigne de plus de 500 m
		const here = this.geo.here();
		if ( ! this.loading && ( ! this.center || Math.hypot( ( here.lat - this.center.lat ) * 111320, ( here.lon - this.center.lon ) * 111320 * Math.cos( here.lat * Math.PI / 180 ) ) > 500 ) ) {
			this.reset();
			this.load( here );
		}
		this.resolve( pos, 30 );
		this.resolveBuildings( pos, 40 );
		if ( this.winDirty ) {
			this.winDirty = false;
			this.winMesh.instanceMatrix.needsUpdate = true;
			this.winMesh.instanceColor.needsUpdate = true;
		}

		this.timer -= dt;
		if ( this.timer > 0 ) return;
		this.timer = 0.3;
		// les lampadaires les plus proches éclairent ; tous les proches ont leur ampoule
		const ready = this.lamps.filter( ( l ) => l.y !== null );
		ready.sort( ( a, b ) => ( ( a.x - pos.x ) ** 2 + ( a.z - pos.z ) ** 2 ) - ( ( b.x - pos.x ) ** 2 + ( b.z - pos.z ) ** 2 ) );
		nightUniforms.uLamps.value.forEach( ( v, i ) => {
			const l = ready[ i ];
			if ( l ) v.set( l.x, l.y + LAMP_H, l.z, 1 ); else v.set( 0, 0, 0, 0 );
		} );
		if ( ready.length !== this.bulbCount ) {
			this.bulbCount = ready.length;
			const arr = new Float32Array( ready.length * 3 );
			ready.forEach( ( l, i ) => arr.set( [ l.x, l.y + LAMP_H, l.z ], i * 3 ) );
			const g = new THREE.BufferGeometry();
			g.setAttribute( 'position', new THREE.BufferAttribute( arr, 3 ) );
			this.bulbs.geometry.dispose();
			this.bulbs.geometry = g;
		}
	}

}
