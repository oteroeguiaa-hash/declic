// Balade 3D dans le quartier, sur les tuiles 3D photoréalistes de Google (les mêmes que Google Maps / Earth).
// Source de ce fichier ; le navigateur charge app.js, produit par : npm run build:quartier
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { Weather } from './weather.js';
import { GpsMap } from './map.js';

// Rayons (sol, murs) accélérés : chaque morceau de ville reçoit un index spatial au chargement.
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
// L'index est construit seulement pour les morceaux qu'un rayon touche vraiment (autour du joueur) :
// pas de saccade quand des dizaines de tuiles arrivent en même temps.
THREE.Mesh.prototype.raycast = function ( rc, hits ) {
	const g = this.geometry;
	if ( this.userData.tile && ! g.boundsTree ) {
		try { g.computeBoundsTree(); } catch { this.userData.tile = false; }
	}
	return acceleratedRaycast.call( this, rc, hits );
};
import { TilesRenderer } from '3d-tiles-renderer';
import {
	GoogleCloudAuthPlugin,
	GLTFExtensionsPlugin,
	LoadRegionPlugin,
	SphereRegion,
	RayRegion,
	ReorientationPlugin,
	UnloadTilesPlugin,
} from '3d-tiles-renderer/plugins';

const $ = ( id ) => document.getElementById( id );
const store = {
	get( k ) { try { return localStorage.getItem( k ) || ''; } catch { return ''; } },
	set( k, v ) { try { localStorage.setItem( k, v ); } catch { /* navigation privée */ } },
};

// Lieux de départ. Les coordonnées sont retrouvées sur OpenStreetMap au moment d'y aller ;
// lat/lon = repli approximatif si la recherche ne répond pas.
const PLACES = [
	{ id: 'parc', name: 'Parc Georges-Henri', q: [ 'Parc Georges Henri, Woluwe-Saint-Lambert' ], lat: 50.8418, lon: 4.4093 },
	{ id: 'cinquantenaire', name: 'Parc du Cinquantenaire', q: [ 'Parc du Cinquantenaire, Bruxelles' ], lat: 50.8399, lon: 4.3930 },
	{ id: 'vergote', name: 'Rue Vergote', q: [ 'Rue Vergote, Woluwe-Saint-Lambert', 'Rue Vergote, Bruxelles', 'Square Vergote, Bruxelles' ] },
	{ id: 'hoftenberg', name: 'Hof ten Berg', q: [ 'Hof ten Berg, Woluwe-Saint-Lambert', 'Hof ten Berg, Bruxelles' ] },
	{ id: 'andromede', name: 'Andromède', q: [ 'Andromède, Woluwe-Saint-Lambert', 'Avenue Andromède, Bruxelles' ] },
	{ id: 'docks', name: 'Docks Bruxsel', q: [ 'Docks Bruxsel, Bruxelles', 'Docks Bruxsel' ], lat: 50.8792, lon: 4.3737 },
	{ id: 'shopping', name: 'Woluwe Shopping', q: [ 'Woluwe Shopping, Woluwe-Saint-Lambert', 'Woluwe Shopping' ], lat: 50.8473, lon: 4.4296 },
	{ id: 'court', name: 'Court-Saint-Étienne · rue Émile Henricot', q: [ 'Rue Émile Henricot, Court-Saint-Étienne' ], lat: 50.6405, lon: 4.5660 },
];
const DEG = Math.PI / 180;
// Mode d'essai pour le développement : ?tileset=URL charge une petite scène locale à la place de Google.
const TEST_TILESET = new URLSearchParams( location.search ).get( 'tileset' );

const EYE = 1.7; // hauteur des yeux (m)
const WALK = 1.5, DRONE = 8; // vitesse ×1 : un piéton tranquille, un drone qui se promène
const SPEEDS = [ 1, 2, 5, 10, 50, 100, 500, 1000, 10000, 100000, 1000000 ];
// Au-delà de cette vitesse à pied, on ne peut plus tester chaque mur (et la ville n'a pas le temps
// de se charger devant nous) : on file au ras des toits.
const COLLIDE_MAX = 100;
let speedMult = 1;
const GRAVITY = 22, JUMP = 7;

// --------------------------------------------------------------------------------------------
// Écran d'accueil
// --------------------------------------------------------------------------------------------
$( 'key' ).value = store.get( 'quartier.key' );
$( 'home' ).value = store.get( 'quartier.home' );
$( 'quality' ).value = store.get( 'quartier.quality' ) || 'haute';

async function geocode( q ) {
	// Nominatim (OpenStreetMap), limité à la Belgique.
	const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=be&q=' + encodeURIComponent( q );
	const res = await fetch( url, { headers: { 'Accept-Language': 'fr' } } );
	if ( ! res.ok ) throw new Error( 'recherche indisponible' );
	const [ hit ] = await res.json();
	if ( ! hit ) return null;
	return { lat: + hit.lat, lon: + hit.lon, name: hit.display_name.split( ',' ).slice( 0, 2 ).join( ',' ) };
}

