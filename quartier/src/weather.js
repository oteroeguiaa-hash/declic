// Météo et heure réelles : ciel, lumière, brouillard, pluie et neige selon le temps qu'il fait
// en ce moment à Woluwe (Open-Meteo, gratuit, sans clé) et la position réelle du soleil.
import * as THREE from 'three';

const DEG = Math.PI / 180;

// Codes météo WMO -> texte + icône
const CODES = {
	0: [ 'Ciel dégagé', '☀️' ], 1: [ 'Plutôt dégagé', '🌤️' ], 2: [ 'Nuageux', '⛅' ], 3: [ 'Couvert', '☁️' ],
	45: [ 'Brouillard', '🌫️' ], 48: [ 'Brouillard givrant', '🌫️' ],
	51: [ 'Bruine', '🌦️' ], 53: [ 'Bruine', '🌦️' ], 55: [ 'Bruine forte', '🌧️' ], 56: [ 'Bruine verglaçante', '🌧️' ], 57: [ 'Bruine verglaçante', '🌧️' ],
	61: [ 'Pluie faible', '🌦️' ], 63: [ 'Pluie', '🌧️' ], 65: [ 'Forte pluie', '🌧️' ], 66: [ 'Pluie verglaçante', '🌧️' ], 67: [ 'Pluie verglaçante', '🌧️' ],
	71: [ 'Neige faible', '🌨️' ], 73: [ 'Neige', '🌨️' ], 75: [ 'Forte neige', '❄️' ], 77: [ 'Grains de neige', '🌨️' ],
	80: [ 'Averses', '🌦️' ], 81: [ 'Averses', '🌧️' ], 82: [ 'Fortes averses', '⛈️' ], 85: [ 'Averses de neige', '🌨️' ], 86: [ 'Averses de neige', '❄️' ],
	95: [ 'Orage', '⛈️' ], 96: [ 'Orage et grêle', '⛈️' ], 99: [ 'Orage et grêle', '⛈️' ],
};

// Pour tester sans attendre la pluie : ?meteo=pluie|neige|brouillard|nuit|soleil
const FORCED = new URLSearchParams( location.search ).get( 'meteo' );

export class Weather {

	constructor( scene, renderer, lat, lon, maxFar = 2400 ) {
		this.maxFar = maxFar;
		this.fogFar = maxFar;
		this.fogNear = maxFar * 0.25;
		this.scene = scene;
		this.renderer = renderer;
		this.lat = lat;
		this.lon = lon;
		this.now = { code: 1, cloud: 0.2, rain: 0, snow: 0, temp: null, wind: 5, visibility: 20000 };
		this.tint = new THREE.Color( 1, 1, 1 );
		this.sunElev = 30;
		this.listeners = [];

		this.skyCanvas = document.createElement( 'canvas' );
		this.skyCanvas.width = 2; this.skyCanvas.height = 256;
		this.sky = new THREE.CanvasTexture( this.skyCanvas );
		this.sky.colorSpace = THREE.SRGBColorSpace;
		scene.background = this.sky;
		scene.fog = new THREE.Fog( 0xc9dcef, 900, 4000 );

		renderer.toneMapping = THREE.LinearToneMapping;
		renderer.toneMappingExposure = 1;

		this.rain = makeRain();
		this.snow = makeSnow();
		this.stars = makeStars();
		scene.add( this.rain, this.snow, this.stars );

		this.refresh();
		setInterval( () => this.refresh(), 10 * 60 * 1000 );
		this.apply();
		setInterval( () => this.apply(), 30 * 1000 );
	}

	onTint( fn ) { this.listeners.push( fn ); }

	// bouton 🌙 : voir la ville de nuit tout de suite
	setForcedNight( on ) { this.forcedNight = on; this.apply(); }

	// nouveau lieu : on ne redemande la météo que s'il est loin (> 5 km)
	setLocation( lat, lon ) {
		const km = Math.hypot( ( lat - this.lat ) * 111, ( lon - this.lon ) * 70 );
		this.lat = lat; this.lon = lon;
		if ( km > 5 ) this.refresh();
	}

