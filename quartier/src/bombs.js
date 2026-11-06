// Bombes (mode drone) : la bombe tombe, explose (boule de feu, flash, onde de choc, débris, fumée,
// petits feux), laisse un cratère et des gravats. Effet de jeu, rien de plus.
import * as THREE from 'three';

function radialTex( stops ) {
	const c = document.createElement( 'canvas' ); c.width = c.height = 128;
	const g = c.getContext( '2d' ), r = g.createRadialGradient( 64, 64, 0, 64, 64, 64 );
	for ( const [ o, col ] of stops ) r.addColorStop( o, col );
	g.fillStyle = r; g.fillRect( 0, 0, 128, 128 );
	const t = new THREE.CanvasTexture( c ); t.colorSpace = THREE.SRGBColorSpace;
	return t;
}
const FIRE = radialTex( [ [ 0, 'rgba(255,255,230,1)' ], [ 0.25, 'rgba(255,200,80,1)' ], [ 0.55, 'rgba(255,90,20,0.8)' ], [ 1, 'rgba(120,20,0,0)' ] ] );
const SMOKE = radialTex( [ [ 0, 'rgba(70,66,62,0.85)' ], [ 0.6, 'rgba(60,58,55,0.45)' ], [ 1, 'rgba(50,50,50,0)' ] ] );
const SCORCH = radialTex( [ [ 0, 'rgba(10,8,6,0.95)' ], [ 0.55, 'rgba(25,20,15,0.8)' ], [ 0.8, 'rgba(40,32,24,0.35)' ], [ 1, 'rgba(40,32,24,0)' ] ] );

const bombGeo = new THREE.CapsuleGeometry( 0.25, 0.9, 6, 12 );
const bombMat = new THREE.MeshStandardMaterial( { color: 0x2f3a2c, metalness: 0.6, roughness: 0.4 } );
const debrisGeo = new THREE.BoxGeometry( 1, 1, 1 );
const debrisMats = [ 0x6b625a, 0x8a5a44, 0x55504a, 0x9b9184 ].map( ( c ) => new THREE.MeshStandardMaterial( { color: c, roughness: 0.95 } ) );

export class Bombs {

	// geo = { castFirst(origin, dir, far), groundAt(x, z) }
	constructor( scene, geo ) {
		this.scene = scene;
		this.geo = geo;
		this.group = new THREE.Group();
		scene.add( this.group );
		this.bombs = [];
		this.fx = [];      // sprites animés (feu, fumée)
		this.debris = [];
		this.flash = new THREE.PointLight( 0xffb060, 0, 160, 1.5 );
		this.group.add( this.flash );
		this.shake = 0;
		this.onImpact = null;
	}

	drop( pos, vel ) {
		const m = new THREE.Mesh( bombGeo, bombMat );
		m.position.copy( pos ).y -= 1.5;
		this.group.add( m );
		this.bombs.push( { m, v: vel.clone().multiplyScalar( 0.6 ), age: 0 } );
	}

	sprite( tex, pos, size, opts ) {
		const s = new THREE.Sprite( new THREE.SpriteMaterial( { map: tex, transparent: true, depthWrite: false, toneMapped: false, blending: opts.add ? THREE.AdditiveBlending : THREE.NormalBlending, fog: true } ) );
		s.position.copy( pos ); s.scale.setScalar( size );
		this.group.add( s );
		this.fx.push( { s, ...opts, age: 0, size } );
	}

	explode( p, radius ) {
		// flash, boule de feu, fumée qui monte, onde de choc au sol, débris, cratère
		this.flash.position.copy( p ).y += 6; this.flash.intensity = 4000;
		for ( let i = 0; i < 7; i ++ ) {
			const q = p.clone().add( new THREE.Vector3( ( Math.random() - 0.5 ) * radius * 0.6, 2 + Math.random() * radius * 0.5, ( Math.random() - 0.5 ) * radius * 0.6 ) );
			this.sprite( FIRE, q, radius * 0.6, { add: true, life: 0.9 + Math.random() * 0.6, grow: radius * 1.4, rise: 4 } );
		}
		for ( let i = 0; i < 18; i ++ ) {
			const q = p.clone().add( new THREE.Vector3( ( Math.random() - 0.5 ) * radius, 1 + Math.random() * 6, ( Math.random() - 0.5 ) * radius ) );
			this.sprite( SMOKE, q, radius * 0.5, { life: 6 + Math.random() * 6, grow: radius * 2.2, rise: 3 + Math.random() * 4, delay: 0.15 + Math.random() * 0.5 } );
		}
		// petits feux qui couvent dans les gravats
		for ( let i = 0; i < 6; i ++ ) {
			const q = p.clone().add( new THREE.Vector3( ( Math.random() - 0.5 ) * radius * 1.2, 0.8, ( Math.random() - 0.5 ) * radius * 1.2 ) );
			this.sprite( FIRE, q, 2.5, { add: true, life: 25 + Math.random() * 15, flicker: true, delay: 0.8 } );
		}
		const ring = new THREE.Mesh( new THREE.RingGeometry( 0.8, 1, 48 ).rotateX( - Math.PI / 2 ), new THREE.MeshBasicMaterial( { color: 0xfff1d0, transparent: true, opacity: 0.7, depthWrite: false, toneMapped: false } ) );
		ring.position.copy( p ).y += 0.4; this.group.add( ring );
		this.fx.push( { ring, age: 0, life: 0.8, radius } );
		const crater = new THREE.Mesh( new THREE.CircleGeometry( radius * 1.1, 40 ).rotateX( - Math.PI / 2 ), new THREE.MeshBasicMaterial( { map: SCORCH, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: - 4 } ) );
		crater.position.copy( p ).y += 0.08; crater.renderOrder = 2; this.group.add( crater );
		for ( let i = 0; i < 40; i ++ ) {
			const d = new THREE.Mesh( debrisGeo, debrisMats[ i % debrisMats.length ] );
			const s = 0.2 + Math.random() * 0.9; d.scale.set( s, s * ( 0.4 + Math.random() ), s );
			d.position.copy( p ).y += 1;
			const a = Math.random() * Math.PI * 2, up = 8 + Math.random() * 18, out = 6 + Math.random() * 16;
			this.group.add( d );
			this.debris.push( { d, v: new THREE.Vector3( Math.cos( a ) * out, up, Math.sin( a ) * out ), spin: new THREE.Vector3( Math.random() * 6, Math.random() * 6, Math.random() * 6 ), ground: p.y, rest: false } );
		}
		this.onImpact?.( p, radius );
	}

