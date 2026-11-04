// Balade 3D dans le quartier, sur les tuiles 3D photoréalistes de Google (les mêmes que Google Maps / Earth).
// Source de ce fichier ; le navigateur charge app.js, produit par : npm run build:quartier
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { TilesRenderer } from '3d-tiles-renderer';
import {
	GoogleCloudAuthPlugin,
	GLTFExtensionsPlugin,
	ReorientationPlugin,
	TileCompressionPlugin,
	TilesFadePlugin,
	UnloadTilesPlugin,
} from '3d-tiles-renderer/plugins';

const $ = ( id ) => document.getElementById( id );
const store = {
	get( k ) { try { return localStorage.getItem( k ) || ''; } catch { return ''; } },
	set( k, v ) { try { localStorage.setItem( k, v ); } catch { /* navigation privée */ } },
};

// Repli si la recherche d'adresse ne répond pas : centre du parc Georges-Henri (Woluwe-Saint-Lambert).
const PARC = { name: 'Parc Georges-Henri', lat: 50.8418, lon: 4.4093, query: 'Parc Georges Henri, Woluwe-Saint-Lambert, Belgique' };
const DEG = Math.PI / 180;

const EYE = 1.7; // hauteur des yeux (m)
const WALK = 4.2, RUN = 9, FLY = 25, FLY_FAST = 80;
const GRAVITY = 22, JUMP = 7;

// --------------------------------------------------------------------------------------------
// Écran d'accueil
// --------------------------------------------------------------------------------------------
$( 'key' ).value = store.get( 'quartier.key' );
$( 'home' ).value = store.get( 'quartier.home' );
$( 'quality' ).value = store.get( 'quartier.quality' ) || 'haute';

async function geocode( q ) {
	// Nominatim (OpenStreetMap), limité à la Belgique et centré sur Woluwe.
	const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=be'
		+ '&viewbox=4.36,50.87,4.47,50.81&q=' + encodeURIComponent( q );
	const res = await fetch( url, { headers: { 'Accept-Language': 'fr' } } );
	if ( ! res.ok ) throw new Error( 'recherche indisponible' );
	const [ hit ] = await res.json();
	if ( ! hit ) return null;
	return { lat: + hit.lat, lon: + hit.lon, name: hit.display_name.split( ',' ).slice( 0, 2 ).join( ',' ) };
}

const places = { parc: PARC, home: null };

async function resolvePlaces() {
	const home = $( 'home' ).value.trim();
	const jobs = [ geocode( PARC.query ).then( ( p ) => { if ( p ) places.parc = { ...p, name: PARC.name }; } ).catch( () => {} ) ];
	if ( home ) {
		const q = /woluwe|bruxelles|brussel|\d{4}/i.test( home ) ? home : home + ', Woluwe-Saint-Lambert';
		jobs.push( geocode( q ).then( ( p ) => { places.home = p ? { ...p, name: 'Ma rue' } : null; } ).catch( () => {} ) );
	}
	await Promise.all( jobs );
}

for ( const btn of document.querySelectorAll( '[data-start]' ) ) {
	btn.addEventListener( 'click', async () => {
		const key = $( 'key' ).value.trim();
		if ( ! key ) { $( 'msg' ).textContent = 'Il faut une clé Google (voir le mode d\'emploi juste en dessous).'; return; }
		store.set( 'quartier.key', key );
		store.set( 'quartier.home', $( 'home' ).value.trim() );
		store.set( 'quartier.quality', $( 'quality' ).value );
		$( 'msg' ).textContent = 'Recherche des adresses…';
		await resolvePlaces();
		const where = btn.dataset.start;
		if ( where === 'home' && ! places.home ) {
			$( 'msg' ).textContent = $( 'home' ).value.trim()
				? 'Adresse introuvable. Essaie par exemple « Rue …, 1200 Woluwe-Saint-Lambert ».'
				: 'Écris d\'abord ton adresse.';
			return;
		}
		$( 'menu' ).hidden = true;
		$( 'hud' ).hidden = false;
		$( 'go-home' ).hidden = ! places.home;
		start( key, places[ where ], $( 'quality' ).value );
	} );
}

// --------------------------------------------------------------------------------------------
// Scène
// --------------------------------------------------------------------------------------------
let renderer, scene, camera, tiles, raycaster;
const player = { pos: new THREE.Vector3(), vel: new THREE.Vector3(), yaw: 0, pitch: 0, onGround: false, fly: false, grounded: false };

