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

// Bouton heure : chaque tape passe à la suivante. Heures du jour d'aujourd'hui à Bruxelles,
// lever / coucher calculés pour la date du jour (en novembre : vers 7 h 55 et 16 h 50).
export const TIME_MODES = [
	{ id: 'now', label: '🕒 Maintenant' },
	{ id: '5', h: 5, label: '🌌 5h' },
	{ id: 'sunrise', label: '🌅 Lever' },
	{ id: '10', h: 10, label: '🕙 10h' },
	{ id: '12', h: 12, label: '☀️ 12h' },
	{ id: '16', h: 16, label: '🌤️ 16h' },
	{ id: 'sunset', label: '🌇 Coucher' },
	{ id: '18', h: 18, label: '🌆 18h' },
	{ id: '22', h: 22, label: '🌙 22h' },
	{ id: '0', h: 0, label: '🌑 Minuit' },
];

// minutes de décalage entre Bruxelles et UTC à cet instant (heure d'été / d'hiver comprises)
function brusselsOffset( d ) {
	const f = ( tz ) => new Date( d.toLocaleString( 'en-US', { timeZone: tz } ) );
	return ( f( 'Europe/Brussels' ) - f( 'UTC' ) ) / 60000;
}
// instant correspondant à aujourd'hui h:m à Bruxelles
function brussels( h, m = 0, base = new Date() ) {
	const p = new Intl.DateTimeFormat( 'en-CA', { timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit' } ).format( base ).split( '-' ).map( Number );
	const utc = Date.UTC( p[ 0 ], p[ 1 ] - 1, p[ 2 ], h, m );
	return new Date( utc - brusselsOffset( new Date( utc ) ) * 60000 );
}

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
		this.sunAz = 180;
		this.sunDir = new THREE.Vector3( 0, 1, 0 ); // direction du soleil dans la scène
		this.sunLow = 0;                           // 1 quand le soleil est bas (lumière rasante)
		this.listeners = [];
		this.timeMode = 0;
		this.axes = null; // () => { north, east } : fourni par le jeu

		// ciel : une coupole qui suit la caméra, avec dégradé, lueur du côté du soleil et disque solaire
		scene.background = new THREE.Color( 0x9cc0e6 );
		scene.fog = new THREE.Fog( 0xc9dcef, 900, 4000 );
		this.skyMat = new THREE.ShaderMaterial( {
			uniforms: {
				uTop: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uGround: { value: new THREE.Color() },
				uSun: { value: new THREE.Vector3( 0, 1, 0 ) }, uSunCol: { value: new THREE.Color() }, uGlow: { value: 0 }, uDisc: { value: 0 },
			},
			vertexShader: `varying vec3 vDir; void main() { vDir = normalize( position ); vec4 p = modelViewMatrix * vec4( position, 1.0 ); gl_Position = projectionMatrix * p; gl_Position.z = gl_Position.w * 0.9999; }`,
			fragmentShader: `
				uniform vec3 uTop, uHorizon, uGround, uSun, uSunCol; uniform float uGlow, uDisc; varying vec3 vDir;
				void main() {
					vec3 d = normalize( vDir );
					float t = d.y;
					vec3 col = t > 0.0 ? mix( uHorizon, uTop, pow( t, 0.55 ) ) : mix( uHorizon, uGround, pow( min( - t * 4.0, 1.0 ), 0.7 ) );
					float c = max( dot( d, uSun ), 0.0 );
					col += uSunCol * ( pow( c, 6.0 ) * 0.35 + pow( c, 64.0 ) * 0.6 ) * uGlow;        // halo
					col += uSunCol * smoothstep( 0.99965, 0.9999, c ) * 4.0 * uDisc;                 // disque
					gl_FragColor = vec4( col, 1.0 );
				}`,
			depthWrite: false, depthTest: false, side: THREE.BackSide, fog: false, toneMapped: true,
		} );
		this.skyDome = new THREE.Mesh( new THREE.SphereGeometry( 500, 32, 16 ), this.skyMat );
		this.skyDome.renderOrder = - 10;
		this.skyDome.frustumCulled = false;
		scene.add( this.skyDome );

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

	// bouton heure : mode suivant
	nextTime() {
		this.timeMode = ( this.timeMode + 1 ) % TIME_MODES.length;
		this.apply();
		return TIME_MODES[ this.timeMode ];
	}

	// date simulée selon le mode choisi
	simDate() {
		const m = TIME_MODES[ this.timeMode ];
		if ( m.id === 'now' ) return new Date();
		if ( m.h !== undefined ) return brussels( m.h );
		// lever / coucher : on cherche quand le soleil passe l'horizon aujourd'hui (pas de 2 min)
		const rising = m.id === 'sunrise';
		let prev = null;
		for ( let min = 0; min <= 1440; min += 2 ) {
			const d = brussels( 0, min );
			const e = sunPosition( d, this.lat, this.lon ).elev;
			if ( prev !== null && ( rising ? prev < - 0.83 && e >= - 0.83 : prev >= - 0.83 && e < - 0.83 ) ) {
				return new Date( d.getTime() + ( rising ? 10 : - 12 ) * 60000 ); // soleil juste au-dessus de l'horizon
			}
			prev = e;
		}
		return new Date();
	}

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
		const sp = this.forcedNight ? { elev: - 20, az: 0 } : sunPosition( this.simDate(), this.lat, this.lon );
		this.sunElev = sp.elev; this.sunAz = sp.az;
		const day = THREE.MathUtils.smoothstep( this.sunElev, -7, 6 );          // 0 nuit, 1 jour
		this.night = 1 - day;
		const dusk = Math.max( 0, 1 - Math.abs( this.sunElev - 1 ) / 8 );      // lever / coucher
		const grey = THREE.MathUtils.clamp( n.cloud * 0.8 + ( n.rain > 0 || n.snow > 0 ? 0.3 : 0 ), 0, 1 );

		// ciel
		const top = mix3( mix3( '#0a1330', '#5d93d6', day ), '#7f8994', grey * day );
		let bottom = mix3( mix3( '#1d2846', '#e3edf6', day ), '#c3c9d0', grey * day );
		bottom = mix3( bottom, '#f3a66a', dusk * ( 1 - grey ) * 0.8 );
		const u = this.skyMat.uniforms;
		u.uTop.value.copy( top ); u.uHorizon.value.copy( bottom ); u.uGround.value.copy( bottom ).multiplyScalar( 0.8 );
		this.scene.background.copy( bottom );
		// direction du soleil dans la scène (cap depuis le nord, sens horaire)
		const el = this.sunElev * DEG, az = this.sunAz * DEG;
		if ( this.axes ) {
			const { north, east } = this.axes();
			this.sunDir.set( 0, 0, 0 ).addScaledVector( north, Math.cos( el ) * Math.cos( az ) ).addScaledVector( east, Math.cos( el ) * Math.sin( az ) );
			this.sunDir.y = Math.sin( el );
			this.sunDir.normalize();
		}
		u.uSun.value.copy( this.sunDir );
		const low = Math.max( 0, 1 - Math.max( this.sunElev, 0 ) / 25 ) * THREE.MathUtils.smoothstep( this.sunElev, - 4, 1 );
		this.sunLow = low * ( 1 - grey );
		u.uSunCol.value.copy( mix3( '#fff3dd', '#ff9a4a', low ) );
		u.uGlow.value = THREE.MathUtils.smoothstep( this.sunElev, - 6, 2 ) * ( 1 - grey * 0.85 );
		u.uDisc.value = THREE.MathUtils.smoothstep( this.sunElev, - 1, 1 ) * ( 1 - THREE.MathUtils.smoothstep( n.cloud, 0.55, 0.9 ) ) * ( n.rain || n.snow ? 0 : 1 );

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
		this.stars.material.opacity = ( 1 - day / 0.3 ) * ( 1 - n.cloud ) * 0.55;
	}

	label() {
		let [ txt, icon ] = CODES[ this.now.code ] || [ '', '' ];
		if ( this.sunElev < -6 && this.now.code <= 2 ) icon = '🌙';
		const temp = this.now.temp == null ? '' : Math.round( this.now.temp ) + ' °C · ';
		const night = this.sunElev < -6 ? 'nuit · ' : '';
		const time = this.simDate().toLocaleTimeString( 'fr-BE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels' } );
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
		this.skyDome.position.copy( camPos );
	}

}

// Position du soleil (approximation NOAA, précise à ~1°)
function sunPosition( date, lat, lon ) {
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
	// azimut depuis le nord, sens horaire
	const az = Math.atan2( Math.sin( ha ), Math.cos( ha ) * Math.sin( lat * DEG ) - Math.tan( dec ) * Math.cos( lat * DEG ) ) / DEG + 180;
	return { elev: el / DEG, az: ( az + 360 ) % 360 };
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
	const N = 700;
	const pos = new Float32Array( N * 3 );
	for ( let i = 0; i < N; i ++ ) {
		const v = new THREE.Vector3().randomDirection();
		v.y = Math.abs( v.y ) + 0.05;
		v.normalize().multiplyScalar( 1200 ); // en deçà de la distance de vue
		pos.set( [ v.x, v.y, v.z ], i * 3 );
	}
	const geo = new THREE.BufferGeometry();
	geo.setAttribute( 'position', new THREE.BufferAttribute( pos, 3 ) );
	const mat = new THREE.PointsMaterial( { color: 0xffffff, size: 0.7, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false, depthTest: false } );
	const pts = new THREE.Points( geo, mat );
	pts.frustumCulled = false;
	pts.visible = false;
	pts.renderOrder = -1;
	return pts;
}
