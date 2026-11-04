// Bruits de pas synthétisés (aucun fichier son) : un petit choc filtré à chaque pas,
// légèrement différent à chaque fois, au rythme de la marche.
export class Footsteps {

	constructor() {
		this.ctx = null;
		this.dist = 0;
		this.left = false;
		this.muted = false;
		const unlock = () => {
			if ( this.ctx ) return;
			try {
				this.ctx = new ( window.AudioContext || window.webkitAudioContext )();
				// bruit blanc réutilisé pour tous les pas
				const len = Math.floor( this.ctx.sampleRate * 0.25 );
				this.noise = this.ctx.createBuffer( 1, len, this.ctx.sampleRate );
				const d = this.noise.getChannelData( 0 );
				for ( let i = 0; i < len; i ++ ) d[ i ] = Math.random() * 2 - 1;
			} catch { /* pas de son */ }
		};
		addEventListener( 'pointerdown', unlock, { once: false } );
		addEventListener( 'keydown', unlock, { once: false } );
	}

	// speed : vitesse de marche (m/s)
	update( dt, speed ) {
		if ( ! this.ctx || this.muted || speed < 0.3 ) { this.dist = Math.min( this.dist, 0.4 ); return; }
		this.dist += speed * dt;
		const stride = 0.72 + Math.min( speed, 4 ) * 0.08; // pas plus longs en courant
		if ( this.dist >= stride ) {
			this.dist -= stride;
			this.left = ! this.left;
			this.play( Math.min( 1, 0.35 + speed / 6 ) );
		}
	}

	play( strength ) {
		const c = this.ctx, t = c.currentTime;
		const src = c.createBufferSource();
		src.buffer = this.noise;
		src.playbackRate.value = 0.8 + Math.random() * 0.3;
		const lp = c.createBiquadFilter();
		lp.type = 'lowpass';
		lp.frequency.value = 900 + Math.random() * 500;
		const bp = c.createBiquadFilter();
		bp.type = 'peaking'; bp.frequency.value = 180; bp.gain.value = 8; // le « talon »
		const g = c.createGain();
		const v = 0.18 * strength * ( this.left ? 1 : 0.85 );
		g.gain.setValueAtTime( 0, t );
		g.gain.linearRampToValueAtTime( v, t + 0.008 );
		g.gain.exponentialRampToValueAtTime( 0.001, t + 0.16 );
		const pan = c.createStereoPanner ? c.createStereoPanner() : null;
		if ( pan ) pan.pan.value = this.left ? - 0.15 : 0.15;
		src.connect( lp ).connect( bp ).connect( g );
		( pan ? g.connect( pan ) : g ).connect( c.destination );
		src.start( t, Math.random() * 0.05, 0.2 );
	}

}
