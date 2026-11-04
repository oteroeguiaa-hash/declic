// Les vrais commerces du quartier (OpenStreetMap) : nom, type et position, pour pouvoir y entrer.
import { shopKind, KIND_LABEL } from './interior.js';

const OVERPASS = 'https://overpass-api.de/api/interpreter';
const RADIUS = 350;

export class Shops {

	// geo = { here(), toLocal(lat, lon, target), Vector3 }
	constructor( geo ) {
		this.geo = geo;
		this.list = [];
		this.center = null;
		this.loading = false;
	}

	reset() { this.list = []; this.center = null; }

	maybeLoad() {
		if ( this.loading ) return;
		const h = this.geo.here();
		if ( this.center && Math.hypot( ( h.lat - this.center.lat ) * 111320, ( h.lon - this.center.lon ) * 111320 * Math.cos( h.lat * Math.PI / 180 ) ) < RADIUS / 2 ) return;
		this.load( h );
	}

	async load( c ) {
		this.loading = true;
		this.center = c;
		const d = RADIUS / 111320, e = d / Math.cos( c.lat * Math.PI / 180 );
		const bbox = [ c.lat - d, c.lon - e, c.lat + d, c.lon + e ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
		const q = `[out:json][timeout:25];(nwr["shop"](${ bbox });nwr["amenity"~"^(cafe|restaurant|fast_food|bar|pub|pharmacy|ice_cream)$"](${ bbox }););out center tags;`;
		try {
			const els = this.geo.fake ? this.geo.fake() : ( await ( await fetch( OVERPASS, { method: 'POST', body: 'data=' + encodeURIComponent( q ) } ) ).json() ).elements || [];
			const P = new this.geo.Vector3();
			this.list = [];
			for ( const el of els ) {
				const lat = el.lat ?? el.center?.lat, lon = el.lon ?? el.center?.lon;
				if ( lat == null || ! el.tags ) continue;
				if ( el.tags.shop === 'vacant' ) continue;
				this.geo.toLocal( lat, lon, P );
				const kind = shopKind( el.tags );
				this.list.push( { x: P.x, z: P.z, lat, lon, name: el.tags.name || KIND_LABEL[ kind ], named: !! el.tags.name, kind, label: KIND_LABEL[ kind ] } );
			}
		} catch { this.center = null; }
		this.loading = false;
	}

	// commerce le plus proche à moins de `max` mètres
	nearest( x, z, max = 9 ) {
		let best = null, bd = max;
		for ( const s of this.list ) { const d = Math.hypot( s.x - x, s.z - z ); if ( d < bd ) { bd = d; best = s; } }
		return best;
	}

}