const places = { home: null };
const favs = () => { try { return JSON.parse( store.get( 'quartier.favs' ) || '[]' ); } catch { return []; } };

// Trouve les coordonnées d'un lieu (mémorisées ensuite dans le navigateur).
async function resolvePlace( p ) {
	if ( p.resolved ) return p.resolved;
	const cacheKey = 'quartier.geo.' + p.id;
	try { const c = JSON.parse( store.get( cacheKey ) || 'null' ); if ( c ) return ( p.resolved = { ...c, name: p.name } ); } catch { /* */ }
	for ( const q of p.q ) {
		try {
			const r = await geocode( q );
			if ( r ) { store.set( cacheKey, JSON.stringify( { lat: r.lat, lon: r.lon } ) ); return ( p.resolved = { lat: r.lat, lon: r.lon, name: p.name } ); }
		} catch { break; } // pas de réseau : inutile d'insister
	}
	return p.lat != null ? { lat: p.lat, lon: p.lon, name: p.name, approx: true } : null;
}

async function resolveHome() {
	const home = $( 'home' ).value.trim();
	if ( ! home ) { places.home = null; return; }
	const q = /woluwe|bruxelles|brussel|\d{4}/i.test( home ) ? home : home + ', Woluwe-Saint-Lambert';
	try { const p = await geocode( q ); places.home = p ? { ...p, name: 'Ma rue' } : null; } catch { places.home = null; }
}

// liste des lieux dans le menu de départ
for ( const p of PLACES ) $( 'start-place' ).add( new Option( p.name, p.id ) );
$( 'start-place' ).value = store.get( 'quartier.startPlace' ) || 'parc';

async function launch( where ) {
	const key = $( 'key' ).value.trim();
	if ( ! key ) { $( 'msg' ).textContent = 'Il faut une clé Google (voir le mode d\'emploi juste en dessous).'; return; }
	store.set( 'quartier.key', key );
	store.set( 'quartier.home', $( 'home' ).value.trim() );
	store.set( 'quartier.quality', $( 'quality' ).value );
	store.set( 'quartier.startPlace', $( 'start-place' ).value );
	$( 'msg' ).textContent = 'Recherche des adresses…';
	await resolveHome();
	let place;
	if ( where === 'home' ) {
		place = places.home;
		if ( ! place ) {
			$( 'msg' ).textContent = $( 'home' ).value.trim()
				? 'Adresse introuvable. Essaie par exemple « Rue …, 1200 Woluwe-Saint-Lambert ».'
				: 'Écris d\'abord ton adresse.';
			return;
		}
	} else {
		place = await resolvePlace( PLACES.find( ( p ) => p.id === $( 'start-place' ).value ) );
		if ( ! place ) { $( 'msg' ).textContent = 'Lieu introuvable pour le moment, choisis-en un autre.'; return; }
	}
	$( 'menu' ).hidden = true;
	document.body.classList.add( 'playing' );
	goLandscape();
	$( 'hud' ).hidden = false;
	start( key, place, $( 'quality' ).value );
}
$( 'go-home-start' ).onclick = () => launch( 'home' );
$( 'go-start' ).onclick = () => launch( 'pick' );

// Plein écran + écran bloqué à l'horizontale (Android). Sur iPhone, ce n'est pas possible
// depuis une page : un écran demande de tourner le téléphone.
function goLandscape() {
	if ( ! matchMedia( '(pointer: coarse)' ).matches ) return;
	const el = document.documentElement;
	const fs = el.requestFullscreen?.( { navigationUI: 'hide' } );
	Promise.resolve( fs ).catch( () => {} ).then( () => screen.orientation?.lock?.( 'landscape' ) ).catch( () => {} );
}

// --------------------------------------------------------------------------------------------
// Scène
// --------------------------------------------------------------------------------------------
let renderer, scene, camera, tiles, raycaster, weather, reorient, gps;
// Réglages par qualité : détail au loin (errorTarget, plus petit = plus net), rayon autour du joueur
// chargé au détail maximal de Google, résolution max de l'écran.
// far = distance de vue à pied (au-delà : brouillard) ; au loin on ne charge donc plus rien d'inutile.
const QUALITY = {
	normale: { error: 12, radius: 40, maxPR: 1.25, minPR: 0.6, cache: 700, far: 1600, msaa: false },
	haute: { error: 6, radius: 70, maxPR: 1.6, minPR: 0.75, cache: 1100, far: 2400, msaa: 'lowdpi' },
	ultra: { error: 3, radius: 110, maxPR: 2, minPR: 0.9, cache: 1800, far: 3200, msaa: true },
};
let Q = QUALITY.haute;
let pixelRatio = 1;
const player = { pos: new THREE.Vector3(), vel: new THREE.Vector3(), yaw: 0, pitch: 0, onGround: false, fly: false, grounded: false };
// Zones chargées au maximum de détail même hors de l'écran : autour des pieds, et la colonne
// verticale sous le joueur. Sinon, le sol sous nos pieds (hors champ) reste en basse résolution,
// décalé de plusieurs dizaines de mètres, et on se retrouve sous la ville.
const footSphere = new SphereRegion( { errorTarget: 0.5 } );
const footRay = new RayRegion( { errorTarget: 0.5 } );
const spawn = { time: 0, quiet: 0 };

