// Carte GPS : la vraie carte Google (plan ou satellite, via la même clé « Map Tiles API »),
// avec repli sur OpenStreetMap. Mini-carte dans un coin, grande carte plein écran (touche M) :
// zoom, déplacement, et un clic / une tape = téléportation à cet endroit.
import L from 'leaflet';

const OSM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

async function googleSession( key, body ) {
	const res = await fetch( 'https://tile.googleapis.com/v1/createSession?key=' + encodeURIComponent( key ), {
		method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( body ),
	} );
	if ( ! res.ok ) throw new Error( 'session ' + res.status );
	return ( await res.json() ).session;
}

// type : 'roadmap' ou 'satellite' ; traffic : trafic routier en temps réel de Google par-dessus
async function makeLayer( key, type, traffic ) {
	const base = { mapType: type, language: 'fr-BE', region: 'BE' };
	const tries = [];
	const layers = [ ...( type === 'satellite' ? [ 'layerRoadmap' ] : [] ), ...( traffic ? [ 'layerTraffic' ] : [] ) ];
	if ( layers.length ) tries.push( { ...base, layerTypes: layers, ...( type === 'satellite' ? { overlay: false } : {} ) } );
	tries.push( base );
	if ( key ) {
		for ( const body of tries ) {
			try {
				const session = await googleSession( key, body );
				const layer = L.tileLayer( `https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session=${ session }&key=${ encodeURIComponent( key ) }`, {
					maxZoom: 22, maxNativeZoom: type === 'satellite' ? 21 : 22, tileSize: 256,
					attribution: type === 'satellite' ? 'Images © Google' : 'Carte © Google',
				} );
				layer.hasTraffic = !! body.layerTypes?.includes( 'layerTraffic' );
				return layer;
			} catch { /* on essaie plus simple */ }
		}
	}
	return L.tileLayer( OSM, { maxZoom: 20, maxNativeZoom: 19, attribution: '© OpenStreetMap' } );
}

function playerIcon() {
	return L.divIcon( {
		className: 'me-icon',
		html: '<div class="me-dot"><div class="me-cone"></div></div>',
		iconSize: [ 22, 22 ], iconAnchor: [ 11, 11 ],
	} );
}

export class GpsMap {

	constructor( { key, onTeleport, onOpen, onClose } ) {
		this.key = key;
		this.onTeleport = onTeleport;
		this.onOpen = onOpen;
		this.onClose = onClose;
		this.type = 'roadmap';
		this.traffic = false;
		this.layers = {};
		this.pos = null;
		this.heading = 0;

		// mini-carte « boussole sombre » : la carte tourne avec le regard, la flèche reste vers le haut
		// (non interactive : une tape ouvre la grande carte)
		this.mini = L.map( 'minimap-inner', {
			zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false,
			doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false, tap: false,
			fadeAnimation: false, zoomAnimation: false,
		} ).setView( [ 50.84, 4.41 ], 17 );
		this.miniInner = document.getElementById( 'minimap-inner' );
		this.miniNorth = document.getElementById( 'mm-north' );
		this.miniEl = document.getElementById( 'minimap' );
		document.getElementById( 'minimap' ).addEventListener( 'pointerdown', ( e ) => { e.preventDefault(); e.stopPropagation(); this.open(); } );

		// grande carte
		this.big = L.map( 'bigmap', { zoomControl: true, attributionControl: true } ).setView( [ 50.84, 4.41 ], 16 );
		this.big.attributionControl.setPrefix( '' );
		this.bigMe = L.marker( [ 50.84, 4.41 ], { icon: playerIcon(), interactive: false, zIndexOffset: 1000 } ).addTo( this.big );
		this.big.on( 'click', ( e ) => {
			// le « clic » du doigt qui vient d'ouvrir la carte ne doit pas téléporter
			if ( performance.now() - this.openedAt < 600 ) return;
			this.close();
			this.onTeleport( e.latlng.lat, e.latlng.lng );
		} );

		document.getElementById( 'map-close' ).onclick = () => this.close();
		document.getElementById( 'map-me' ).onclick = () => this.pos && this.big.setView( this.pos, Math.max( this.big.getZoom(), 17 ) );
		document.getElementById( 'map-type' ).onclick = () => this.setType( this.type === 'roadmap' ? 'satellite' : 'roadmap' );
		document.getElementById( 'map-traffic' ).onclick = () => { this.traffic = ! this.traffic; this.setType( this.type ); };
		this.setType( 'roadmap' );
	}

	async setType( type ) {
		this.type = type;
		const id = type + ( this.traffic ? '+traffic' : '' );
		document.getElementById( 'map-type' ).textContent = type === 'roadmap' ? '🛰️ Satellite' : '🗺️ Plan';
		document.getElementById( 'map-traffic' ).classList.toggle( 'on', this.traffic );
		if ( ! this.layers[ id ] ) {
			// une couche pour chaque carte (Leaflet n'aime pas partager une couche entre deux cartes)
			const [ a, b ] = await Promise.all( [ makeLayer( this.key, type, this.traffic ), makeLayer( this.key, type, this.traffic ) ] );
			this.layers[ id ] = { mini: a, big: b };
			if ( this.traffic && ! b.hasTraffic ) document.getElementById( 'map-msg' ).textContent = 'Trafic indisponible avec cette clé.';
			else document.getElementById( 'map-msg' ).textContent = '';
		}
		for ( const t of Object.keys( this.layers ) ) {
			const l = this.layers[ t ];
			if ( t === id ) { l.mini.addTo( this.mini ); l.big.addTo( this.big ); } else { l.mini.remove(); l.big.remove(); }
		}
	}

	// position du joueur (degrés) et cap (radians, 0 = nord, sens horaire)
	update( lat, lon, heading ) {
		this.pos = [ lat, lon ];
		this.heading = heading;
		if ( ! this.sized ) { this.mini.invalidateSize(); this.sized = true; }
		this.mini.setView( this.pos, this.mini.getZoom(), { animate: false } );
		this.bigMe.setLatLng( this.pos );
		const deg = heading * 180 / Math.PI;
		this.miniInner.style.transform = `rotate(${ ( - deg ).toFixed( 1 ) }deg)`;
		// le N rouge fait le tour du cadran
		const r = this.miniEl.offsetWidth / 2 - 8, a = - heading;
		this.miniNorth.style.transform = `translate(${ ( Math.sin( a ) * r ).toFixed( 1 ) }px, ${ ( - Math.cos( a ) * r ).toFixed( 1 ) }px)`;
		const el = this.bigMe.getElement()?.querySelector( '.me-cone' );
		if ( el ) el.style.transform = `rotate(${ deg.toFixed( 0 ) }deg)`;
	}


	// zoom de la mini-carte selon la vitesse (on voit plus loin quand on va vite)
	setMiniZoom( z ) { if ( this.mini.getZoom() !== z ) this.mini.setZoom( z, { animate: false } ); }

	get isOpen() { return ! document.getElementById( 'mapview' ).hidden; }

	open() {
		this.openedAt = performance.now();
		document.getElementById( 'mapview' ).hidden = false;
		this.big.invalidateSize();
		if ( this.pos ) this.big.setView( this.pos, Math.max( this.big.getZoom(), 16 ), { animate: false } );
		this.onOpen?.();
	}

	close() {
		document.getElementById( 'mapview' ).hidden = true;
		this.onClose?.();
	}

	toggle() { if ( this.isOpen ) this.close(); else this.open(); }

}