function start( key, place, quality ) {
	renderer = new THREE.WebGLRenderer( { antialias: true, logarithmicDepthBuffer: false } );
	renderer.setPixelRatio( Math.min( devicePixelRatio, quality === 'ultra' ? 2 : 1.5 ) );
	renderer.setSize( innerWidth, innerHeight );
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	document.body.prepend( renderer.domElement );

	scene = new THREE.Scene();
	scene.background = skyTexture();
	scene.fog = new THREE.Fog( 0xc9dcef, 900, 4000 );
	scene.add( new THREE.HemisphereLight( 0xffffff, 0x8a8f80, 2.2 ) );
	const sun = new THREE.DirectionalLight( 0xfff3e0, 1.2 );
	sun.position.set( 300, 600, 200 );
	scene.add( sun );

	camera = new THREE.PerspectiveCamera( 70, innerWidth / innerHeight, 0.3, 20000 );

	tiles = new TilesRenderer();
	tiles.registerPlugin( new GoogleCloudAuthPlugin( { apiToken: key, autoRefreshToken: true, useRecommendedSettings: false } ) );
	const draco = new DRACOLoader().setDecoderPath( './draco/' );
	tiles.registerPlugin( new GLTFExtensionsPlugin( { dracoLoader: draco } ) );
	tiles.registerPlugin( new TileCompressionPlugin() );
	tiles.registerPlugin( new UnloadTilesPlugin() );
	tiles.registerPlugin( new TilesFadePlugin() );
	// Le point de départ devient l'origine, avec Y vers le ciel : on peut marcher en mètres.
	tiles.registerPlugin( new ReorientationPlugin( { lat: place.lat * DEG, lon: place.lon * DEG, height: 0, recenter: true } ) );
	// Plus le chiffre est petit, plus c'est détaillé (et lourd).
	tiles.errorTarget = { normale: 12, haute: 6, ultra: 3 }[ quality ] ?? 6;
	tiles.lruCache.maxSize = quality === 'ultra' ? 1600 : 1000;
	tiles.lruCache.minSize = 600;
	tiles.setCamera( camera );
	tiles.setResolutionFromRenderer( camera, renderer );
	scene.add( tiles.group );

	tiles.addEventListener( 'load-error', ( e ) => {
		const status = e.error?.message || '';
		if ( /40[013]|API key|PERMISSION/i.test( status ) ) {
			showError( 'Google refuse la clé. Vérifie la clé, que « Map Tiles API » est activée sur ce projet et que la facturation est configurée.' );
		}
	} );

	raycaster = new THREE.Raycaster();
	raycaster.firstHitOnly = true;

	addEventListener( 'resize', onResize );
	setupInput();
	teleport( place );
	renderer.setAnimationLoop( frame );
}

function skyTexture() {
	const c = document.createElement( 'canvas' );
	c.width = 2; c.height = 256;
	const g = c.getContext( '2d' );
	const grad = g.createLinearGradient( 0, 0, 0, 256 );
	grad.addColorStop( 0, '#5d93d6' );
	grad.addColorStop( 0.55, '#a9c9ec' );
	grad.addColorStop( 1, '#e3edf6' );
	g.fillStyle = grad;
	g.fillRect( 0, 0, 2, 256 );
	const t = new THREE.CanvasTexture( c );
	t.colorSpace = THREE.SRGBColorSpace;
	return t;
}

function onResize() {
	camera.aspect = innerWidth / innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( innerWidth, innerHeight );
	tiles.setResolutionFromRenderer( camera, renderer );
}

function showError( text ) {
	$( 'error' ).textContent = text;
	$( 'error' ).hidden = false;
}

// --------------------------------------------------------------------------------------------
// Géographie : lat/lon <-> coordonnées locales de la scène
// --------------------------------------------------------------------------------------------
const _v = new THREE.Vector3(), _inv = new THREE.Matrix4(), _carto = {};

function latLonToLocal( lat, lon, h, target ) {
	tiles.group.updateMatrixWorld( true );
	tiles.ellipsoid.getCartographicToPosition( lat * DEG, lon * DEG, h, target );
	return target.applyMatrix4( tiles.group.matrixWorld );
}

function localToLatLon( pos ) {
	tiles.group.updateMatrixWorld( true );
	_inv.copy( tiles.group.matrixWorld ).invert();
	_v.copy( pos ).applyMatrix4( _inv );
	tiles.ellipsoid.getPositionToCartographic( _v, _carto );
	return { lat: _carto.lat / DEG, lon: _carto.lon / DEG };
}