	async refresh() {
		if ( FORCED ) { this.force( FORCED ); this.apply(); return; }
		try {
			const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + this.lat.toFixed( 3 ) + '&longitude=' + this.lon.toFixed( 3 )
				+ '&current=temperature_2m,weather_code,cloud_cover,rain,showers,snowfall,wind_speed_10m,visibility&timezone=auto';
			const res = await fetch( url );
			if ( ! res.ok ) return;
			const c = ( await res.json() ).current;
			this.now = {
				code: c.weather_code,
				cloud: ( c.cloud_cover ?? 30 ) / 100,
				rain: ( c.rain || 0 ) + ( c.showers || 0 ),
				snow: c.snowfall || 0,
				temp: c.temperature_2m,
				wind: c.wind_speed_10m || 0,
				visibility: c.visibility ?? 20000,
			};
			// certains codes indiquent de la pluie même si le cumul instantané est à 0
			if ( this.now.rain === 0 && [ 51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99 ].includes( this.now.code ) ) this.now.rain = this.now.code >= 63 ? 2 : 0.5;
			if ( this.now.snow === 0 && [ 71, 73, 75, 77, 85, 86 ].includes( this.now.code ) ) this.now.snow = 0.5;
			this.apply();
		} catch { /* pas de réseau : on garde la dernière météo */ }
	}

	force( kind ) {
		const base = { temp: 12, wind: 10, visibility: 20000, rain: 0, snow: 0 };
		this.forcedNight = kind === 'nuit';
		this.now = {
			pluie: { ...base, code: 63, cloud: 1, rain: 3, visibility: 6000 },
			neige: { ...base, code: 73, cloud: 1, snow: 1, temp: -1, visibility: 3000 },
			brouillard: { ...base, code: 45, cloud: 1, visibility: 300 },
			nuit: { ...base, code: 0, cloud: 0.1 },
		}[ kind ] || { ...base, code: 0, cloud: 0 };
	}

	apply() {
		const n = this.now;
		this.sunElev = this.forcedNight ? -20 : sunElevation( new Date(), this.lat, this.lon );
		const day = THREE.MathUtils.smoothstep( this.sunElev, -7, 6 );          // 0 nuit, 1 jour
		this.night = 1 - day;
		const dusk = Math.max( 0, 1 - Math.abs( this.sunElev - 1 ) / 8 );      // lever / coucher
		const grey = THREE.MathUtils.clamp( n.cloud * 0.8 + ( n.rain > 0 || n.snow > 0 ? 0.3 : 0 ), 0, 1 );

		// ciel
		const top = mix3( mix3( '#0a1330', '#5d93d6', day ), '#7f8994', grey * day );
		let bottom = mix3( mix3( '#1d2846', '#e3edf6', day ), '#c3c9d0', grey * day );
		bottom = mix3( bottom, '#f3a66a', dusk * ( 1 - grey ) * 0.8 );
		const mid = mix3( top, bottom, 0.55 );
		const g = this.skyCanvas.getContext( '2d' );
		const grad = g.createLinearGradient( 0, 0, 0, 256 );
		grad.addColorStop( 0, top.getStyle() );
		grad.addColorStop( 0.55, mid.getStyle() );
		grad.addColorStop( 1, bottom.getStyle() );
		g.fillStyle = grad;
		g.fillRect( 0, 0, 2, 256 );
		this.sky.needsUpdate = true;

		// brouillard selon la visibilité réelle
		const fogged = [ 45, 48 ].includes( n.code );
		const vis = THREE.MathUtils.clamp( fogged ? Math.min( n.visibility, 400 ) : n.visibility, 150, 20000 );
		this.scene.fog.color.copy( bottom );
		this.fogFar = Math.min( this.maxFar, vis * 0.9 + 200 );
		this.fogNear = Math.min( this.maxFar * 0.25, vis * 0.15 );

		// lumière : les images Google ont la lumière d'une journée claire, on l'adapte
		this.renderer.toneMappingExposure = THREE.MathUtils.lerp( 0.28, 1.0, day ) * ( 1 - 0.22 * grey * day );
		const t = new THREE.Color( 1, 1, 1 );
		t.lerp( new THREE.Color( 0.62, 0.72, 1.0 ), 1 - day );                 // nuit bleutée
		t.lerp( new THREE.Color( 1.0, 0.86, 0.72 ), dusk * ( 1 - grey ) * 0.6 ); // lumière dorée
		t.lerp( new THREE.Color( 0.9, 0.93, 0.97 ), grey * day * 0.6 );         // temps gris, couleurs ternes
		this.tint.copy( t );
		this.listeners.forEach( ( fn ) => fn( this.tint ) );

		this.rain.visible = n.rain > 0;
		const inten = THREE.MathUtils.clamp( n.rain / 4, 0.25, 1 );
		this.rain.material.opacity = 0.2 + 0.3 * inten;
		this.rain.geometry.setDrawRange( 0, Math.floor( this.rain.geometry.attributes.position.count * inten / 2 ) * 2 );
		this.snow.visible = n.snow > 0;
		this.stars.visible = day < 0.3 && n.cloud < 0.7;
		this.stars.material.opacity = ( 1 - day / 0.3 ) * ( 1 - n.cloud );
	}