function start( key, place, quality ) {
	Q = QUALITY[ quality ] || QUALITY.haute;
	// L'anticrénelage (MSAA) coûte cher sur les écrans haute densité, où il sert peu.
	const msaa = Q.msaa === true || ( Q.msaa === 'lowdpi' && devicePixelRatio < 1.5 );
	renderer = new THREE.WebGLRenderer( { antialias: msaa, powerPreference: 'high-performance', stencil: false } );
	pixelRatio = Math.min( devicePixelRatio, Q.maxPR );
	renderer.setPixelRatio( pixelRatio );
	renderer.setSize( innerWidth, innerHeight );
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	document.body.prepend( renderer.domElement );

	scene = new THREE.Scene();
	weather = new Weather( scene, renderer, place.lat, place.lon, Q.far );
	// (pas de lumières : la lumière est déjà dans les photos de Google, les tuiles sont « non éclairées »)

	camera = new THREE.PerspectiveCamera( 70, innerWidth / innerHeight, 0.3, Q.far + 200 );

	tiles = new TilesRenderer( TEST_TILESET || undefined );
	if ( ! TEST_TILESET ) tiles.registerPlugin( new GoogleCloudAuthPlugin( { apiToken: key, autoRefreshToken: true, useRecommendedSettings: false } ) );
	const draco = new DRACOLoader().setDecoderPath( './draco/' );
	tiles.registerPlugin( new GLTFExtensionsPlugin( { dracoLoader: draco } ) );
	tiles.registerPlugin( new UnloadTilesPlugin() );
	tiles.registerPlugin( new LoadRegionPlugin( { regions: [ footSphere, footRay ] } ) );
	// Le point de départ devient l'origine, avec Y vers le ciel : on peut marcher en mètres.
	reorient = TEST_TILESET
		? new ReorientationPlugin( { up: '+z', recenter: false } )
		: new ReorientationPlugin( { lat: place.lat * DEG, lon: place.lon * DEG, height: 0, recenter: true } );
	tiles.registerPlugin( reorient );
	// Plus le chiffre est petit, plus c'est détaillé (et lourd).
	tiles.errorTarget = Q.error;
	tiles.lruCache.maxSize = Q.cache;
	tiles.lruCache.minSize = Math.round( Q.cache * 0.6 );
	tiles.downloadQueue.maxJobs = 12;
	tiles.parseQueue.maxJobs = 2;

	// À chaque morceau de ville reçu : textures nettes même au ras du sol (filtrage anisotrope),
	// teinte de la météo / de l'heure, index spatial pour les collisions.
	const maxAniso = renderer.capabilities.getMaxAnisotropy();
	// Chaque morceau reçoit le matériau le plus léger possible (photo sans calcul de lumière),
	// avec un petit étalonnage (contraste, couleurs) et la teinte de la météo partagée par tous.
	tiles.addEventListener( 'load-model', ( { scene: model } ) => {
		model.traverse( ( o ) => {
			if ( ! o.isMesh ) return;
			o.userData.tile = true;
			const old = o.material;
			if ( Array.isArray( old ) ) return;
			const mat = new THREE.MeshBasicMaterial( { map: old.map || null, side: old.side } );
			if ( ! old.map && old.color ) mat.color.copy( old.color );
			if ( mat.map ) { mat.map.anisotropy = maxAniso; mat.map.needsUpdate = true; }
			mat.onBeforeCompile = gradeShader;
			mat.customProgramCacheKey = () => 'tile-grade';
			o.material = mat;
			old.dispose();
		} );
	} );
	tiles.addEventListener( 'dispose-model', ( { scene: model } ) => {
		model.traverse( ( o ) => { if ( o.isMesh && o.geometry.boundsTree ) o.geometry.disposeBoundsTree(); } );
	} );
	weather.onTint( ( tint ) => grade.uTint.value.copy( tint ) );
	grade.uTint.value.copy( weather.tint );
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

	// carte GPS (même clé Google), une tape = téléportation
	gps = new GpsMap( {
		key: TEST_TILESET ? '' : key,
		onTeleport: ( lat, lon ) => teleportTo( lat, lon ),
		onOpen: () => { document.exitPointerLock?.(); keys.clear(); stick.x = stick.y = 0; },
	} );
	gps.onMilestone = ( msg ) => toast( msg );
	if ( TEST_TILESET ) window.__gps = gps; // pour les essais automatiques

	addEventListener( 'resize', onResize );
	setupInput();
	teleport( place );
	renderer.setAnimationLoop( frame );
}

