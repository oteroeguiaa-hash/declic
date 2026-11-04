// Mode marche « Street View » : on charge la photo 360° Google Street View la plus proche
// (Map Tiles API, même clé que la 3D) et on la projette sur la 3D autour du joueur.
//
// Principe : chaque point de la ville visible depuis l'appareil photo de la Google Car prend la couleur
// de la photo dans cette direction. Les points cachés (derrière une voiture, un mur…) sont repérés
// grâce à une « carte de profondeur » faite depuis la position de la photo, et gardent la 3D normale.
// Au-delà d'une quarantaine de mètres, on revient progressivement à la 3D de Google.
import * as THREE from 'three';

const API = 'https://tile.googleapis.com/v1/';
const ZOOM = 3;          // 4096 × 2048 px environ : net et raisonnable pour un téléphone
const RADIUS = 45;       // portée de la photo (m)
const CAM_H = 2.5;       // hauteur de l'appareil photo de la Google Car
const DEPTH_FAR = 200;
// réglage fin de l'orientation des photos si besoin : ?svheading=90 (degrés)
const HEADING_FIX = + ( new URLSearchParams( location.search ).get( 'svheading' ) || 0 );

export const svUniforms = {
	uSvBlend: { value: 0 },
	uSvMap: { value: null },
	uSvDepth: { value: null },
	uSvPos: { value: new THREE.Vector3() },
	uSvHeading: { value: 0 },  // cap du centre de la photo, en radians
	uSvNorth: { value: new THREE.Vector3( 0, 0, - 1 ) },
	uSvEast: { value: new THREE.Vector3( 1, 0, 0 ) },
	uSvUScale: { value: 1 },   // part de la largeur de la texture réellement remplie
	uSvVScale: { value: 1 },
};

export const SV_HEAD = `
uniform float uSvBlend; uniform sampler2D uSvMap; uniform samplerCube uSvDepth;
uniform vec3 uSvPos; uniform float uSvHeading; uniform vec3 uSvNorth; uniform vec3 uSvEast;
uniform float uSvUScale; uniform float uSvVScale;
`;

// juste après la lecture de la texture de la tuile (diffuseColor = photo Google 3D)
export const SV_CODE = `
	if ( uSvBlend > 0.001 ) {
		vec3 d = vWPos - uSvPos;
		float dist = length( d );
		float dh = length( d.xz );
		float w = uSvBlend * ( 1.0 - smoothstep( ${ ( RADIUS * 0.55 ).toFixed( 1 ) }, ${ RADIUS.toFixed( 1 ) }, dh ) );
		if ( w > 0.001 ) {
			vec3 dir = d / max( dist, 1e-3 );
			float stored = textureCube( uSvDepth, dir ).r * ${ DEPTH_FAR.toFixed( 1 ) };
			w *= 1.0 - smoothstep( 0.25, 0.9, dist - stored - 0.03 * dist ); // caché depuis la photo
			float bearing = atan( dot( d, uSvEast ), dot( d, uSvNorth ) );
			float u = fract( 0.5 + ( bearing - uSvHeading ) / 6.2831853 );
			float v = 0.5 + asin( clamp( dir.y, -1.0, 1.0 ) ) / 3.1415927;
			vec3 photo = texture2D( uSvMap, vec2( u * uSvUScale, 1.0 - ( 1.0 - v ) * uSvVScale ) ).rgb;
			diffuseColor.rgb = mix( diffuseColor.rgb, photo, w );
		}
	}
`;

