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
		vec3 nrm = normalize( cross( dFdx( vWPos ), dFdy( vWPos ) ) );
		float h = vWPos.y - uGround;
		vec3 emit = vec3( 0.0 );
		// fenêtres : une grille d'étages sur chaque façade, environ une sur trois allumée
		if ( abs( nrm.y ) < 0.35 && h > 2.6 && h < 90.0 ) {
			vec2 tg = normalize( vec2( - nrm.z, nrm.x ) + 1e-5 );
			vec2 g = vec2( dot( vWPos.xz, tg ) / 3.4, ( h - 0.4 ) / 3.0 );
			vec2 cell = floor( g ), f = fract( g );
			float win = step( 0.22, f.x ) * step( f.x, 0.78 ) * step( 0.3, f.y ) * step( f.y, 0.82 );
			float side = floor( atan( nrm.z, nrm.x ) * 1.27 );
			float lit = step( nHash( cell + side * 17.0 ), 0.3 );
			vec3 col = mix( vec3( 1.0, 0.7, 0.36 ), vec3( 0.85, 0.92, 1.0 ), step( 0.85, nHash( cell.yx + 3.1 ) ) );
			emit += win * lit * col * ( 0.55 + 0.45 * nHash( cell + 9.7 ) ) * 0.9;
		}
		// lampadaires : lumière orangée qui retombe sur la rue et les façades proches
		vec3 lamp = vec3( 0.0 );
		for ( int i = 0; i < ${ MAX_LAMPS }; i ++ ) {
			vec4 L = uLamps[ i ];
			if ( L.w <= 0.0 ) continue;
			vec3 d = vWPos - L.xyz;
			float d2 = dot( d, d );
			lamp += L.w * 16.0 / ( 1.0 + d2 ) * smoothstep( 1100.0, 120.0, d2 );
		}
		float facing = 0.35 + 0.65 * clamp( nrm.y, 0.0, 1.0 );
		emit += c * lamp * facing * vec3( 1.0, 0.78, 0.5 ) * 1.6;
		diffuseColor.rgb += emit * uEmit;
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
			map: bulbTexture(), size: 2.6, sizeAttenuation: true, transparent: true, depthWrite: false,
			blending: THREE.AdditiveBlending, toneMapped: false, fog: false,
		} );
		this.bulbs = new THREE.Points( new THREE.BufferGeometry(), this.bulbMat );
		this.bulbs.frustumCulled = false;
		this.group.add( this.bulbs );
		this.timer = 0;
		this.cursor = 0;
		this.bulbCount = -1;
	}

	// nouveau repère (téléportation, recentrage) : on repart des coordonnées GPS
	reset() {
		for ( const ch of this.chunks ) if ( ch.mesh ) { this.group.remove( ch.mesh ); ch.mesh.geometry.dispose(); }
		this.lamps = []; this.chunks = []; this.center = null; this.bulbCount = -1;
		this.bulbs.geometry.dispose();
		this.bulbs.geometry = new THREE.BufferGeometry();
		for ( const v of nightUniforms.uLamps.value ) v.set( 0, 0, 0, 0 );
	}

	async load( c ) {
		this.loading = true;
		this.center = c;
		const d = RADIUS / 111320, e = d / Math.cos( c.lat * Math.PI / 180 );
		const bbox = [ c.lat - d, c.lon - e, c.lat + d, c.lon + e ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
		const q = `[out:json][timeout:25];(node["highway"="street_lamp"](${ bbox });way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street)(_link)?$"](${ bbox }););out geom;`;
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
