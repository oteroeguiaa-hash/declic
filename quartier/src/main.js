// Balade 3D dans le quartier, sur les tuiles 3D photoréalistes de Google (les mêmes que Google Maps / Earth).
// Source de ce fichier ; le navigateur charge app.js, produit par : npm run build:quartier
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { Weather } from './weather.js';
import { GpsMap } from './map.js';
import { NightCity, nightUniforms, NIGHT_HEAD, NIGHT_CODE, NIGHT_VERTEX } from './night.js';
import { StreetView, svUniforms, SV_HEAD, SV_CODE } from './streetview.js';
import { OsmWalls } from './osmwalls.js';
import { Footsteps } from './footsteps.js';
import { Traffic } from './traffic.js';
import { makeCar, makeTram, TYPES } from './cars.js';
import { Interior, euro } from './interior.js';
import { Shops } from './shops.js';
import { lookupPlace } from './places.js';
import { CityGen, maskUniforms, MASK_HEAD, MASK_CODE } from './citygen.js';
import { osmStatus } from './osm.js';
import { Ambience } from './ambience.js';
import { Bombs } from './bombs.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

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
let renderer, scene, camera, tiles, raycaster, weather, reorient, gps, nightCity, streetView, walls, steps, traffic, interior, shops;
let bombs = null;
let nearShop = null, currentHint = null, apiKey = '', qualityName = 'haute', city = null, ambience = null, post = null;
// Réglages par qualité : détail au loin (errorTarget, plus petit = plus net), rayon autour du joueur
// chargé au détail maximal de Google, résolution max de l'écran.
// far = distance de vue à pied (au-delà : brouillard) ; au loin on ne charge donc plus rien d'inutile.
// --- appareil : sur téléphone, Safari ferme la page si on dépasse sa mémoire (« Un problème est apparu »).
// On applique donc des limites strictes, et encore plus basses si la dernière partie a planté.
const MOBILE = /iPhone|iPad|iPod|Android/i.test( navigator.userAgent ) || ( matchMedia( '(pointer: coarse)' ).matches && Math.min( screen.width, screen.height ) < 900 );
let CRASHED = false;
try { CRASHED = sessionStorage.getItem( 'quartier.running' ) === '1' || localStorage.getItem( 'quartier.light' ) === '1'; } catch { /* */ }
const LIGHT = MOBILE && CRASHED; // la partie précédente s'est arrêtée brutalement : mode très léger
const DEVICE = LIGHT
	? { bytes: 0.16, minBytes: 0.1, downloads: 6, parse: 1, maxPR: 1.0, region: 1.5, radiusMax: 25, cars: 4, trams: 1, foot: 6, near: 90, windows: 4000, post: false, budget: 0.5 }
	: MOBILE
		? { bytes: 0.24, minBytes: 0.15, downloads: 8, parse: 1, maxPR: 1.15, region: 1.0, radiusMax: 35, cars: 7, trams: 1, foot: 10, near: 120, windows: 8000, post: false, budget: 0.7 }
		: { bytes: 0.6, minBytes: 0.4, downloads: 16, parse: 2, maxPR: 2, region: 0.5, radiusMax: 110, cars: 28, trams: 4, foot: 48, near: 170, windows: 30000, post: true, budget: 1 };
window.__device = DEVICE;
const BASE_BUDGET = DEVICE.budget;

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
const footSphere = new SphereRegion( { errorTarget: DEVICE.region } );
const footRay = new RayRegion( { errorTarget: DEVICE.region } );
const spawn = { time: 0, quiet: 0 };