const grade = { uTint: { value: new THREE.Color( 1, 1, 1 ) } };
function gradeShader( sh ) {
	sh.uniforms.uTint = grade.uTint;
	sh.fragmentShader = 'uniform vec3 uTint;\n' + sh.fragmentShader.replace( '#include <map_fragment>', `#include <map_fragment>
	{
		vec3 c = diffuseColor.rgb;
		float l = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
		c = mix( vec3( l ), c, 1.12 );                       // couleurs un peu plus vives
		c = 0.18 * pow( max( c, 0.0 ) / 0.18, vec3( 1.06 ) ); // un peu plus de contraste
		diffuseColor.rgb = c * uTint;
	}` );
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
	// Le lieu devient le centre du monde (précision maximale, sol bien horizontal même à 30 km),
	// puis on se place au-dessus : le sol est trouvé dès que les tuiles arrivent.
	if ( TEST_TILESET ) {
		player.pos.set( 0, 400, 0 );
	} else {
		reorient.lat = place.lat * DEG; reorient.lon = place.lon * DEG;
		reorient.transformLatLonHeightToOrigin( place.lat * DEG, place.lon * DEG, 0 );
		tiles.group.updateMatrixWorld( true );
		latLonToLocal( place.lat, place.lon, 0, player.pos );
		player.pos.y += 400;
	}
	weather.setLocation( place.lat, place.lon );
	// direction du nord dans la scène (pour la boussole)
	const north = TEST_TILESET ? new THREE.Vector3( 0, 0, -1 ) : latLonToLocal( place.lat + 0.001, place.lon, 0, new THREE.Vector3() ).sub( latLonToLocal( place.lat, place.lon, 0, _v ) );
	northYaw = Math.atan2( - north.x, - north.z );
	jumped = true; // pour la trace d'exploration : on ne relie pas l'ancien point au nouveau
	player.vel.set( 0, 0, 0 );
	player.grounded = false; // pas de gravité tant qu'on n'a pas trouvé le sol
	spawn.time = 0; spawn.quiet = 0;
	player.pitch = -0.35;
	$( 'place' ).textContent = place.name;
	toast( 'Chargement de ' + place.name + '…' + ( place.approx ? ' (position approximative)' : '' ) );
	closePlaces();
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
		if ( e.code === 'KeyM' || ( e.code === 'Escape' && gps?.isOpen ) ) { gps.toggle(); return; }
		if ( gps?.isOpen ) return; // la carte est ouverte : les touches sont pour elle
		keys.add( e.code );
		if ( e.code === 'KeyF' ) toggleFly();
		if ( e.code === 'KeyH' && places.home ) teleport( places.home );
		if ( e.code === 'KeyP' ) goTo( PLACES[ 0 ] );
		if ( e.code === 'KeyT' || e.code === 'KeyL' ) togglePlaces();
		if ( e.code === 'KeyV' ) cycleSpeed();
		const n = [ 'Digit1', 'Digit2', 'Digit3', 'Digit4' ].indexOf( e.code );
		if ( n >= 0 ) setSpeed( SPEEDS[ n ] );
		if ( [ 'Equal', 'NumpadAdd', 'BracketRight' ].includes( e.code ) ) stepSpeed( 1 );
		if ( [ 'Minus', 'NumpadSubtract', 'Digit6', 'BracketLeft' ].includes( e.code ) ) stepSpeed( - 1 );
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
		const locked = document.pointerLockElement === canvas;
		$( 'hint' ).hidden = locked;
		$( 'lockhint' ).hidden = ! locked;
	} );

	$( 'places-btn' ).onclick = togglePlaces;
	$( 'places-close' ).onclick = closePlaces;
	// boutons du haut (pointerdown : réagit tout de suite au doigt ; le clic qui suit est ignoré)
	const tap = ( id, fn ) => {
		const el = $( id );
		el.addEventListener( 'pointerdown', ( e ) => { e.preventDefault(); e.stopPropagation(); fn(); } );
		el.addEventListener( 'click', ( e ) => e.preventDefault() );
	};
	tap( 'speed', cycleSpeed );
	tap( 'fly', toggleFly );
	$( 'goto-form' ).onsubmit = async ( e ) => {
		e.preventDefault();
		const q = $( 'goto' ).value.trim();
		if ( ! q ) return;
		$( 'goto-msg' ).textContent = 'Recherche…';
		try {
			const r = await geocode( q );
			if ( ! r ) { $( 'goto-msg' ).textContent = 'Adresse introuvable.'; return; }
			$( 'goto-msg' ).textContent = '';
			teleport( { lat: r.lat, lon: r.lon, name: r.name } );
		} catch { $( 'goto-msg' ).textContent = 'Recherche indisponible, réessaie.'; }
	};
	$( 'save-here' ).onclick = () => {
		const name = prompt( 'Nom de ce lieu ?', $( 'place' ).textContent );
		if ( ! name ) return;
		const { lat, lon } = localToLatLon( player.pos );
		store.set( 'quartier.favs', JSON.stringify( [ ...favs(), { name, lat, lon } ] ) );
		renderPlaces();
		toast( '« ' + name + ' » enregistré' );
	};
	$( 'jump' ).addEventListener( 'pointerdown', ( e ) => { e.preventDefault(); touchUp = true; jump(); } );
	for ( const ev of [ 'pointerup', 'pointercancel', 'pointerleave' ] ) $( 'jump' ).addEventListener( ev, () => { touchUp = false; } );

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