	label() {
		let [ txt, icon ] = CODES[ this.now.code ] || [ '', '' ];
		if ( this.sunElev < -6 && this.now.code <= 2 ) icon = '🌙';
		const temp = this.now.temp == null ? '' : Math.round( this.now.temp ) + ' °C · ';
		const night = this.sunElev < -6 ? 'nuit · ' : '';
		const time = new Date().toLocaleTimeString( 'fr-BE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels' } );
		return icon + ' ' + temp + night + txt + ' · ' + time;
	}

	update( dt, camPos ) {
		// la chute est calculée par la carte graphique : rien à recalculer ici à chaque image
		const wind = this.now.wind / 3.6;
		const t = performance.now() / 1000;
		for ( const [ obj, drift ] of [ [ this.rain, wind * 0.25 ], [ this.snow, wind * 0.15 ] ] ) {
			const u = obj.userData.uniforms;
			u.uTime.value = t;
			u.uCam.value.copy( camPos );
			u.uDrift.value = drift;
		}
		this.stars.position.copy( camPos );
	}

}

// Position du soleil (approximation NOAA, précise à ~1°)
function sunElevation( date, lat, lon ) {
	const d = ( date.getTime() / 86400000 ) - 10957.5; // jours depuis J2000
	const g = ( 357.529 + 0.98560028 * d ) * DEG;
	const q = 280.459 + 0.98564736 * d;
	const L = ( q + 1.915 * Math.sin( g ) + 0.020 * Math.sin( 2 * g ) ) * DEG;
	const e = ( 23.439 - 0.00000036 * d ) * DEG;
	const dec = Math.asin( Math.sin( e ) * Math.sin( L ) );
	const ra = Math.atan2( Math.cos( e ) * Math.sin( L ), Math.cos( L ) );
	const gmst = ( 18.697374558 + 24.06570982441908 * d ) % 24;
	const ha = ( gmst * 15 + lon ) * DEG - ra;
	const el = Math.asin( Math.sin( lat * DEG ) * Math.sin( dec ) + Math.cos( lat * DEG ) * Math.cos( dec ) * Math.cos( ha ) );
	return el / DEG;
}

function mix3( a, b, t ) {
	return new THREE.Color( a ).lerp( new THREE.Color( b ), THREE.MathUtils.clamp( t, 0, 1 ) );
}

// --- précipitations : particules dans une boîte de 50 m qui suit la caméra -------------------
// Positions de départ fixes ; la chute, le vent et le recyclage autour de la caméra sont faits
// dans le shader (aucun calcul par particule côté processeur).
const BOX = 50, HEIGHT = 30;