function start( key, place, quality ) {
	Q = QUALITY[ quality ] || QUALITY.haute;
	apiKey = key; qualityName = quality;
	// L'anticrénelage (MSAA) coûte cher sur les écrans haute densité, où il sert peu.
	if ( MOBILE ) Q = { ...Q, maxPR: Math.min( Q.maxPR, DEVICE.maxPR ), minPR: Math.min( Q.minPR, 0.6 ), radius: Math.min( Q.radius, DEVICE.radiusMax ), error: Math.max( Q.error, 12 ), far: Math.min( Q.far, 1600 ), msaa: false };
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
	tiles.downloadQueue.maxJobs = DEVICE.downloads;
	tiles.parseQueue.maxJobs = DEVICE.parse;
	tiles.loadSiblings = false;          // on va droit au détail de ce qu'on regarde
	tiles.lruCache.maxBytesSize = DEVICE.bytes * 2 ** 30;
	tiles.lruCache.minBytesSize = DEVICE.minBytes * 2 ** 30;
	if ( MOBILE ) { tiles.lruCache.maxSize = Math.min( tiles.lruCache.maxSize, 500 ); tiles.lruCache.minSize = Math.min( tiles.lruCache.minSize, 300 ); }

	// si le navigateur perd la carte graphique (mémoire saturée), on prévient et on relance en mode léger
	renderer.domElement.addEventListener( 'webglcontextlost', ( e ) => {
		e.preventDefault();
		try { localStorage.setItem( 'quartier.light', '1' ); } catch { /* */ }
		showError( 'Le téléphone manque de mémoire : relance automatique en mode léger…' );
		setTimeout( () => location.reload(), 1500 );
	} );
	// repère de plantage : effacé quand on quitte normalement la page
	try { sessionStorage.setItem( 'quartier.running', '1' ); } catch { /* */ }
	addEventListener( 'pagehide', () => { try { sessionStorage.removeItem( 'quartier.running' ); } catch { /* */ } } );
	if ( LIGHT ) setTimeout( () => toast( 'Mode léger activé pour ce téléphone (moins de détails, plus stable)' ), 2500 );
	// 10 minutes sans souci : la prochaine partie peut réessayer le mode téléphone normal
	setTimeout( () => { try { localStorage.removeItem( 'quartier.light' ); } catch { /* */ } }, 10 * 60 * 1000 );

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
	weather.onTint( ( tint ) => {
		grade.uTint.value.copy( tint );
		grade.uSunDir.value.copy( weather.sunDir );
		grade.uSunLow.value = weather.sunLow;
	} );
	weather.axes = () => ( {
		north: new THREE.Vector3( - Math.sin( northYaw ), 0, - Math.cos( northYaw ) ),
		east: new THREE.Vector3( Math.cos( northYaw ), 0, - Math.sin( northYaw ) ),
	} );
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

	// Marche : vrais murs (OpenStreetMap), photos Street View projetées sur la 3D, bruits de pas
	walls = new OsmWalls( {
		Vector3: THREE.Vector3,
		here: () => localToLatLon( player.pos ),
		toLocal: ( lat, lon, t ) => latLonToLocal( lat, lon, 0, t ),
	} );
	streetView = new StreetView( renderer, scene, tiles.group, key, {
		here: () => localToLatLon( player.pos ),
		toLocal: ( lat, lon, t ) => latLonToLocal( lat, lon, 0, t ),
		groundAt: ( x, z ) => { const h = upwardHits( x, z, player.pos.y + 60, 300 ); return h.length ? h[ h.length - 1 ].point.y : null; },
		feet: () => player.pos.y - EYE,
		axes: () => ( {
			north: new THREE.Vector3( - Math.sin( northYaw ), 0, - Math.cos( northYaw ) ),
			east: new THREE.Vector3( Math.cos( northYaw ), 0, - Math.sin( northYaw ) ),
		} ),
		hideForDepth: ( hide, prev ) => {
			const objs = [ weather.rain, weather.snow, weather.stars, weather.skyDome, nightCity.group, traffic.group ];
			if ( hide ) { const was = objs.map( ( o ) => o.visible ); objs.forEach( ( o ) => { o.visible = false; } ); return was; }
			objs.forEach( ( o, i ) => { o.visible = prev[ i ]; } );
		},
	} );
	streetView.onStatus = ( msg ) => { if ( msg ) toast( msg ); };
	steps = new Footsteps();

	// la ville la nuit : fenêtres, lampadaires, traînées de phares
	nightCity = new NightCity( scene, {
		// (scène d'essai : 1 « degré » = 111 320 m, pour que les distances restent justes)
		here: () => TEST_TILESET ? { lat: player.pos.z / 111320, lon: player.pos.x / 111320 } : localToLatLon( player.pos ),
		toLocal: TEST_TILESET ? ( lat, lon, t ) => t.set( lon * 111320, 0, lat * 111320 ) : ( lat, lon, t ) => latLonToLocal( lat, lon, 0, t ),
		groundAt: ( x, z ) => { const h = upwardHits( x, z, player.pos.y + 150, 800 ); return h.length ? h[ h.length - 1 ].point.y : null; },
		roofAt: ( x, z ) => { const h = upwardHits( x, z, player.pos.y + 300, 900 ); return h.length ? h[ 0 ].point.y : null; },
		fake: TEST_TILESET ? () => [
			{ type: 'way', id: 12345, tags: { building: 'yes' }, geometry: [ [ -12, -10 ], [ -12, 10 ], [ -30, 10 ], [ -30, -10 ], [ -12, -10 ] ].map( ( [ z, x ] ) => ( { lat: z / 111320, lon: x / 111320 } ) ) },
			{ type: 'way', id: 1, tags: { highway: 'primary' }, geometry: [ { lat: 30 / 111320, lon: -150 / 111320 }, { lat: 30 / 111320, lon: 150 / 111320 } ] },
			...Array.from( { length: 10 }, ( _, i ) => ( { type: 'node', lat: 24 / 111320, lon: ( -100 + i * 22 ) / 111320 } ) ),
		] : null,
	} );

	// fausse circulation sur les vraies rues : voitures, trams, passants
	const lifeGeo = {
		// (scène d'essai : 1 « degré » = 111 320 m, pour que les distances restent justes)
		here: () => TEST_TILESET ? { lat: player.pos.z / 111320, lon: player.pos.x / 111320 } : localToLatLon( player.pos ),
		toLocal: TEST_TILESET ? ( lat, lon, t ) => t.set( lon * 111320, 0, lat * 111320 ) : ( lat, lon, t ) => latLonToLocal( lat, lon, 0, t ),
		groundAt: ( x, z ) => { const h = upwardHits( x, z, player.pos.y + 150, 800 ); return h.length ? h[ h.length - 1 ].point.y : null; },
		roofAt: ( x, z ) => { const h = upwardHits( x, z, player.pos.y + 300, 900 ); return h.length ? h[ 0 ].point.y : null; },
		fake: TEST_TILESET ? () => [
			{ type: 'way', id: 2, tags: { railway: 'tram' }, geometry: [ { lat: 45 / 111320, lon: -150 / 111320 }, { lat: 45 / 111320, lon: 150 / 111320 } ] },
			{ type: 'way', id: 3, tags: { highway: 'residential' }, geometry: [ { lat: -100 / 111320, lon: 40 / 111320 }, { lat: 120 / 111320, lon: 40 / 111320 } ] },
			{ type: 'way', id: 12345, tags: { building: 'yes' }, geometry: [ [ -12, -10 ], [ -12, 10 ], [ -30, 10 ], [ -30, -10 ], [ -12, -10 ] ].map( ( [ z, x ] ) => ( { lat: z / 111320, lon: x / 111320 } ) ) },
			{ type: 'way', id: 1, tags: { highway: 'primary' }, geometry: [ { lat: 30 / 111320, lon: -150 / 111320 }, { lat: 30 / 111320, lon: 150 / 111320 } ] },
			...Array.from( { length: 10 }, ( _, i ) => ( { type: 'node', lat: 24 / 111320, lon: ( -100 + i * 22 ) / 111320 } ) ),
		] : null,
	};
	const base = { normale: { car: 10, tram: 2, foot: 18 }, haute: { car: 18, tram: 3, foot: 32 }, ultra: { car: 28, tram: 4, foot: 48 } }[ quality ] || { car: 18, tram: 3, foot: 32 };
	const counts = { car: Math.min( base.car, DEVICE.cars ), tram: Math.min( base.tram, DEVICE.trams ), foot: Math.min( base.foot, DEVICE.foot ) };
	traffic = new Traffic( scene, lifeGeo, counts, renderer );
	// magasins : vrais commerces du quartier, intérieurs fabriqués selon leur type
	interior = new Interior( renderer );
	// ville construite par le jeu là où Google n'a pas de 3D
	city = new CityGen( scene, {
		...lifeGeo, Vector3: THREE.Vector3,
		roofAt: ( x, z ) => { const h = upwardHits( x, z, player.pos.y + 300, 900 ); return h.length ? h[ 0 ].point.y : null; },
		fake: TEST_TILESET ? () => [
			{ type: 'way', id: 12345, tags: { building: 'yes' }, geometry: [ [ -12, -10 ], [ -12, 10 ], [ -30, 10 ], [ -30, -10 ], [ -12, -10 ] ].map( ( [ z, x ] ) => ( { lat: z / 111320, lon: x / 111320 } ) ) },
			{ type: 'way', id: 501, tags: { building: 'house' }, geometry: [ [ 6, 40 ], [ 6, 49 ], [ -4, 49 ], [ -4, 40 ], [ 6, 40 ] ].map( ( [ z, x ] ) => ( { lat: z / 111320, lon: x / 111320 } ) ) },
			{ type: 'way', id: 502, tags: { building: 'house' }, geometry: [ [ 6, 49 ], [ 6, 57 ], [ -4, 57 ], [ -4, 49 ], [ 6, 49 ] ].map( ( [ z, x ] ) => ( { lat: z / 111320, lon: x / 111320 } ) ) },
			{ type: 'way', id: 503, tags: { building: 'apartments', 'building:levels': '5' }, geometry: [ [ 14, 40 ], [ 14, 58 ], [ 26, 58 ], [ 26, 40 ], [ 14, 40 ] ].map( ( [ z, x ] ) => ( { lat: z / 111320, lon: x / 111320 } ) ) },
			{ type: 'node', id: 504, lat: 9 / 111320, lon: 36 / 111320, tags: { natural: 'tree' } },
			{ type: 'node', id: 505, lat: 9 / 111320, lon: 62 / 111320, tags: { natural: 'tree' } },
		] : null,
	} );
	city.onStatus = ( m ) => toast( m );
	osmStatus.onError = () => toast( 'OpenStreetMap ne répond pas, nouvel essai dans un moment…' );
	ambience = new Ambience();
	// bombes (mode drone)
	bombs = new Bombs( scene, { castFirst, groundAt: ( x, z ) => { const h = upwardHits( x, z, player.pos.y + 50, 2000 ); return h.length ? h[ h.length - 1 ].point.y : null; } } );
	bombs.onImpact = ( p, r ) => {
		for ( const pile of city.destroy( p, r ) ) bombs.rubble( pile.x, pile.y, pile.z, pile.r );
		walls.destroy( p.x, p.z, r );
		traffic.blast( p, r );
		const d = player.pos.distanceTo( p );
		bombs.shake = Math.max( bombs.shake, Math.max( 0, 1 - d / 350 ) );
		ambience.boom( d );
	};
	setupPost();
	shops = new Shops( { ...lifeGeo, Vector3: THREE.Vector3, fake: TEST_TILESET ? () => [ { type: 'node', lat: -8 / 111320, lon: 0, tags: { shop: 'bakery', name: 'Boulangerie d\'essai' } } ] : null } );
	weather.onTint( ( t ) => traffic.setTint( t ) );
	traffic.setTint( weather.tint );
	if ( TEST_TILESET ) { window.__gps = gps; window.__player = player; window.__sv = () => streetView; window.__THREE = THREE; window.__night = () => nightCity; window.__show = () => ( { makeCar, makeTram, TYPES, renderer, scene, traffic } ); window.__in = () => interior; window.__city = () => city; window.__mask = maskUniforms; } // pour les essais automatiques

	addEventListener( 'resize', onResize );
	setupInput();
	teleport( place );
	renderer.setAnimationLoop( frame );
}