function teleport( place ) {
	// On se place au-dessus du point, le sol est trouvé dès que les tuiles arrivent.
	latLonToLocal( place.lat, place.lon, 0, player.pos );
	player.pos.y += 400;
	// direction du nord dans la scène (pour la boussole)
	const north = latLonToLocal( place.lat + 0.001, place.lon, 0, new THREE.Vector3() ).sub( latLonToLocal( place.lat, place.lon, 0, _v ) );
	northYaw = Math.atan2( - north.x, - north.z );
	player.vel.set( 0, 0, 0 );
	player.grounded = false; // pas de gravité tant qu'on n'a pas trouvé le sol
	player.pitch = -0.35;
	$( 'place' ).textContent = place.name;
	toast( 'Chargement de ' + place.name + '…' );
}

// --------------------------------------------------------------------------------------------
// Commandes : clavier + souris, ou écran tactile
// --------------------------------------------------------------------------------------------
const keys = new Set();
const stick = { x: 0, y: 0 };

function setupInput() {
	const canvas = renderer.domElement;
	addEventListener( 'keydown', ( e ) => {
		if ( e.target.tagName === 'INPUT' ) return;
		keys.add( e.code );
		if ( e.code === 'KeyF' ) toggleFly();
		if ( e.code === 'KeyH' && places.home ) teleport( places.home );
		if ( e.code === 'KeyP' ) teleport( places.parc );
		if ( e.code === 'Space' ) e.preventDefault();
	} );
	addEventListener( 'keyup', ( e ) => keys.delete( e.code ) );
	addEventListener( 'blur', () => keys.clear() );

	canvas.addEventListener( 'click', () => { if ( ! isTouch ) canvas.requestPointerLock?.(); } );
	addEventListener( 'mousemove', ( e ) => {
		if ( document.pointerLockElement !== canvas ) return;
		look( e.movementX * 0.0022, e.movementY * 0.0022 );
	} );
	document.addEventListener( 'pointerlockchange', () => {
		$( 'hint' ).hidden = document.pointerLockElement === canvas;
	} );

	$( 'go-home' ).onclick = () => places.home && teleport( places.home );
	$( 'go-parc' ).onclick = () => teleport( places.parc );
	$( 'fly' ).onclick = toggleFly;
	$( 'jump' ).onclick = jump;

	setupTouch( canvas );
}

let isTouch = matchMedia( '(pointer: coarse)' ).matches;

function setupTouch( canvas ) {
	const pad = $( 'pad' ), knob = $( 'knob' );
	let padId = null, lookId = null, lx = 0, ly = 0, cx = 0, cy = 0;
	if ( isTouch ) document.body.classList.add( 'touch' );

	canvas.addEventListener( 'touchstart', ( e ) => {
		isTouch = true;
		document.body.classList.add( 'touch' );
		for ( const t of e.changedTouches ) {
			if ( t.clientX < innerWidth * 0.45 && padId === null ) {
				padId = t.identifier; cx = t.clientX; cy = t.clientY;
				pad.style.left = cx + 'px'; pad.style.top = cy + 'px'; pad.hidden = false;
				knob.style.transform = 'translate(-50%,-50%)';
			} else if ( lookId === null ) {
				lookId = t.identifier; lx = t.clientX; ly = t.clientY;
			}
		}
		e.preventDefault();
	}, { passive: false } );

	canvas.addEventListener( 'touchmove', ( e ) => {
		for ( const t of e.changedTouches ) {
			if ( t.identifier === padId ) {
				let dx = t.clientX - cx, dy = t.clientY - cy;
				const d = Math.hypot( dx, dy ), max = 55;
				if ( d > max ) { dx *= max / d; dy *= max / d; }
				stick.x = dx / max; stick.y = dy / max;
				knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
			} else if ( t.identifier === lookId ) {
				look( ( t.clientX - lx ) * 0.005, ( t.clientY - ly ) * 0.005 );
				lx = t.clientX; ly = t.clientY;
			}
		}
		e.preventDefault();
	}, { passive: false } );

	const end = ( e ) => {
		for ( const t of e.changedTouches ) {
			if ( t.identifier === padId ) { padId = null; stick.x = stick.y = 0; pad.hidden = true; }
			if ( t.identifier === lookId ) lookId = null;
		}
	};
	canvas.addEventListener( 'touchend', end );
	canvas.addEventListener( 'touchcancel', end );
}