// --- vitesse -----------------------------------------------------------------------------------
const fmt = ( n ) => n.toLocaleString( 'fr-BE' );
function speedLabel( m ) { return '×' + ( m >= 1e6 ? '1 million' : fmt( m ) ); }
function kmh( m ) {
	const v = ( player.fly ? DRONE : WALK ) * m * 3.6;
	return v < 10 ? v.toFixed( 1 ).replace( '.', ',' ) + ' km/h' : fmt( Math.round( v ) ) + ' km/h';
}
function setSpeed( m ) {
	speedMult = m;
	$( 'speed' ).textContent = speedLabel( m );
	$( 'speed' ).classList.toggle( 'on', m > 1 );
	let note = m === 1 ? ' (marche tranquille)' : '';
	if ( ! player.fly && m > COLLIDE_MAX ) note = ' — trop vite pour les murs : on survole les toits';
	toast( speedLabel( m ) + ' · ' + kmh( m ) + note );
}
function stepSpeed( d ) {
	const i = Math.max( 0, Math.min( SPEEDS.length - 1, SPEEDS.indexOf( speedMult ) + d ) );
	setSpeed( SPEEDS[ i ] );
}
function cycleSpeed() { setSpeed( SPEEDS[ ( SPEEDS.indexOf( speedMult ) + 1 ) % SPEEDS.length ] ); }

// Téléportation vers un point de la carte ; le nom de la rue arrive ensuite (OpenStreetMap).
async function teleportTo( lat, lon ) {
	teleport( { lat, lon, name: 'Point choisi sur la carte' } );
	try {
		const res = await fetch( `https://nominatim.openstreetmap.org/reverse?format=json&zoom=17&lat=${ lat }&lon=${ lon }`, { headers: { 'Accept-Language': 'fr' } } );
		const a = ( await res.json() ).address || {};
		const name = [ a.road || a.pedestrian || a.park || a.neighbourhood, a.city || a.town || a.village || a.municipality ].filter( Boolean ).join( ', ' );
		if ( name ) $( 'place' ).textContent = name;
	} catch { /* on garde « Point choisi » */ }
}

// --- panneau des lieux -------------------------------------------------------------------------
function renderPlaces() {
	const list = $( 'places-list' );
	list.textContent = '';
	const add = ( label, fn, del ) => {
		const row = document.createElement( 'div' );
		row.className = 'prow';
		const b = document.createElement( 'button' );
		b.textContent = label;
		b.onclick = fn;
		row.append( b );
		if ( del ) {
			const x = document.createElement( 'button' );
			x.textContent = '✕'; x.className = 'del'; x.title = 'Supprimer';
			x.onclick = del;
			row.append( x );
		}
		list.append( row );
	};
	if ( places.home ) add( '🏠 Ma rue', () => teleport( places.home ) );
	for ( const p of PLACES ) add( p.name, () => goTo( p ) );
	favs().forEach( ( f, i ) => add( '★ ' + f.name, () => teleport( f ), () => {
		const all = favs(); all.splice( i, 1 );
		store.set( 'quartier.favs', JSON.stringify( all ) );
		renderPlaces();
	} ) );
}
function togglePlaces() { if ( $( 'places' ).hidden ) openPlaces(); else closePlaces(); }
function openPlaces() {
	renderPlaces();
	$( 'places' ).hidden = false;
	document.exitPointerLock?.();
	keys.clear();
}
function closePlaces() { $( 'places' ).hidden = true; }
async function goTo( p ) {
	toast( 'Recherche de ' + p.name + '…' );
	const r = await resolvePlace( p );
	if ( r ) teleport( r ); else toast( p.name + ' : introuvable pour le moment' );
}

function look( dx, dy ) {
	player.yaw -= dx;
	player.pitch = THREE.MathUtils.clamp( player.pitch - dy, -1.5, 1.5 );
}

function toggleFly() { setFly( ! player.fly ); }
function setFly( on ) {
	if ( player.fly === on ) return;
	player.fly = on;
	player.vel.set( 0, 0, 0 );
	$( 'fly' ).classList.toggle( 'on', on );
	$( 'fly' ).textContent = on ? '🚶 Marcher' : '🚁 Drone';
	$( 'jump' ).textContent = on ? 'Monter' : 'Saut';
	toast( on ? ( isTouch ? 'Mode drone : le joystick avance, « Monter » pour prendre de la hauteur' : 'Mode drone : Espace monte, C descend' ) : 'Mode marche' );
}


let touchUp = false;
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