function fallingMaterial( mat, speed, tail, sway ) {
	const uniforms = { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uDrift: { value: 0 } };
	mat.onBeforeCompile = ( sh ) => {
		Object.assign( sh.uniforms, uniforms );
		sh.vertexShader = 'uniform float uTime; uniform vec3 uCam; uniform float uDrift; attribute float aTail;\n'
			+ sh.vertexShader.replace( '#include <begin_vertex>', `
			vec3 transformed = position;
			float fall = uTime * ${ speed.toFixed( 2 ) };
			transformed.x += uDrift * uTime ${ sway ? '+ sin( uTime * 0.9 + position.y * 3.1 + position.z ) * 0.4' : '' };
			transformed.x = uCam.x + mod( transformed.x - uCam.x, ${ BOX.toFixed( 1 ) } ) - ${ ( BOX / 2 ).toFixed( 1 ) };
			transformed.z = uCam.z + mod( transformed.z - uCam.z, ${ BOX.toFixed( 1 ) } ) - ${ ( BOX / 2 ).toFixed( 1 ) };
			transformed.y = uCam.y - ${ ( HEIGHT / 2 ).toFixed( 1 ) } + mod( position.y - fall, ${ HEIGHT.toFixed( 1 ) } ) - aTail * ${ tail.toFixed( 2 ) };
			transformed.x -= aTail * uDrift * 0.04;
			` );
	};
	return uniforms;
}

function fallingGeometry( N, perDrop ) {
	const pos = new Float32Array( N * perDrop * 3 );
	const tail = new Float32Array( N * perDrop );
	for ( let i = 0; i < N; i ++ ) {
		const x = Math.random() * BOX, y = Math.random() * HEIGHT, z = Math.random() * BOX;
		for ( let k = 0; k < perDrop; k ++ ) { pos.set( [ x, y, z ], ( i * perDrop + k ) * 3 ); tail[ i * perDrop + k ] = k; }
	}
	const geo = new THREE.BufferGeometry();
	geo.setAttribute( 'position', new THREE.BufferAttribute( pos, 3 ) );
	geo.setAttribute( 'aTail', new THREE.BufferAttribute( tail, 1 ) );
	return geo;
}

function makeRain() {
	const mat = new THREE.LineBasicMaterial( { color: 0xb8c4d0, transparent: true, opacity: 0.45, fog: false, depthWrite: false } );
	const uniforms = fallingMaterial( mat, 9.5, 0.45, false );
	const lines = new THREE.LineSegments( fallingGeometry( 6000, 2 ), mat );
	lines.frustumCulled = false;
	lines.visible = false;
	lines.userData.uniforms = uniforms;
	return lines;
}

function makeSnow() {
	const mat = new THREE.PointsMaterial( { color: 0xffffff, size: 0.07, transparent: true, opacity: 0.9, fog: false, depthWrite: false } );
	const uniforms = fallingMaterial( mat, 1.1, 0, true );
	const pts = new THREE.Points( fallingGeometry( 5000, 1 ), mat );
	pts.frustumCulled = false;
	pts.visible = false;
	pts.userData.uniforms = uniforms;
	return pts;
}

function makeStars() {
	const N = 1500;
	const pos = new Float32Array( N * 3 );
	for ( let i = 0; i < N; i ++ ) {
		const v = new THREE.Vector3().randomDirection();
		v.y = Math.abs( v.y ) + 0.05;
		v.normalize().multiplyScalar( 1200 ); // en deçà de la distance de vue
		pos.set( [ v.x, v.y, v.z ], i * 3 );
	}
	const geo = new THREE.BufferGeometry();
	geo.setAttribute( 'position', new THREE.BufferAttribute( pos, 3 ) );
	const mat = new THREE.PointsMaterial( { color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false, depthTest: false } );
	const pts = new THREE.Points( geo, mat );
	pts.frustumCulled = false;
	pts.visible = false;
	pts.renderOrder = -1;
	return pts;
}