function look( dx, dy ) {
	player.yaw -= dx;
	player.pitch = THREE.MathUtils.clamp( player.pitch - dy, -1.5, 1.5 );
}

function toggleFly() {
	player.fly = ! player.fly;
	player.vel.set( 0, 0, 0 );
	$( 'fly' ).classList.toggle( 'on', player.fly );
	toast( player.fly ? 'Mode drone : Espace monte, C descend' : 'Retour à pied' );
}

function jump() {
	if ( ! player.fly && player.onGround ) { player.vel.y = JUMP; player.onGround = false; }
}

// --------------------------------------------------------------------------------------------
// Déplacements et collisions (rayons lancés sur le vrai relief 3D des tuiles)
// --------------------------------------------------------------------------------------------
const DOWN = new THREE.Vector3( 0, -1, 0 );

function castFirst( origin, dir, far ) {
	raycaster.set( origin, dir );
	raycaster.far = far;
	const hits = raycaster.intersectObject( tiles.group, true );
	return hits[ 0 ] || null;
}

// Sol sous un point : rayon lancé depuis `fromY` vers le bas. `lowest` = garder le dernier impact
// (utile à l'arrivée : on passe à travers les arbres et les toits pour trouver la rue).
function groundAt( x, z, fromY, far = 400, lowest = false ) {
	raycaster.set( _v.set( x, fromY, z ), DOWN );
	raycaster.far = far;
	raycaster.firstHitOnly = ! lowest;
	const hits = raycaster.intersectObject( tiles.group, true );
	raycaster.firstHitOnly = true;
	if ( ! hits.length ) return null;
	return lowest ? hits[ hits.length - 1 ].point.y : hits[ 0 ].point.y;
}

const STEP = 0.9; // hauteur max d'une marche / bordure qu'on enjambe
const _fwd = new THREE.Vector3(), _right = new THREE.Vector3(), _move = new THREE.Vector3(), _chest = new THREE.Vector3();
const _look3 = new THREE.Vector3(), _eul = new THREE.Euler();