// Tous les impacts d'un rayon vertical qui touchent une surface tournée vers le ciel
// (sol, trottoir, toit, haut d'un arbre), du plus haut au plus bas.
function upwardHits( x, z, fromY, far ) {
	raycaster.set( _v.set( x, fromY, z ), DOWN );
	raycaster.far = far;
	raycaster.firstHitOnly = false;
	const hits = raycaster.intersectObject( tiles.group, true );
	raycaster.firstHitOnly = true;
	return hits.filter( ( h ) => h.face && worldNormal( h ).y > 0.3 );
}

// Garde les zones de détail maximal collées au joueur (repère interne des tuiles).
const _ray = new THREE.Ray();
function updateRegions() {
	tiles.group.updateMatrixWorld( true );
	_inv.copy( tiles.group.matrixWorld ).invert();
	footSphere.sphere.center.copy( player.pos ).applyMatrix4( _inv );
	footSphere.sphere.radius = player.grounded ? Q.radius : 25;
	_ray.origin.set( player.pos.x, player.pos.y + 200, player.pos.z ).applyMatrix4( _inv );
	_ray.direction.copy( DOWN ).transformDirection( _inv );
	footRay.ray.copy( _ray );
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
const _total = new THREE.Vector3(), _sub = new THREE.Vector3(), _dir = new THREE.Vector3(), _probe = new THREE.Vector3();

// Un pas à pied : murs testés à hauteur de genou-hanche et de tête, on glisse le long des façades.
function walkStep( step ) {
	const feet = player.pos.y - EYE;
	for ( const h of [ 1.0, 1.6 ] ) {
		_probe.set( player.pos.x, feet + h, player.pos.z );
		if ( ! slideFlat( _probe, step ) ) return false;
	}
	const nx = player.pos.x + step.x, nz = player.pos.z + step.z;
	const g = groundAt( nx, nz, feet + STEP, 400 );
	// pas de sol chargé là-bas, ou chute de plus de 6 m d'un coup : on ne bouge pas
	if ( g === null || feet - g > 6 ) return false;
	player.pos.x = nx; player.pos.z = nz;
	return true;
}

// Corrige `step` (horizontal) s'il fait rentrer dans un mur depuis `origin` ; false = bloqué.
function slideFlat( origin, step ) {
	const len = step.length();
	if ( len < 1e-6 ) return false;
	const wall = castFirst( origin, _dir.copy( step ).divideScalar( len ), len + 0.35 );
	if ( ! wall || ! wall.face ) return true;
	const n = worldNormal( wall );
	if ( Math.abs( n.y ) > 0.6 ) return true; // sol en pente, pas un mur
	n.y = 0; n.normalize();
	step.addScaledVector( n, - step.dot( n ) );
	const l2 = step.length();
	if ( l2 < 1e-4 ) return false;
	return ! castFirst( origin, _dir.copy( step ).divideScalar( l2 ), l2 + 0.35 );
}

// Déplacement libre (drone) avec glissement sur toute surface touchée.
function slideMove( pos, step, radius ) {
	const len = step.length();
	if ( len < 1e-6 ) return false;
	const hit = castFirst( pos, _dir.copy( step ).divideScalar( len ), len + radius );
	if ( hit && hit.face ) {
		const n = worldNormal( hit );
		step.addScaledVector( n, - step.dot( n ) );
		const l2 = step.length();
		if ( l2 < 1e-4 || castFirst( pos, _dir.copy( step ).divideScalar( l2 ), l2 + radius ) ) return false;
	}
	pos.add( step );
	return true;
}
const _fwd = new THREE.Vector3(), _right = new THREE.Vector3(), _move = new THREE.Vector3();
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
		const speed = DRONE * speedMult * ( fast ? 3 : 1 );
		// en drone, avancer suit le regard (on peut plonger vers une rue)
		_look3.set( 0, 0, -1 ).applyEuler( _eul.set( player.pitch, player.yaw, 0, 'YXZ' ) );
		_total.set( 0, 0, 0 ).addScaledVector( _look3, fx ).addScaledVector( _right, sx );
		if ( k( 'Space' ) || touchUp ) _total.y += 1;
		if ( k( 'KeyC' ) || k( 'ControlLeft' ) ) _total.y -= 1;
		if ( _total.lengthSq() > 1 ) _total.normalize();
		_total.multiplyScalar( speed * dt );
		// le drone ne traverse pas les bâtiments : petits pas, et on glisse sur les murs.
		// À très grande vitesse (plus de 40 pas par image), on vole simplement au-dessus.
		const n = Math.ceil( _total.length() / 1.5 );
		if ( n > 40 ) player.pos.add( _total );
		else if ( n > 0 ) {
			_sub.copy( _total ).divideScalar( n );
			for ( let i = 0; i < n; i ++ ) if ( ! slideMove( player.pos, _sub, 1.2 ) ) break;
		}
		const g = groundAt( player.pos.x, player.pos.z, player.pos.y + 1, 600 );
		if ( g !== null && player.pos.y < g + EYE ) player.pos.y = g + EYE;
		recenterIfFar();
		return;
	}

	// Arrivée : on attend en l'air que le sol soit chargé, puis on se pose dans la rue.
	if ( ! player.grounded ) {
		// On attend que toute la colonne sous nos pieds soit chargée en pleine résolution
		// (plus rien en téléchargement pendant un moment), puis on se pose sur la surface
		// tournée vers le ciel la plus basse : la rue, pas le toit ni le haut d'un arbre.
		spawn.time += dt;
		const busy = tiles.stats.downloading + tiles.stats.parsing > 0;
		spawn.quiet = busy ? 0 : spawn.quiet + dt;
		if ( spawn.time < 1.5 || ( spawn.quiet < 0.8 && spawn.time < 20 ) ) return;
		const hits = upwardHits( player.pos.x, player.pos.z, player.pos.y + 100, 3000 );
		if ( ! hits.length ) { spawn.time = 1.5; return; }
		player.pos.y = hits[ hits.length - 1 ].point.y + EYE;
		player.vel.set( 0, 0, 0 );
		player.grounded = true;
		player.pitch = 0;
		toast( 'Bonne balade !' );
		return;
	}

	if ( k( 'Space' ) ) jump();
	let feet = player.pos.y - EYE;

	// ×1 marche tranquille … ×10 ; Maj = trois fois plus vite. Le mouvement est découpé en petits
	// pas (35 cm max) pour qu'aucun mur ne soit « sauté », même à ×10.
	const speed = WALK * speedMult * ( fast ? 3 : 1 );
	_total.copy( _move ).multiplyScalar( speed * dt );
	const dist = _total.length();
	if ( dist > 0 && speedMult > COLLIDE_MAX ) {
		// très grande vitesse : on file au ras des toits, sans tester les murs
		player.pos.add( _total );
		const g = groundAt( player.pos.x, player.pos.z, player.pos.y + 400, 3000 );
		if ( g !== null ) player.pos.y = THREE.MathUtils.damp( player.pos.y, g + EYE, 8, dt );
		player.vel.y = 0;
		player.onGround = true;
		recenterIfFar();
		return;
	}
	if ( dist > 0 ) {
		const n = Math.ceil( dist / 0.35 );
		_sub.copy( _total ).divideScalar( n );
		for ( let i = 0; i < n; i ++ ) {
			if ( ! walkStep( _sub ) ) break;
		}
		feet = player.pos.y - EYE;
	}

	// gravité
	player.vel.y -= GRAVITY * dt;
	player.pos.y += player.vel.y * dt;
	feet = player.pos.y - EYE;
	const floor = groundAt( player.pos.x, player.pos.z, Math.max( feet, player.pos.y - player.vel.y * dt - EYE ) + STEP, 400 );
	if ( floor === null ) {
		// Plus rien sous nos pieds : soit le sol n'est pas encore chargé, soit on est passé
		// sous la surface (le détail vient d'arriver plus haut). On remonte sur le sol au-dessus.
		const above = upwardHits( player.pos.x, player.pos.z, feet + 80, 200 ).filter( ( h ) => h.point.y > feet - 0.5 );
		if ( above.length ) player.pos.y = above[ above.length - 1 ].point.y + EYE;
		else player.pos.y -= player.vel.y * dt;
		player.vel.y = 0;
		return;
	}
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

