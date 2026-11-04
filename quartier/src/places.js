// Le vrai magasin, d'après Google : photos, horaires (ouvert / fermé), note, et une palette de
// couleurs tirée des photos pour habiller l'intérieur fabriqué. Utilise la même clé Google, si
// « Maps JavaScript API » et « Places API (New) » sont activées. Sinon : on invente.
let ready = null;

function loadGoogle( key ) {
	if ( ready ) return ready;
	ready = new Promise( ( resolve, reject ) => {
		if ( window.google?.maps?.importLibrary ) return resolve();
		window.__gmapsReady = () => resolve();
		const s = document.createElement( 'script' );
		s.src = `https://maps.googleapis.com/maps/api/js?key=${ encodeURIComponent( key ) }&v=weekly&loading=async&language=fr&region=BE&callback=__gmapsReady`;
		s.async = true;
		s.onerror = () => reject( new Error( 'maps js' ) );
		document.head.append( s );
		setTimeout( () => reject( new Error( 'délai' ) ), 15000 );
	} );
	return ready;
}

const cache = new Map();

export async function lookupPlace( key, shop, date ) {
	const id = shop.name + '|' + shop.lat?.toFixed( 5 ) + '|' + shop.lon?.toFixed( 5 );
	if ( ! cache.has( id ) ) cache.set( id, fetchPlace( key, shop ) );
	const info = await cache.get( id );
	if ( ! info ) return null;
	let open = null;
	try { open = info.place.regularOpeningHours ? await info.place.isOpen( date ) : null; } catch { open = null; }
	return { ...info, open };
}

async function fetchPlace( key, shop ) {
	try {
		await loadGoogle( key );
		const { Place } = await google.maps.importLibrary( 'places' );
		const { places } = await Place.searchByText( {
			textQuery: shop.name,
			fields: [ 'displayName', 'photos', 'regularOpeningHours', 'utcOffsetMinutes', 'businessStatus', 'rating', 'userRatingCount', 'location' ],
			locationBias: { center: { lat: shop.lat, lng: shop.lon }, radius: 60 },
			maxResultCount: 1,
			language: 'fr',
		} );
		const place = places?.[ 0 ];
		if ( ! place ) return null;
		// trop loin : ce n'est pas le bon magasin
		const loc = place.location;
		if ( loc && Math.hypot( ( loc.lat() - shop.lat ) * 111320, ( loc.lng() - shop.lon ) * 70000 ) > 150 ) return null;
		const photos = ( place.photos || [] ).slice( 0, 6 ).map( ( p ) => p.getURI( { maxWidth: 900 } ) );
		const theme = await paletteFrom( photos.slice( 0, 3 ) );
		const today = place.regularOpeningHours?.weekdayDescriptions?.[ ( new Date().getDay() + 6 ) % 7 ] || '';
		return { place, photos, theme, rating: place.rating, reviews: place.userRatingCount, hours: today, closedForGood: place.businessStatus === 'CLOSED_PERMANENTLY' };
	} catch ( e ) {
		console.warn( 'Places :', e?.message || e );
		return null;
	}
}

// Couleurs dominantes des photos : mur (clair dominant), sol (moyen), lumière (chaude ou froide)
async function paletteFrom( urls ) {
	const px = [];
	for ( const u of urls ) {
		try {
			const img = new Image(); img.crossOrigin = 'anonymous'; img.src = u;
			await img.decode();
			const c = document.createElement( 'canvas' ); c.width = 48; c.height = 36;
			const g = c.getContext( '2d' ); g.drawImage( img, 0, 0, 48, 36 );
			const d = g.getImageData( 0, 0, 48, 36 ).data; // échoue si la photo n'autorise pas la lecture
			for ( let i = 0; i < d.length; i += 4 ) px.push( [ d[ i ], d[ i + 1 ], d[ i + 2 ] ] );
		} catch { /* photo non lisible : on s'en passe */ }
	}
	if ( px.length < 200 ) return null;
	const lum = ( p ) => 0.2126 * p[ 0 ] + 0.7152 * p[ 1 ] + 0.0722 * p[ 2 ];
	px.sort( ( a, b ) => lum( a ) - lum( b ) );
	const avg = ( arr ) => arr.reduce( ( s, p ) => [ s[ 0 ] + p[ 0 ], s[ 1 ] + p[ 1 ], s[ 2 ] + p[ 2 ] ], [ 0, 0, 0 ] ).map( ( v ) => Math.round( v / arr.length ) );
	const hex = ( c ) => '#' + c.map( ( v ) => Math.max( 0, Math.min( 255, v ) ).toString( 16 ).padStart( 2, '0' ) ).join( '' );
	const n = px.length;
	const wall = avg( px.slice( Math.floor( n * 0.7 ), Math.floor( n * 0.92 ) ) );   // tons clairs : murs, plafond
	const floor = avg( px.slice( Math.floor( n * 0.35 ), Math.floor( n * 0.55 ) ) ); // tons moyens : sol, mobilier
	const all = avg( px );
	const warmth = ( all[ 0 ] - all[ 2 ] ) / 255; // > 0 : ambiance chaude
	const warm = warmth > 0.08 ? 0xffcf8f : warmth < - 0.02 ? 0xf2f6ff : 0xfff3e6;
	const f2 = floor.map( ( v ) => Math.round( v * 0.93 ) );
	return { wall: hex( wall ), floor: hex( floor ), floor2: hex( f2 ), warm };
}