// matériau qui écrit la distance à la photo (pour savoir ce qui est caché)
function distanceMaterial() {
	return new THREE.ShaderMaterial( {
		uniforms: { uRef: { value: new THREE.Vector3() } },
		vertexShader: `varying vec3 vW; void main() { vec4 w = modelMatrix * vec4( position, 1.0 ); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
		fragmentShader: `uniform vec3 uRef; varying vec3 vW; void main() { gl_FragColor = vec4( length( vW - uRef ) / ${ DEPTH_FAR.toFixed( 1 ) }, 0.0, 0.0, 1.0 ); }`,
	} );
}

export class StreetView {

	// geo = { here(), toLocal(lat, lon, target), groundAt(x, z), north(), hideForDepth(bool) }
	constructor( renderer, scene, tilesGroup, key, geo ) {
		this.renderer = renderer;
		this.scene = scene;
		this.tilesGroup = tilesGroup;
		this.key = key;
		this.geo = geo;
		this.session = null;
		this.current = null;    // pano affiché
		this.loadingId = null;
		this.lastQuery = { t: 0, pos: null };
		this.enabled = true;
		this.failed = false;
		this.target = 0;        // fondu visé (0 ou 1)
		this.cache = new Map(); // panoId -> texture (quelques-unes, pour revenir en arrière sans recharger)

		this.cubeRT = new THREE.WebGLCubeRenderTarget( 256, { type: THREE.HalfFloatType, format: THREE.RGBAFormat, generateMipmaps: false, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter } );
		this.cubeCam = new THREE.CubeCamera( 0.3, DEPTH_FAR, this.cubeRT );
		this.depthMat = distanceMaterial();
		svUniforms.uSvDepth.value = this.cubeRT.texture;
		svUniforms.uSvMap.value = new THREE.Texture();
	}

	async api( path, opts ) {
		const sep = path.includes( '?' ) ? '&' : '?';
		const res = await fetch( API + path + sep + 'session=' + this.session + '&key=' + encodeURIComponent( this.key ), opts );
		if ( ! res.ok ) throw new Error( 'sv ' + res.status );
		return res;
	}

	async ensureSession() {
		if ( this.session ) return;
		const res = await fetch( API + 'createSession?key=' + encodeURIComponent( this.key ), {
			method: 'POST', headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { mapType: 'streetview', language: 'fr-BE', region: 'BE' } ),
		} );
		if ( ! res.ok ) throw new Error( 'session ' + res.status );
		this.session = ( await res.json() ).session;
	}

	// à chaque image en mode marche
	update( dt, pos, active ) {
		const u = svUniforms.uSvBlend;
		const goal = active && this.enabled && this.current ? this.target : 0;
		u.value += Math.sign( goal - u.value ) * Math.min( Math.abs( goal - u.value ), dt * 2.5 );
		if ( ! active || ! this.enabled || this.failed ) return;
		// pendant que la photo affichée s'efface pour être remplacée
		if ( this.pending && u.value <= 0.001 ) this.swap();

		const now = performance.now();
		const moved = this.lastQuery.pos ? Math.hypot( pos.x - this.lastQuery.pos.x, pos.z - this.lastQuery.pos.z ) : Infinity;
		if ( this.loadingId || now - this.lastQuery.t < 1200 || moved < 3 ) return;
		this.lastQuery = { t: now, pos: pos.clone() };
		this.findNearest().catch( ( e ) => this.fail( e ) );
	}

	fail( e ) {
		this.loadingId = null;
		if ( /40[13]/.test( e?.message ) ) { this.failed = true; this.onStatus?.( 'Street View indisponible avec cette clé : la 3D reste affichée.' ); }
	}

	async findNearest() {
		await this.ensureSession();
		const here = this.geo.here();
		const res = await this.api( 'streetview/panoIds', {
			method: 'POST', headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { locations: [ { lat: here.lat, lng: here.lon } ], radius: 40 } ),
		} );
		const id = ( await res.json() ).panoIds?.[ 0 ];
		if ( ! id ) { this.target = 0; return; }            // pas de Street View ici : 3D seule
		if ( id === this.current?.id || id === this.loadingId ) { this.target = 1; return; }
		this.loadingId = id;
		const meta = await ( await this.api( 'streetview/metadata?panoId=' + encodeURIComponent( id ) ) ).json();
		const tex = this.cache.get( id ) || await this.loadImage( id, meta );
		this.cache.set( id, tex );
		if ( this.cache.size > 6 ) { const [ k, t ] = this.cache.entries().next().value; if ( k !== this.current?.id ) { t.dispose(); this.cache.delete( k ); } }
		this.pending = { id, meta, tex };
		this.loadingId = null;
		this.target = 0;                // fondu vers la 3D, puis échange, puis fondu vers la photo
		if ( ! this.current ) this.swap();
	}

	async loadImage( id, meta ) {
		const tw = meta.tileWidth || 512, th = meta.tileHeight || 512;
		const zMax = Math.ceil( Math.log2( ( meta.imageWidth || 16384 ) / tw ) );
		const z = Math.min( ZOOM, zMax );
		const scale = 2 ** ( zMax - z );
		const W = Math.ceil( ( meta.imageWidth || 16384 ) / scale ), H = Math.ceil( ( meta.imageHeight || 8192 ) / scale );
		const nx = Math.ceil( W / tw ), ny = Math.ceil( H / th );
		const canvas = document.createElement( 'canvas' );
		canvas.width = THREE.MathUtils.ceilPowerOfTwo( W ); canvas.height = THREE.MathUtils.ceilPowerOfTwo( H );
		const g = canvas.getContext( '2d' );
		const jobs = [];
		for ( let y = 0; y < ny; y ++ ) for ( let x = 0; x < nx; x ++ ) {
			jobs.push( this.api( `streetview/tiles/${ z }/${ x }/${ y }?panoId=${ encodeURIComponent( id ) }` )
				.then( ( r ) => r.blob() ).then( ( b ) => createImageBitmap( b ) )
				.then( ( img ) => g.drawImage( img, x * tw, y * th ) ).catch( () => {} ) );
		}
		await Promise.all( jobs );
		const tex = new THREE.CanvasTexture( canvas );
		tex.colorSpace = THREE.SRGBColorSpace;
		tex.wrapS = THREE.ClampToEdgeWrapping;
		tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
		tex.userData = { uScale: W / canvas.width, vScale: H / canvas.height };
		return tex;
	}

	// la nouvelle photo devient active : position, orientation, carte de profondeur
	swap() {
		const { id, meta, tex } = this.pending;
		this.pending = null;
		const p = this.geo.toLocal( meta.lat, meta.lng, new THREE.Vector3() );
		const ground = this.geo.groundAt( p.x, p.z );
		p.y = ( ground ?? this.geo.feet() ) + CAM_H;
		svUniforms.uSvPos.value.copy( p );
		svUniforms.uSvHeading.value = THREE.MathUtils.degToRad( ( meta.heading || 0 ) + HEADING_FIX );
		const { north, east } = this.geo.axes();
		svUniforms.uSvNorth.value.copy( north );
		svUniforms.uSvEast.value.copy( east );
		svUniforms.uSvMap.value = tex;
		svUniforms.uSvUScale.value = tex.userData.uScale;
		svUniforms.uSvVScale.value = tex.userData.vScale;
		this.current = { id, meta };
		this.renderDepth( p );
		this.target = 1;
		this.onStatus?.( meta.date ? 'Photos Street View · ' + meta.date : '' );
	}

	renderDepth( p ) {
		const scene = this.scene;
		const hidden = this.geo.hideForDepth( true );
		const bg = scene.background, fog = scene.fog;
		scene.background = null; scene.fog = null;
		scene.overrideMaterial = this.depthMat;
		this.depthMat.uniforms.uRef.value.copy( p );
		const blend = svUniforms.uSvBlend.value;
		svUniforms.uSvBlend.value = 0;
		const clear = new THREE.Color(); this.renderer.getClearColor( clear ); const alpha = this.renderer.getClearAlpha();
		this.renderer.setClearColor( 0xffffff, 1 ); // rien = très loin
		this.cubeCam.position.copy( p );
		this.cubeCam.update( this.renderer, scene );
		this.renderer.setClearColor( clear, alpha );
		svUniforms.uSvBlend.value = blend;
		scene.overrideMaterial = null;
		scene.background = bg; scene.fog = fog;
		this.geo.hideForDepth( false, hidden );
	}

	// essais hors ligne : installe une photo fabriquée à la main à une position donnée
	debugInject( tex, pos, headingRad ) {
		tex.userData = { uScale: 1, vScale: 1 };
		svUniforms.uSvPos.value.copy( pos );
		svUniforms.uSvHeading.value = headingRad;
		const { north, east } = this.geo.axes();
		svUniforms.uSvNorth.value.copy( north ); svUniforms.uSvEast.value.copy( east );
		svUniforms.uSvMap.value = tex; svUniforms.uSvUScale.value = 1; svUniforms.uSvVScale.value = 1;
		this.current = { id: 'test' };
		this.renderDepth( pos );
		svUniforms.uSvBlend.value = 1;
	}

	// nouveau repère (téléportation / recentrage) : la photo actuelle n'est plus au bon endroit
	reset() {
		svUniforms.uSvBlend.value = 0;
		this.current = null;
		this.pending = null;
		this.target = 0;
		this.lastQuery = { t: 0, pos: null };
	}

}
