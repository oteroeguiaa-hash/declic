// Données OpenStreetMap partagées : UNE seule demande par zone d'environ 350 m, que tous les modules
// (bâtiments construits, murs, lampadaires, fenêtres, circulation, magasins) se partagent.
// Les serveurs Overpass refusent plus de 2 demandes simultanées : ici tout passe par une file,
// avec plusieurs serveurs de secours et des pauses quand un serveur est saturé.
const SERVERS = [
	'https://overpass-api.de/api/interpreter',
	'https://overpass.kumi.systems/api/interpreter',
	'https://overpass.private.coffee/api/interpreter',
];
const CELL_LAT = 0.0032, CELL_LON = 0.005; // ≈ 350 m
const HALF = 560;                          // m couverts autour du centre de la case

export const osmStatus = { onError: null };
const cache = new Map();   // case -> Promise<elements>
let queue = Promise.resolve();
let serverIdx = 0;
const wait = ( ms ) => new Promise( ( r ) => setTimeout( r, ms ) );

async function ask( q ) {
	let delay = 1500;
	for ( let attempt = 0; attempt < 6; attempt ++ ) {
		const url = SERVERS[ serverIdx % SERVERS.length ];
		try {
			const ctrl = new AbortController();
			const timer = setTimeout( () => ctrl.abort(), 45000 );
			const res = await fetch( url, { method: 'POST', body: 'data=' + encodeURIComponent( q ), signal: ctrl.signal } );
			clearTimeout( timer );
			if ( res.ok ) return ( await res.json() ).elements || [];
			// 429 trop de demandes, 504 serveur saturé : on change de serveur et on patiente
		} catch { /* réseau, délai dépassé, CORS : serveur suivant */ }
		serverIdx ++;
		await wait( delay );
		delay = Math.min( delay * 1.8, 12000 );
	}
	osmStatus.onError?.();
	throw new Error( 'OpenStreetMap indisponible' );
}

// Tout ce dont le jeu a besoin autour d'un point, en une fois.
export function osmArea( lat, lon ) {
	const i = Math.round( lat / CELL_LAT ), j = Math.round( lon / CELL_LON );
	const key = i + ',' + j;
	if ( cache.has( key ) ) return cache.get( key );
	const clat = i * CELL_LAT, clon = j * CELL_LON;
	const d = HALF / 111320, e = d / Math.cos( clat * Math.PI / 180 );
	const bb = [ clat - d, clon - e, clat + d, clon + e ].map( ( v ) => v.toFixed( 5 ) ).join( ',' );
	const q = `[out:json][timeout:60][bbox:${ bb }];(
		way["building"];
		way["barrier"~"^(wall|fence|city_wall|retaining_wall)$"];
		way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street|footway|pedestrian|path)(_link)?$"];
		way["railway"="tram"];
		node["highway"="street_lamp"];
		node["natural"="tree"];
		nw["shop"];
		nw["amenity"~"^(cafe|restaurant|fast_food|bar|pub|pharmacy|ice_cream)$"];
	);out geom;`;
	const p = ( queue = queue.catch( () => {} ).then( () => ask( q ) ) );
	cache.set( key, p );
	// en cas d'échec, on oublie la case pour réessayer plus tard (pas tout de suite)
	p.catch( () => setTimeout( () => cache.delete( key ), 20000 ) );
	if ( cache.size > 12 ) cache.delete( cache.keys().next().value );
	return p;
}