// Quand on s'éloigne de plus de 3 km du centre du monde, le point où l'on est devient le nouveau
// centre : on reste collé à la Terre (elle est ronde !) et la précision reste au centimètre,
// même en traversant le pays à ×1 million.
function recenterIfFar() {
	if ( TEST_TILESET || Math.hypot( player.pos.x, player.pos.z ) < 3000 ) return;
	tiles.group.updateMatrixWorld( true );
	_inv.copy( tiles.group.matrixWorld ).invert();
	_v.copy( player.pos ).applyMatrix4( _inv );
	tiles.ellipsoid.getPositionToCartographic( _v, _carto );
	const lat = _carto.lat, lon = _carto.lon, h = _carto.height;
	reorient.lat = lat; reorient.lon = lon;
	reorient.transformLatLonHeightToOrigin( lat, lon, 0 );
	tiles.group.updateMatrixWorld( true );
	latLonToLocal( lat / DEG, lon / DEG, h, player.pos );
	player.vel.set( 0, 0, 0 );
	weather.setLocation( lat / DEG, lon / DEG );
}

const _n = new THREE.Vector3(), _nm = new THREE.Matrix3();
function worldNormal( hit ) {
	_nm.getNormalMatrix( hit.object.matrixWorld );
	return _n.copy( hit.face.normal ).applyMatrix3( _nm ).normalize();
}

// --------------------------------------------------------------------------------------------
// Boucle
// --------------------------------------------------------------------------------------------
let jumped = true;
let northYaw = 0, lastX = 0, lastZ = 0, bobPhase = 0, bobAmp = 0;
const clock = new THREE.Clock();
let hudTimer = 0;