const grade = { uTint: { value: new THREE.Color( 1, 1, 1 ) }, uSunDir: { value: new THREE.Vector3( 0, 1, 0 ) }, uSunLow: { value: 0 } };
function gradeShader( sh ) {
	sh.uniforms.uTint = grade.uTint;
	sh.uniforms.uSunDir = grade.uSunDir;
	sh.uniforms.uSunLow = grade.uSunLow;
	Object.assign( sh.uniforms, nightUniforms, svUniforms, maskUniforms );
	sh.vertexShader = NIGHT_VERTEX[ 0 ] + '\n' + sh.vertexShader.replace( '#include <project_vertex>', NIGHT_VERTEX[ 1 ] );
	sh.fragmentShader = 'uniform vec3 uTint; uniform vec3 uSunDir; uniform float uSunLow;\n' + NIGHT_HEAD + SV_HEAD + MASK_HEAD + sh.fragmentShader.replace( '#include <map_fragment>', `#include <map_fragment>
	${ MASK_CODE }
	${ SV_CODE }
	{
		vec3 c = diffuseColor.rgb;
		float l = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
		c = mix( vec3( l ), c, 1.12 );                       // couleurs un peu plus vives
		c = 0.18 * pow( max( c, 0.0 ) / 0.18, vec3( 1.06 ) ); // un peu plus de contraste
		// soleil bas (lever, coucher, hiver) : les façades face au soleil s'allument, les autres s'assombrissent
		if ( uSunLow > 0.01 ) {
			vec3 sn = normalize( cross( dFdx( vWPos ), dFdy( vWPos ) ) );
			float sd = dot( sn, uSunDir );
			c *= 1.0 + uSunLow * ( 0.45 * max( sd, 0.0 ) * vec3( 1.0, 0.85, 0.65 ) - 0.22 * max( - sd, 0.0 ) );
		}
		diffuseColor.rgb = c * uTint;
		${ NIGHT_CODE }
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
	weather.apply(); // le soleil dépend de l'orientation du nouveau repère
	nightCity?.reset();
	walls?.reset();
	streetView?.reset();
	traffic?.reset();
	shops?.reset();
	city?.reset();
	bombs?.reset();
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
		if ( e.code === 'KeyE' || e.code === 'Enter' ) doAction();
		if ( interior?.active ) return; // dans un magasin : seulement marcher, regarder, agir
		if ( e.code === 'KeyF' ) toggleFly();
		if ( e.code === 'KeyB' ) dropBomb();
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
	tap( 'act-btn', doAction );
	$( 'photo-view' ).onclick = () => { $( 'photo-view' ).hidden = true; };
	tap( 'fly', toggleFly );
	tap( 'bomb', dropBomb );
	// bouton heure : Maintenant → 5h → Lever → 10h → 12h → 16h → Coucher → 18h → 22h → Minuit → …
	tap( 'night', () => {
		const m = weather.nextTime();
		$( 'night' ).textContent = m.label;
		$( 'night' ).classList.toggle( 'on', m.id !== 'now' );
		const hhmm = weather.simDate().toLocaleTimeString( 'fr-BE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels' } );
		toast( m.id === 'now' ? 'Heure réelle' : m.label.replace( /^\S+ /, '' ) + ' · ' + hhmm );
	} );
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
function dropBomb() {
	if ( ! player.fly ) { toast( 'Les bombes se larguent en mode drone 🚁' ); return; }
	const v = new THREE.Vector3( 0, 0, - 1 ).applyEuler( new THREE.Euler( 0, player.yaw, 0 ) ).multiplyScalar( Math.min( 30, DRONE * speedMult ) * 0.5 );
	bombs.drop( player.pos, v );
}

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
	$( 'bomb' ).hidden = ! on;
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
const _walkVel = new THREE.Vector3(), _tmpV = new THREE.Vector3();
const _total = new THREE.Vector3(), _sub = new THREE.Vector3(), _dir = new THREE.Vector3(), _probe = new THREE.Vector3();

// Un pas à pied : murs testés à hauteur de genou-hanche et de tête, on glisse le long des façades.
function walkStep( step ) {
	const feet = player.pos.y - EYE;
	if ( walls?.ready ) {
		// vrais murs : seuls les bâtiments et murs / clôtures d'OpenStreetMap arrêtent
		const p = walls.move( player.pos.x, player.pos.z, player.pos.x + step.x, player.pos.z + step.z );
		if ( p.x === player.pos.x && p.z === player.pos.z ) return false;
		const g = groundAt( p.x, p.z, feet + STEP, 400 );
		// sol pas encore chargé : on avance quand même à la même hauteur (plus de mur invisible)
		if ( g !== null && feet - g > 6 ) return false; // vrai vide (pont, mur de soutènement)
		player.pos.x = p.x; player.pos.z = p.z;
		return true;
	}
	for ( const h of [ 1.6 ] ) {
		_probe.set( player.pos.x, feet + h, player.pos.z );
		if ( ! slideFlat( _probe, step ) ) return false;
	}
	const nx = player.pos.x + step.x, nz = player.pos.z + step.z;
	const g = groundAt( nx, nz, feet + STEP, 400 );
	if ( g !== null && feet - g > 6 ) return false;
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
		if ( g !== null ) player.groundY = g;
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
	// démarrage et arrêt progressifs, comme un vrai pas (pas d'arrêt net)
	_walkVel.lerp( _tmpV.copy( _move ).multiplyScalar( speed ), 1 - Math.exp( - dt * ( _move.lengthSq() > 0 ? 7 : 10 ) ) );
	if ( _walkVel.lengthSq() < 1e-4 ) _walkVel.set( 0, 0, 0 );
	_total.copy( _walkVel ).multiplyScalar( dt );
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
		player.groundY = floor;
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
	nightCity?.reset();
	walls?.reset();
	streetView?.reset();
	traffic?.reset();
	shops?.reset();
	city?.reset();
	bombs?.reset();
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
let northYaw = 0, lastX = 0, lastZ = 0, bobPhase = 0, bobAmp = 0;
const clock = new THREE.Clock();
let hudTimer = 0;

// --- rendu « cinéma » dehors : vignette douce, grain fin (qualité Haute / Ultra) ---------------
const CinemaShader = {
	uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uVignette: { value: 0.35 }, uGrain: { value: 0.022 } },
	vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`,
	fragmentShader: `
		uniform sampler2D tDiffuse; uniform float uTime, uVignette, uGrain; varying vec2 vUv;
		float h( vec2 p ) { return fract( sin( dot( p, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ); }
		void main() {
			vec4 c = texture2D( tDiffuse, vUv );
			float d = distance( vUv, vec2( 0.5 ) );
			c.rgb *= mix( 1.0, smoothstep( 0.9, 0.25, d ), uVignette );
			c.rgb += ( h( vUv * 1000.0 + fract( uTime ) * 97.0 ) - 0.5 ) * uGrain * ( 0.4 + c.rgb );
			gl_FragColor = c;
		}`,
};
function setupPost() {
	if ( qualityName === 'normale' || ! DEVICE.post ) { post = null; return; }
	const rt = new THREE.WebGLRenderTarget( 1, 1, { type: THREE.HalfFloatType, samples: 4 } );
	const composer = new EffectComposer( renderer, rt );
	composer.addPass( new RenderPass( scene, camera ) );
	const cinema = new ShaderPass( CinemaShader );
	composer.addPass( cinema );
	composer.addPass( new OutputPass() );
	post = { composer, cinema, w: 0, h: 0, pr: 0 };
}
function renderPost() {
	if ( ! post ) { renderer.render( scene, camera ); return; }
	const pr = renderer.getPixelRatio();
	if ( post.w !== innerWidth || post.h !== innerHeight || post.pr !== pr ) {
		post.w = innerWidth; post.h = innerHeight; post.pr = pr;
		post.composer.setPixelRatio( pr ); post.composer.setSize( innerWidth, innerHeight );
	}
	post.cinema.uniforms.uTime.value = performance.now() / 1000;
	post.composer.render();
}

// --- dans un magasin -----------------------------------------------------------------------------
function frameInside( dt ) {
	const k = ( c ) => keys.has( c );
	let fx = 0, sx = 0;
	if ( k( 'KeyW' ) || k( 'KeyZ' ) || k( 'ArrowUp' ) ) fx += 1;
	if ( k( 'KeyS' ) || k( 'ArrowDown' ) ) fx -= 1;
	if ( k( 'KeyD' ) || k( 'ArrowRight' ) ) sx += 1;
	if ( k( 'KeyA' ) || k( 'KeyQ' ) || k( 'ArrowLeft' ) ) sx -= 1;
	fx -= stick.y; sx += stick.x;
	_fwd.set( - Math.sin( player.yaw ), 0, - Math.cos( player.yaw ) );
	_right.set( Math.cos( player.yaw ), 0, - Math.sin( player.yaw ) );
	_move.set( 0, 0, 0 ).addScaledVector( _fwd, fx ).addScaledVector( _right, sx );
	if ( _move.lengthSq() > 1 ) _move.normalize();
	const speed = ( k( 'ShiftLeft' ) ? 2.6 : 1.4 );
	_walkVel.lerp( _tmpV.copy( _move ).multiplyScalar( speed ), 1 - Math.exp( - dt * 8 ) );
	interior.update( _tmpV.copy( _walkVel ).multiplyScalar( dt ), camera, player.yaw, player.pitch );
	steps.update( dt, Math.hypot( _walkVel.x, _walkVel.z ) );
	if ( Math.abs( camera.far - 60 ) > 1 ) { camera.far = 60; camera.updateProjectionMatrix(); }
	interior.render( renderer, camera );
	hudTimer -= dt;
	if ( hudTimer <= 0 ) {
		hudTimer = 0.15;
		currentHint = interior.hint();
		showAction( currentHint ? currentHint.text : null );
		$( 'coords' ).textContent = '💶 ' + euro( interior.wallet ) + ( interior.basket.length ? ' · 🛒 ' + interior.basket.length : '' );
	}
}

function showAction( text ) {
	const b = $( 'act-btn' );
	if ( ! text ) { b.hidden = true; return; }
	b.hidden = false;
	b.textContent = text + ( isTouch ? '' : '  (E)' );
}

function doAction() {
	if ( interior.active ) {
		const h = currentHint || interior.hint();
		if ( ! h ) return;
		if ( h.act === 'exit' ) return leaveShop();
		const msg = interior.act( h.act );
		if ( msg ) toast( msg );
		currentHint = null;
		return;
	}
	if ( nearShop ) {
		const inf = nearShop.info;
		if ( inf?.closedForGood ) return toast( nearShop.name + ' a fermé définitivement.' );
		if ( inf?.open === false ) return toast( `${ nearShop.name } est fermé maintenant${ inf.hours ? ' · ' + inf.hours : '' }` );
		enterShop( nearShop );
	}
}

function enterShop( s ) {
	document.exitPointerLock?.();
	interior.enter( s, weather.night > 0.5, s.info?.theme || null, qualityName );
	showPhotos( s.info );
	outsidePos = player.pos.clone();
	player.yaw = 0; // face au fond du magasin (l'entrée est derrière nous)
	player.pitch = - 0.05;
	_walkVel.set( 0, 0, 0 );
	placeBefore = $( 'place' ).textContent;
	$( 'place' ).textContent = s.name;
	$( 'minimap' ).style.visibility = 'hidden';
	toast( 'Bienvenue chez ' + s.name + ' · ' + s.label );
}

let outsidePos = null, placeBefore = '';

// vraies photos du magasin (Google), en petit dans un coin ; une tape pour agrandir
function showPhotos( info ) {
	const box = $( 'photos' );
	box.textContent = '';
	if ( ! info?.photos?.length ) { box.hidden = true; return; }
	const title = document.createElement( 'div' );
	title.className = 'ph-title';
	title.textContent = '📸 Le vrai magasin' + ( info.hours ? ' · ' + info.hours : '' );
	box.append( title );
	for ( const u of info.photos.slice( 0, 4 ) ) {
		const img = document.createElement( 'img' );
		img.src = u; img.alt = ''; img.loading = 'lazy';
		img.onclick = () => { $( 'photo-big' ).src = u; $( 'photo-view' ).hidden = false; };
		box.append( img );
	}
	box.hidden = false;
}
function leaveShop() {
	interior.exit();
	if ( outsidePos ) player.pos.copy( outsidePos );
	player.yaw += Math.PI; // on ressort face à la rue
	_walkVel.set( 0, 0, 0 );
	camera.far = 0; // forcera la remise à jour
	$( 'minimap' ).style.visibility = '';
	$( 'act-btn' ).hidden = true;
	$( 'place' ).textContent = placeBefore;
	$( 'photos' ).hidden = true;
	toast( 'À bientôt !' );
}

// Résolution dynamique : si les FPS baissent, on baisse un peu la résolution (puis le détail
// au loin) ; quand ça va mieux, on remonte. Le détail autour du joueur ne change jamais.
const perf = { frames: 0, time: 0, fps: 60 };
function adaptPerformance( rawDt ) {
	perf.frames ++; perf.time += rawDt;
	if ( perf.time < 1 ) return;
	perf.fps = perf.frames / perf.time;
	// moins de calculs par image (bâtiments, fenêtres) quand ça rame
	DEVICE.budget = perf.fps < 22 ? BASE_BUDGET * 0.35 : perf.fps < 35 ? BASE_BUDGET * 0.65 : BASE_BUDGET;
	perf.frames = 0; perf.time = 0;
	const maxPR = Math.min( devicePixelRatio, Q.maxPR );
	let changed = false;
	if ( perf.fps < 48 ) {
		if ( pixelRatio > Q.minPR + 0.01 ) { pixelRatio = Math.max( Q.minPR, pixelRatio - 0.15 ); changed = true; }
		// (on ne dégrade plus le détail de la ville : c'est ce qui la rendait « fondue »)
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
	if ( interior.active ) { frameInside( dt ); return; }
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
	if ( bombs.shake > 0.01 ) { const k = bombs.shake * 0.6; camera.position.x += ( Math.random() - 0.5 ) * k; camera.position.y += ( Math.random() - 0.5 ) * k; camera.rotation.z += ( Math.random() - 0.5 ) * k * 0.05; }
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
	const svActive = false; // photos Street View plaquées : retirées (la 3D reste telle quelle)
	if ( ! TEST_TILESET ) {
		walls.maybeLoad();
		streetView.update( dt, player.pos, svActive );
	}
	steps.update( dt, player.onGround && ! player.fly && speedMult <= 5 ? Math.hypot( _walkVel.x, _walkVel.z ) : 0 );
	if ( ! ( speedMult <= 100 && ! ( player.fly && player.pos.y - ( player.groundY ?? player.pos.y ) > 300 ) ) ) { maskUniforms.uMaskOn.value = 0; city.near.visible = false; }
	else city.update( player.pos, ! player.fly && player.grounded && speedMult <= 10, player.groundY ?? player.pos.y - EYE );
	ambience.set( { day: 1 - weather.night, rain: weather.now.rain > 0 ? Math.min( 1, weather.now.rain / 3 ) : 0, wind: Math.min( 1, ( weather.now.wind || 10 ) / 40 ), inside: false } );
	bombs.update( dt );
	traffic.setNight( THREE.MathUtils.smoothstep( weather.night, 0.3, 0.8 ) );
	traffic.setLighting( weather.sunDir, 1 - weather.night );
	traffic.update( dt, player.pos, speedMult > 100 || ( player.fly && player.pos.y - ( player.groundY ?? player.pos.y ) > 250 ) );
	nightCity.update( dt, player.pos, weather.night, renderer.toneMappingExposure, player.groundY ?? player.pos.y - EYE );
	renderPost();

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
		// devant un vrai commerce, à pied : bouton « Entrer »
		const onFoot = ! player.fly && player.grounded && speedMult <= 10;
		if ( onFoot ) shops.maybeLoad();
		nearShop = onFoot ? shops.nearest( player.pos.x, player.pos.z ) : null;
		// le vrai magasin (Google) : horaires, photos, couleurs — cherché une fois, en arrière-plan
		if ( nearShop && nearShop.named && ! nearShop.asked && ! TEST_TILESET ) {
			nearShop.asked = true;
			const s = nearShop;
			lookupPlace( apiKey, s, weather.simDate() ).then( ( info ) => { s.info = info; } );
		}
		const inf = nearShop?.info;
		showAction( ! nearShop ? null
			: inf?.closedForGood ? `⛔ ${ nearShop.name } · fermé définitivement`
			: inf?.open === false ? `🔒 ${ nearShop.name } · fermé maintenant`
			: `🚪 Entrer · ${ nearShop.name } (${ nearShop.label })${ inf?.rating ? ' · ★ ' + inf.rating.toFixed( 1 ).replace( '.', ',' ) : '' }` );
		// la boussole se place à gauche, juste sous le nom du lieu (loin des boutons)
		const placeBottom = $( 'place' ).parentElement.getBoundingClientRect().bottom;
		$( 'minimap' ).style.top = Math.round( placeBottom + 8 ) + 'px';
		if ( ! TEST_TILESET ) {
			gps.update( lat, lon, northYaw - player.yaw );
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
