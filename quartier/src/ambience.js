// Ambiance sonore de la ville (100 % synthétisée, aucun fichier) : rumeur lointaine de la circulation,
// vent, voitures qui passent au loin, oiseaux le jour, grillons l'été la nuit, pluie s'il pleut.
export class Ambience {

	constructor() {
		this.ctx = null;
		this.state = { day: 1, rain: 0, wind: 0.3, inside: false };
		const unlock = () => {
			if ( this.ctx ) return;
			try { this.start(); } catch { /* pas de son */ }
		};
		addEventListener( 'pointerdown', unlock );
		addEventListener( 'keydown', unlock );
	}

	start() {
		const c = this.ctx = new ( window.AudioContext || window.webkitAudioContext )();
		this.master = c.createGain(); this.master.gain.value = 0.9; this.master.connect( c.destination );
		const noise = c.createBuffer( 1, c.sampleRate * 4, c.sampleRate );
		const d = noise.getChannelData( 0 );
		let b = 0; for ( let i = 0; i < d.length; i ++ ) { b = ( b + 0.02 * ( Math.random() * 2 - 1 ) ) / 1.02; d[ i ] = b * 3.5; } // bruit brun
		const white = c.createBuffer( 1, c.sampleRate * 2, c.sampleRate );
		const w = white.getChannelData( 0 ); for ( let i = 0; i < w.length; i ++ ) w[ i ] = Math.random() * 2 - 1;
		this.whiteBuf = white;
		const loop = ( buf, filterType, freq, q, gain ) => {
			const s = c.createBufferSource(); s.buffer = buf; s.loop = true;
			const f = c.createBiquadFilter(); f.type = filterType; f.frequency.value = freq; f.Q.value = q;
			const g = c.createGain(); g.gain.value = gain;
			s.connect( f ).connect( g ).connect( this.master ); s.start();
			return { f, g };
		};
		this.hum = loop( noise, 'lowpass', 180, 0.5, 0.18 );     // rumeur de la ville
		this.wind = loop( white, 'bandpass', 500, 0.6, 0.02 );   // vent
		this.rain = loop( white, 'highpass', 1800, 0.3, 0 );     // pluie
		this.next = { car: 2, bird: 1 };
		this.last = c.currentTime;
		setInterval( () => this.tick(), 100 );
	}

	set( s ) { Object.assign( this.state, s ); }

	tick() {
		const c = this.ctx, t = c.currentTime, dt = t - this.last; this.last = t;
		const { day, rain, wind, inside } = this.state;
		const k = inside ? 0.25 : 1; // dans un magasin : la rue est étouffée
		this.hum.g.gain.setTargetAtTime( ( 0.08 + 0.12 * day ) * k, t, 0.5 );
		this.hum.f.frequency.setTargetAtTime( inside ? 120 : 180, t, 0.5 );
		this.wind.g.gain.setTargetAtTime( ( 0.01 + 0.04 * wind ) * k * ( 0.7 + 0.3 * Math.sin( t * 0.3 ) ), t, 0.8 );
		this.wind.f.frequency.setTargetAtTime( 380 + 260 * Math.sin( t * 0.17 ), t, 1 );
		this.rain.g.gain.setTargetAtTime( 0.06 * rain * k, t, 0.6 );
		this.next.car -= dt; this.next.bird -= dt;
		if ( this.next.car <= 0 ) { this.next.car = 3 + Math.random() * ( day > 0.5 ? 6 : 14 ); if ( ! inside ) this.carPass(); }
		if ( this.next.bird <= 0 ) { this.next.bird = 1.5 + Math.random() * 6; if ( day > 0.6 && ! inside && ! rain ) this.bird(); }
	}

	// une voiture passe au loin : souffle qui monte et redescend, d'un côté à l'autre
	carPass() {
		const c = this.ctx, t = c.currentTime, dur = 3 + Math.random() * 3;
		const s = c.createBufferSource(); s.buffer = this.whiteBuf; s.loop = true;
		const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500 + Math.random() * 400;
		const g = c.createGain(); g.gain.setValueAtTime( 0, t ); g.gain.linearRampToValueAtTime( 0.05 + Math.random() * 0.05, t + dur * 0.5 ); g.gain.linearRampToValueAtTime( 0, t + dur );
		const p = c.createStereoPanner ? c.createStereoPanner() : null;
		s.connect( f ).connect( g );
		if ( p ) { const dir = Math.random() < 0.5 ? - 1 : 1; p.pan.setValueAtTime( - dir * 0.8, t ); p.pan.linearRampToValueAtTime( dir * 0.8, t + dur ); g.connect( p ).connect( this.master ); } else g.connect( this.master );
		s.start( t ); s.stop( t + dur + 0.1 );
	}

	// détonation : grondement grave qui dure + claquement, plus faible de loin
	boom( dist ) {
		if ( ! this.ctx ) return;
		const c = this.ctx, t = c.currentTime, k = Math.max( 0.08, 1 - dist / 800 );
		for ( const [ type, f, dur, vol ] of [ [ 'lowpass', 140, 3.5, 0.9 ], [ 'lowpass', 900, 0.6, 0.5 ], [ 'highpass', 2500, 0.15, 0.25 ] ] ) {
			const s = c.createBufferSource(); s.buffer = this.whiteBuf; s.loop = true;
			const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.value = f;
			const g = c.createGain(); const delay = dist / 340;
			g.gain.setValueAtTime( 0, t + delay ); g.gain.linearRampToValueAtTime( vol * k, t + delay + 0.02 ); g.gain.exponentialRampToValueAtTime( 0.0005, t + delay + dur );
			s.connect( fl ).connect( g ).connect( this.master ); s.start( t + delay ); s.stop( t + delay + dur + 0.1 );
		}
	}

	// gazouillis : quelques notes rapides qui glissent
	bird() {
		const c = this.ctx, t0 = c.currentTime, n = 2 + Math.floor( Math.random() * 5 ), base = 2500 + Math.random() * 2500;
		const p = c.createStereoPanner ? c.createStereoPanner() : null;
		if ( p ) { p.pan.value = Math.random() * 1.6 - 0.8; p.connect( this.master ); }
		for ( let i = 0; i < n; i ++ ) {
			const t = t0 + i * ( 0.08 + Math.random() * 0.08 );
			const o = c.createOscillator(); o.type = 'sine';
			o.frequency.setValueAtTime( base * ( 0.9 + Math.random() * 0.3 ), t );
			o.frequency.exponentialRampToValueAtTime( base * ( 1.2 + Math.random() * 0.5 ), t + 0.06 );
			const g = c.createGain(); g.gain.setValueAtTime( 0, t ); g.gain.linearRampToValueAtTime( 0.015, t + 0.01 ); g.gain.exponentialRampToValueAtTime( 0.0005, t + 0.09 );
			o.connect( g ).connect( p || this.master ); o.start( t ); o.stop( t + 0.1 );
		}
	}

}