	// tas de gravats à l'endroit d'un bâtiment détruit
	rubble( x, y, z, r ) {
		const g = new THREE.Group();
		const mound = new THREE.Mesh( new THREE.IcosahedronGeometry( r, 2 ), debrisMats[ 0 ] );
		const pos = mound.geometry.attributes.position;
		for ( let i = 0; i < pos.count; i ++ ) pos.setY( i, Math.max( 0, pos.getY( i ) * 0.35 + ( Math.random() - 0.5 ) * 0.6 ) );
		mound.geometry.computeVertexNormals();
		g.add( mound );
		for ( let i = 0; i < 25; i ++ ) {
			const b = new THREE.Mesh( debrisGeo, debrisMats[ i % debrisMats.length ] );
			const s = 0.4 + Math.random() * 1.4; b.scale.set( s, s * 0.5, s * ( 0.5 + Math.random() ) );
			const a = Math.random() * Math.PI * 2, d = Math.random() * r;
			b.position.set( Math.cos( a ) * d, Math.random() * r * 0.3, Math.sin( a ) * d );
			b.rotation.set( Math.random(), Math.random() * 3, Math.random() );
			g.add( b );
		}
		g.position.set( x, y, z );
		this.group.add( g );
	}

	update( dt ) {
		const tmp = new THREE.Vector3();
		for ( let i = this.bombs.length - 1; i >= 0; i -- ) {
			const b = this.bombs[ i ];
			b.v.y -= 22 * dt; b.age += dt;
			const step = b.v.clone().multiplyScalar( dt ), len = step.length();
			const hit = len > 0 ? this.geo.castFirst( b.m.position, tmp.copy( step ).divideScalar( len ), len + 0.5 ) : null;
			const g = this.geo.groundAt( b.m.position.x, b.m.position.z );
			if ( hit || ( g !== null && b.m.position.y + step.y <= g ) || b.age > 25 ) {
				const p = hit ? hit.point.clone() : b.m.position.clone().setY( g ?? b.m.position.y );
				this.group.remove( b.m ); this.bombs.splice( i, 1 );
				if ( g !== null ) p.y = Math.min( p.y, g + 0.2 );
				this.explode( p, 18 );
				continue;
			}
			b.m.position.add( step );
			b.m.lookAt( tmp.copy( b.m.position ).add( b.v ) ); b.m.rotateX( Math.PI / 2 );
		}
		this.flash.intensity *= Math.exp( - dt * 9 );
		for ( let i = this.fx.length - 1; i >= 0; i -- ) {
			const f = this.fx[ i ];
			f.age += dt;
			if ( f.delay && f.age < f.delay ) { if ( f.s ) f.s.material.opacity = 0; continue; }
			const t = ( f.age - ( f.delay || 0 ) ) / f.life;
			if ( t >= 1 ) { const o = f.s || f.ring; this.group.remove( o ); o.material.dispose(); this.fx.splice( i, 1 ); continue; }
			if ( f.ring ) { const r = 1 + t * f.radius * 3; f.ring.scale.set( r, 1, r ); f.ring.material.opacity = 0.7 * ( 1 - t ); continue; }
			if ( f.grow ) f.s.scale.setScalar( f.size + f.grow * Math.sqrt( t ) );
			if ( f.rise ) f.s.position.y += f.rise * dt;
			f.s.material.opacity = f.flicker ? ( 0.6 + 0.4 * Math.sin( f.age * 23 + i ) ) * Math.min( 1, ( 1 - t ) * 4 ) : ( 1 - t ) * ( f.add ? 1 : 0.85 );
			if ( f.flicker ) f.s.scale.setScalar( 2.2 + 0.6 * Math.sin( f.age * 17 + i * 3 ) );
		}
		for ( let i = this.debris.length - 1; i >= 0; i -- ) {
			const d = this.debris[ i ];
			if ( d.rest ) continue;
			d.v.y -= 22 * dt;
			d.d.position.addScaledVector( d.v, dt );
			d.d.rotation.x += d.spin.x * dt; d.d.rotation.y += d.spin.y * dt; d.d.rotation.z += d.spin.z * dt;
			if ( d.d.position.y <= d.ground ) { d.d.position.y = d.ground + 0.1; d.rest = true; }
		}
		// on ne garde pas des centaines de débris : les plus anciens disparaissent
		while ( this.debris.length > 200 ) { const d = this.debris.shift(); this.group.remove( d.d ); }
		this.shake *= Math.exp( - dt * 4 );
	}

	reset() {
		this.group.clear(); this.group.add( this.flash );
		this.bombs = []; this.fx = []; this.debris = [];
	}

}