// Résolution dynamique : si les FPS baissent, on baisse un peu la résolution (puis le détail
// au loin) ; quand ça va mieux, on remonte. Le détail autour du joueur ne change jamais.
const perf = { frames: 0, time: 0, fps: 60 };
function adaptPerformance( rawDt ) {
	perf.frames ++; perf.time += rawDt;
	if ( perf.time < 1 ) return;
	perf.fps = perf.frames / perf.time;
	perf.frames = 0; perf.time = 0;
	const maxPR = Math.min( devicePixelRatio, Q.maxPR );
	let changed = false;
	if ( perf.fps < 48 ) {
		if ( pixelRatio > Q.minPR + 0.01 ) { pixelRatio = Math.max( Q.minPR, pixelRatio - 0.15 ); changed = true; }
		else if ( tiles.errorTarget < Q.error * 2 ) tiles.errorTarget *= 1.2;
	} else if ( perf.fps > 57 ) {
		if ( tiles.errorTarget > Q.error ) tiles.errorTarget = Math.max( Q.error, tiles.errorTarget / 1.2 );
		else if ( pixelRatio < maxPR - 0.01 ) { pixelRatio = Math.min( maxPR, pixelRatio + 0.05 ); changed = true; }
	}
	if ( changed ) {
		renderer.setPixelRatio( pixelRatio );
		renderer.setSize( innerWidth, innerHeight );
		tiles.setResolutionFromRenderer( camera, renderer );
	}
}

function frame() {
	const rawDt = clock.getDelta();
	const dt = Math.min( rawDt, 0.05 );
	adaptPerformance( rawDt );
	update( dt );

	// léger balancement de la tête quand on marche, comme un vrai pas
	const moved = Math.hypot( player.pos.x - lastX, player.pos.z - lastZ ) / Math.max( dt, 1e-4 );
	lastX = player.pos.x; lastZ = player.pos.z;
	const walking = ! player.fly && player.onGround && moved > 0.3 && moved < 10;
	bobAmp = THREE.MathUtils.damp( bobAmp, walking ? 1 : 0, 6, dt );
	if ( walking ) bobPhase += dt * moved * 2.6;
	camera.position.copy( player.pos );
	camera.position.y += Math.sin( bobPhase * 2 ) * 0.025 * bobAmp;
	camera.position.addScaledVector( _right.set( Math.cos( player.yaw ), 0, - Math.sin( player.yaw ) ), Math.sin( bobPhase ) * 0.015 * bobAmp );
	camera.rotation.set( player.pitch, player.yaw, 0, 'YXZ' );
	camera.updateMatrixWorld();

	// à pied on voit à Q.far mètres, en drone trois fois plus loin
	const far = weather.fogFar * ( player.fly ? 3 : 1 );
	scene.fog.far = far;
	scene.fog.near = weather.fogNear * ( player.fly ? 3 : 1 );
	if ( Math.abs( camera.far - ( far + 200 ) ) > 1 ) {
		camera.far = far + 200;
		camera.updateProjectionMatrix();
	}

	updateRegions();
	tiles.update();
	weather.update( dt, camera.position );
	renderer.render( scene, camera );

	hudTimer -= dt;
	if ( hudTimer <= 0 ) {
		hudTimer = 0.25;
		const { lat, lon } = localToLatLon( player.pos );
		$( 'coords' ).textContent = TEST_TILESET
			? player.pos.toArray().map( ( v ) => v.toFixed( 1 ) ).join( ' ' )
			: lat.toFixed( 5 ) + ', ' + lon.toFixed( 5 );
		const deg = ( ( ( northYaw - player.yaw ) / DEG ) % 360 + 360 ) % 360;
		$( 'compass' ).textContent = [ 'N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO' ][ Math.round( deg / 45 ) % 8 ];
		const loading = tiles.stats.downloading + tiles.stats.parsing;
		$( 'loading' ).hidden = loading === 0;
		const attr = tiles.getAttributions().filter( ( a ) => a.type === 'string' ).map( ( a ) => a.value ).join( ' ' );
		$( 'attrib' ).textContent = attr ? 'Google · ' + attr : 'Google';
		$( 'weather' ).textContent = weather.label();
		$( 'fps' ).textContent = Math.round( perf.fps ) + ' FPS';
		// la boussole se place toujours juste sous les boutons du haut (même s'ils passent sur 2 lignes)
		const btnBottom = document.querySelector( '.btns' ).getBoundingClientRect().bottom;
		$( 'minimap' ).style.top = Math.round( btnBottom + 10 ) + 'px';
		if ( ! TEST_TILESET ) {
			gps.update( lat, lon, northYaw - player.yaw );
			if ( player.grounded || player.fly ) { gps.track( lat, lon, jumped ); jumped = false; }
			gps.setMiniZoom( Math.max( 5, Math.min( 17, Math.round( 17 - Math.log10( speedMult ) * 1.8 - ( player.fly ? 1 : 0 ) ) ) ) );
		}
	}
}

let toastTimer;
function toast( text ) {
	$( 'toast' ).textContent = text;
	$( 'toast' ).hidden = false;
	clearTimeout( toastTimer );
	toastTimer = setTimeout( () => { $( 'toast' ).hidden = true; }, 2500 );
}