function update( dt ) {
	const k = ( c ) => keys.has( c );
	let fx = 0, sx = 0;
	if ( k( 'KeyW' ) || k( 'KeyZ' ) || k( 'ArrowUp' ) ) fx += 1;
	if ( k( 'KeyS' ) || k( 'ArrowDown' ) ) fx -= 1;
	if ( k( 'KeyD' ) || k( 'ArrowRight' ) ) sx += 1;
	if ( k( 'KeyA' ) || k( 'KeyQ' ) || k( 'ArrowLeft' ) ) sx -= 1;
	fx -= stick.y; sx += stick.x;
	const fast = k( 'ShiftLeft' ) || k( 'ShiftRight' ) || Math.hypot( stick.x, stick.y ) > 0.95;

	_fwd.set( - Math.sin( player.yaw ), 0, - Math.cos( player.yaw ) );
	_right.set( Math.cos( player.yaw ), 0, - Math.sin( player.yaw ) );
	_move.set( 0, 0, 0 ).addScaledVector( _fwd, fx ).addScaledVector( _right, sx );
	if ( _move.lengthSq() > 1 ) _move.normalize();

	if ( player.fly ) {
		const speed = fast ? FLY_FAST : FLY;
		// en drone, avancer suit le regard (on peut plonger vers une rue)
		_look3.set( 0, 0, -1 ).applyEuler( _eul.set( player.pitch, player.yaw, 0, 'YXZ' ) );
		player.pos.addScaledVector( _look3, fx * speed * dt ).addScaledVector( _right, sx * speed * dt );
		if ( k( 'Space' ) ) player.pos.y += speed * dt;
		if ( k( 'KeyC' ) || k( 'ControlLeft' ) ) player.pos.y -= speed * dt;
		const g = groundAt( player.pos.x, player.pos.z, player.pos.y + 1, 600 );
		if ( g !== null && player.pos.y < g + EYE ) player.pos.y = g + EYE;
		return;
	}

	// Arrivée : on attend en l'air que le sol soit chargé, puis on se pose dans la rue.
	if ( ! player.grounded ) {
		const g = groundAt( player.pos.x, player.pos.z, player.pos.y + 50, 1500, true );
		if ( g === null || tiles.stats.downloading > 4 ) return; // laisser arriver le détail d'abord
		player.pos.y = g + EYE;
		player.grounded = true;
		player.pitch = 0;
		toast( 'Bonne balade !' );
		return;
	}

	if ( k( 'Space' ) ) jump();
	let feet = player.pos.y - EYE;

	const speed = fast ? RUN : WALK;
	const step = _move.multiplyScalar( speed * dt );
	if ( step.lengthSq() > 0 ) {
		// mur devant ? (rayon à hauteur de poitrine, un peu plus loin que le pas)
		_chest.set( player.pos.x, feet + 1.1, player.pos.z );
		const dir = step.clone().normalize();
		const wall = castFirst( _chest, dir, step.length() + 0.45 );
		if ( wall && wall.face && Math.abs( worldNormal( wall ).y ) < 0.6 ) {
			// on glisse le long du mur
			const n = worldNormal( wall ); n.y = 0; n.normalize();
			step.addScaledVector( n, - step.dot( n ) );
			if ( step.lengthSq() > 1e-8 && castFirst( _chest, step.clone().normalize(), step.length() + 0.45 ) ) step.set( 0, 0, 0 );
		}
		const nx = player.pos.x + step.x, nz = player.pos.z + step.z;
		const g2 = groundAt( nx, nz, feet + STEP, 400 );
		// pas de sol chargé là-bas, ou chute de plus de 6 m d'un coup : on ne bouge pas
		if ( g2 !== null && feet - g2 < 6 ) { player.pos.x = nx; player.pos.z = nz; }
	}

	// gravité
	player.vel.y -= GRAVITY * dt;
	player.pos.y += player.vel.y * dt;
	feet = player.pos.y - EYE;
	const floor = groundAt( player.pos.x, player.pos.z, Math.max( feet, player.pos.y - player.vel.y * dt - EYE ) + STEP, 400 );
	if ( floor === null ) { player.pos.y -= player.vel.y * dt; player.vel.y = 0; return; }
	if ( feet <= floor || ( feet - floor < 0.25 && player.vel.y <= 0 ) ) {
		// au sol (monte les bordures en douceur, descend sans sautiller)
		player.pos.y = feet < floor ? THREE.MathUtils.damp( feet, floor, 20, dt ) + EYE : floor + EYE;
		if ( player.pos.y - EYE < floor - 0.08 ) player.pos.y = floor - 0.08 + EYE;
		player.vel.y = 0;
		player.onGround = true;
	} else {
		player.onGround = false;
	}
}

const _n = new THREE.Vector3(), _nm = new THREE.Matrix3();
function worldNormal( hit ) {
	_nm.getNormalMatrix( hit.object.matrixWorld );
	return _n.copy( hit.face.normal ).applyMatrix3( _nm ).normalize();
}

// --------------------------------------------------------------------------------------------
// Boucle
// --------------------------------------------------------------------------------------------
let northYaw = 0;
const clock = new THREE.Clock();
let hudTimer = 0;

function frame() {
	const dt = Math.min( clock.getDelta(), 0.05 );
	update( dt );

	camera.position.copy( player.pos );
	camera.rotation.set( player.pitch, player.yaw, 0, 'YXZ' );
	camera.updateMatrixWorld();

	tiles.update();
	renderer.render( scene, camera );

	hudTimer -= dt;
	if ( hudTimer <= 0 ) {
		hudTimer = 0.5;
		const { lat, lon } = localToLatLon( player.pos );
		$( 'coords' ).textContent = lat.toFixed( 5 ) + ', ' + lon.toFixed( 5 );
		const deg = ( ( ( northYaw - player.yaw ) / DEG ) % 360 + 360 ) % 360;
		$( 'compass' ).textContent = [ 'N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO' ][ Math.round( deg / 45 ) % 8 ];
		const loading = tiles.stats.downloading + tiles.stats.parsing;
		$( 'loading' ).hidden = loading === 0;
		const attr = tiles.getAttributions().filter( ( a ) => a.type === 'string' ).map( ( a ) => a.value ).join( ' ' );
		$( 'attrib' ).textContent = attr ? 'Google · ' + attr : 'Google';
	}
}

let toastTimer;
function toast( text ) {
	$( 'toast' ).textContent = text;
	$( 'toast' ).hidden = false;
	clearTimeout( toastTimer );
	toastTimer = setTimeout( () => { $( 'toast' ).hidden = true; }, 2500 );
}
