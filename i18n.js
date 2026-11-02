/* Déclic : traductions (français → anglais, espagnol, allemand, italien).
   La page est écrite en français. Ce script traduit les textes affichés, y compris ceux ajoutés
   plus tard par le site (messages, profil…). Le français reste la langue interne : les valeurs
   envoyées au serveur (catégories, états) ne sont jamais traduites, seul leur affichage l’est.
   Pour ajouter une phrase : une ligne [français, anglais, espagnol, allemand, italien]. */
(function () {
  var LANGS = { fr: "Français", en: "English", es: "Español", de: "Deutsch", it: "Italiano" };
  var LOCS = { fr: "fr-FR", en: "en-GB", es: "es-ES", de: "de-DE", it: "it-IT" };
  var IDX = { en: 1, es: 2, de: 3, it: 4 };

  var lang = null;
  try { lang = localStorage.getItem("declic_lang"); } catch (e) {}
  if (!LANGS[lang]) {
    var nav = ((navigator.languages && navigator.languages[0]) || navigator.language || "fr").slice(0, 2).toLowerCase();
    lang = LANGS[nav] ? nav : "fr";
  }

  var R = [
    // ── Navigation, en-tête
    ["Fonctionnement", "How it works", "Cómo funciona", "So funktioniert’s", "Come funziona"],
    ["Studio", "Studio", "Estudio", "Studio", "Studio"],
    ["Tarifs", "Pricing", "Precios", "Preise", "Prezzi"],
    ["Avis", "Reviews", "Opiniones", "Bewertungen", "Recensioni"],
    ["FAQ", "FAQ", "Preguntas", "FAQ", "FAQ"],
    ["Se connecter", "Log in", "Iniciar sesión", "Anmelden", "Accedi"],
    ["Mon profil", "My profile", "Mi perfil", "Mein Profil", "Il mio profilo"],
    ["Mes annonces", "My listings", "Mis anuncios", "Meine Anzeigen", "I miei annunci"],
    ["Changer d’offre", "Change plan", "Cambiar de plan", "Tarif ändern", "Cambia piano"],
    ["Principal", "Main", "Principal", "Hauptmenü", "Principale"],
    ["Menu", "Menu", "Menú", "Menü", "Menu"],
    ["Mon compte", "My account", "Mi cuenta", "Mein Konto", "Il mio account"],
    ["Déclic — Une photo, l’annonce est prête", "Déclic — One photo, your listing is ready", "Déclic — Una foto y tu anuncio está listo", "Déclic — Ein Foto, die Anzeige ist fertig", "Déclic — Una foto, l’annuncio è pronto"],

    // ── Accueil
    ["L’objet est reconnu, son prix estimé et l’annonce rédigée. Il ne reste qu’à publier.", "The item is recognised, its price estimated and the listing written. All that’s left is to post it.", "Se reconoce el objeto, se estima su precio y se redacta el anuncio. Solo te queda publicarlo.", "Der Artikel wird erkannt, der Preis geschätzt und die Anzeige geschrieben. Du musst sie nur noch veröffentlichen.", "L’oggetto viene riconosciuto, il prezzo stimato e l’annuncio scritto. Non resta che pubblicarlo."],
    ["Créer une annonce", "Create a listing", "Crear un anuncio", "Anzeige erstellen", "Crea un annuncio"],
    ["Voir les offres", "See plans", "Ver planes", "Tarife ansehen", "Vedi i piani"],
    ["Aperçu", "Overview", "Resumen", "Übersicht", "Panoramica"],
    ["De la photo à l’annonce en trois étapes.", "From photo to listing in three steps.", "De la foto al anuncio en tres pasos.", "Vom Foto zur Anzeige in drei Schritten.", "Dalla foto all’annuncio in tre passaggi."],
    ["Photographie", "Take a photo", "Haz una foto", "Fotografiere", "Fotografa"],
    ["Ajoute une ou plusieurs photos de ton objet et choisis sa catégorie.", "Add one or more photos of your item and pick its category.", "Añade una o varias fotos de tu objeto y elige su categoría.", "Füge ein oder mehrere Fotos deines Artikels hinzu und wähle die Kategorie.", "Aggiungi una o più foto del tuo oggetto e scegli la categoria."],
    ["Analyse", "Analysis", "Análisis", "Analyse", "Analisi"],
    ["L’objet est identifié, son prix d’occasion estimé, et l’annonce rédigée pour Vinted et eBay.", "The item is identified, its second-hand price estimated, and the listing written for Vinted and eBay.", "Se identifica el objeto, se estima su precio de segunda mano y se redacta el anuncio para Vinted y eBay.", "Der Artikel wird erkannt, sein Gebrauchtpreis geschätzt und die Anzeige für Vinted und eBay geschrieben.", "L’oggetto viene identificato, il prezzo dell’usato stimato e l’annuncio scritto per Vinted ed eBay."],
    ["Publie", "Post", "Publica", "Veröffentliche", "Pubblica"],
    ["Tu relis, tu ajustes, puis tu ouvres directement l’application de la plateforme.", "Read it over, tweak it, then open the platform’s app directly.", "Lo revisas, lo ajustas y abres directamente la app de la plataforma.", "Du liest gegen, passt an und öffnest direkt die App der Plattform.", "Rileggi, sistemi e apri direttamente l’app della piattaforma."],
    ["Tout ce qu’il faut pour bien vendre.", "Everything you need to sell well.", "Todo lo que necesitas para vender bien.", "Alles, was du zum guten Verkaufen brauchst.", "Tutto ciò che serve per vendere bene."],
    ["Titre et description détaillée", "Title and detailed description", "Título y descripción detallada", "Titel und ausführliche Beschreibung", "Titolo e descrizione dettagliata"],
    ["Un ton direct et chaleureux pour Vinted, une fiche complète pour eBay. Tout reste modifiable avant de copier.", "A direct, friendly tone for Vinted, a complete product sheet for eBay. Everything can be edited before copying.", "Un tono directo y cercano para Vinted, una ficha completa para eBay. Todo se puede editar antes de copiar.", "Ein direkter, freundlicher Ton für Vinted, ein vollständiges Datenblatt für eBay. Vor dem Kopieren bleibt alles bearbeitbar.", "Un tono diretto e cordiale per Vinted, una scheda completa per eBay. Tutto resta modificabile prima di copiare."],
    ["Prix estimé", "Estimated price", "Precio estimado", "Geschätzter Preis", "Prezzo stimato"],
    ["Le nom de l’objet et une fourchette de prix d’occasion.", "The item’s name and a second-hand price range.", "El nombre del objeto y un rango de precio de segunda mano.", "Der Name des Artikels und eine Gebrauchtpreis-Spanne.", "Il nome dell’oggetto e una fascia di prezzo dell’usato."],
    ["Mots-clés", "Keywords", "Palabras clave", "Suchbegriffe", "Parole chiave"],
    ["Les termes que les acheteurs tapent vraiment.", "The words buyers actually search for.", "Los términos que los compradores buscan de verdad.", "Die Begriffe, nach denen Käufer wirklich suchen.", "I termini che gli acquirenti cercano davvero."],
    ["Catégories précises", "Precise categories", "Categorías precisas", "Genaue Kategorien", "Categorie precise"],
    ["Vêtements, chaussures, électronique, mobilier : chaque catégorie demande les bonnes informations, comme la taille, la pointure, la capacité ou les dimensions.", "Clothes, shoes, electronics, furniture: each category asks for the right details, like size, shoe size, capacity or dimensions.", "Ropa, calzado, electrónica, muebles: cada categoría pide los datos adecuados, como la talla, el número, la capacidad o las medidas.", "Kleidung, Schuhe, Elektronik, Möbel: Jede Kategorie fragt die passenden Angaben ab, etwa Größe, Schuhgröße, Speicher oder Maße.", "Abbigliamento, scarpe, elettronica, mobili: ogni categoria chiede i dati giusti, come taglia, numero, capacità o dimensioni."],
    ["Jusqu’à 8 photos par objet", "Up to 8 photos per item", "Hasta 8 fotos por objeto", "Bis zu 8 Fotos pro Artikel", "Fino a 8 foto per oggetto"],
    ["Plus il y a d’angles, plus l’état et les détails sont bien décrits.", "The more angles, the better the condition and details are described.", "Cuantos más ángulos, mejor se describen el estado y los detalles.", "Je mehr Blickwinkel, desto besser werden Zustand und Details beschrieben.", "Più angolazioni ci sono, meglio vengono descritti stato e dettagli."],
    ["Publication directe", "Direct posting", "Publicación directa", "Direkt veröffentlichen", "Pubblicazione diretta"],
    ["Un lien ouvre l’application Vinted ou eBay, prête à recevoir ton annonce.", "A link opens the Vinted or eBay app, ready for your listing.", "Un enlace abre la app de Vinted o eBay, lista para tu anuncio.", "Ein Link öffnet die Vinted- oder eBay-App, bereit für deine Anzeige.", "Un link apre l’app Vinted o eBay, pronta per il tuo annuncio."],

    // ── Studio
    ["Crée ton annonce.", "Create your listing.", "Crea tu anuncio.", "Erstelle deine Anzeige.", "Crea il tuo annuncio."],
    ["Touche ici pour ajouter des photos", "Tap here to add photos", "Toca aquí para añadir fotos", "Tippe hier, um Fotos hinzuzufügen", "Tocca qui per aggiungere foto"],
    ["Ajouter des photos", "Add photos", "Añadir fotos", "Fotos hinzufügen", "Aggiungi foto"],
    ["Ajouter une photo", "Add a photo", "Añadir una foto", "Foto hinzufügen", "Aggiungi una foto"],
    ["Retirer la photo", "Remove photo", "Quitar la foto", "Foto entfernen", "Rimuovi la foto"],
    ["Catégorie", "Category", "Categoría", "Kategorie", "Categoria"],
    ["Catégories", "Categories", "Categorías", "Kategorien", "Categorie"],
    ["État", "Condition", "Estado", "Zustand", "Condizioni"],
    ["Précisions (facultatif)", "Extra details (optional)", "Detalles (opcional)", "Zusätzliche Angaben (optional)", "Dettagli (facoltativo)"],
    ["Ex. : acheté en 2023, jamais réparé", "E.g. bought in 2023, never repaired", "Ej.: comprado en 2023, nunca reparado", "Z. B.: 2023 gekauft, nie repariert", "Es.: comprato nel 2023, mai riparato"],
    ["Analyser et créer l’annonce", "Analyse and create the listing", "Analizar y crear el anuncio", "Analysieren und Anzeige erstellen", "Analizza e crea l’annuncio"],
    ["Analyse en cours…", "Analysing…", "Analizando…", "Analyse läuft…", "Analisi in corso…"],
    ["Ouvrir l’application", "Open the app", "Abrir la app", "App öffnen", "Apri l’app"],
    ["Objet identifié", "Item identified", "Objeto identificado", "Artikel erkannt", "Oggetto identificato"],
    ["Objet", "Item", "Objeto", "Artikel", "Oggetto"],
    ["Prix d’occasion estimé", "Estimated second-hand price", "Precio de segunda mano estimado", "Geschätzter Gebrauchtpreis", "Prezzo dell’usato stimato"],
    ["Avec l’offre Pro ou Ultra", "With the Pro or Ultra plan", "Con el plan Pro o Ultra", "Mit dem Pro- oder Ultra-Tarif", "Con il piano Pro o Ultra"],
    ["Le lien s’ouvre directement dans l’application si elle est installée sur ton téléphone, sinon sur le site.", "The link opens straight in the app if it’s installed on your phone, otherwise on the website.", "El enlace se abre directamente en la app si está instalada en tu móvil; si no, en la web.", "Der Link öffnet sich direkt in der App, wenn sie installiert ist, sonst auf der Website.", "Il link si apre direttamente nell’app se è installata sul telefono, altrimenti sul sito."],
    ["Titre", "Title", "Título", "Titel", "Titolo"],
    ["Description", "Description", "Descripción", "Beschreibung", "Descrizione"],
    ["Marque", "Brand", "Marca", "Marke", "Marca"],
    ["Couleur", "Colour", "Color", "Farbe", "Colore"],
    ["Prix de vente (€)", "Selling price (€)", "Precio de venta (€)", "Verkaufspreis (€)", "Prezzo di vendita (€)"],
    ["Prix de vente", "Selling price", "Precio de venta", "Verkaufspreis", "Prezzo di vendita"],
    ["Mots-clés : offre Pro ou Ultra.", "Keywords: Pro or Ultra plan.", "Palabras clave: plan Pro o Ultra.", "Suchbegriffe: Pro- oder Ultra-Tarif.", "Parole chiave: piano Pro o Ultra."],
    ["Copier l’annonce", "Copy the listing", "Copiar el anuncio", "Anzeige kopieren", "Copia l’annuncio"],
    ["Colle ensuite les champs dans le formulaire de vente et ajoute tes photos.", "Then paste the fields into the selling form and add your photos.", "Después pega los campos en el formulario de venta y añade tus fotos.", "Füge die Felder dann ins Verkaufsformular ein und lade deine Fotos hoch.", "Poi incolla i campi nel modulo di vendita e aggiungi le foto."],

    // ── Catégories, champs, états
    ["Vêtements", "Clothing", "Ropa", "Kleidung", "Abbigliamento"],
    ["Chaussures", "Shoes", "Calzado", "Schuhe", "Scarpe"],
    ["Électronique", "Electronics", "Electrónica", "Elektronik", "Elettronica"],
    ["Mobilier", "Furniture", "Muebles", "Möbel", "Mobili"],
    ["Maison & déco", "Home & decor", "Hogar y decoración", "Haus & Deko", "Casa e arredo"],
    ["Sport & loisirs", "Sport & leisure", "Deporte y ocio", "Sport & Freizeit", "Sport e tempo libero"],
    ["Jeux & jouets", "Games & toys", "Juegos y juguetes", "Spiele & Spielzeug", "Giochi e giocattoli"],
    ["Livres & médias", "Books & media", "Libros y multimedia", "Bücher & Medien", "Libri e media"],
    ["Autre", "Other", "Otro", "Sonstiges", "Altro"],
    ["Taille", "Size", "Talla", "Größe", "Taglia"],
    ["Pour", "For", "Para", "Für", "Per"],
    ["Femme", "Women", "Mujer", "Damen", "Donna"],
    ["Homme", "Men", "Hombre", "Herren", "Uomo"],
    ["Enfant", "Kids", "Niños", "Kinder", "Bambini"],
    ["Pointure", "Shoe size", "Número", "Schuhgröße", "Numero"],
    ["Modèle", "Model", "Modelo", "Modell", "Modello"],
    ["Ex. : iPhone 13", "E.g. iPhone 13", "Ej.: iPhone 13", "Z. B.: iPhone 13", "Es.: iPhone 13"],
    ["Capacité / stockage", "Capacity / storage", "Capacidad / almacenamiento", "Kapazität / Speicher", "Capacità / memoria"],
    ["Ex. : 128 Go", "E.g. 128 GB", "Ej.: 128 GB", "Z. B.: 128 GB", "Es.: 128 GB"],
    ["Fonctionnement", "How it works", "Cómo funciona", "So funktioniert’s", "Come funziona"],
    ["Fonctionne parfaitement", "Works perfectly", "Funciona perfectamente", "Funktioniert einwandfrei", "Funziona perfettamente"],
    ["Défauts mineurs", "Minor faults", "Defectos menores", "Kleine Mängel", "Difetti minori"],
    ["Pour pièces", "For parts", "Para piezas", "Für Ersatzteile", "Per ricambi"],
    ["Accessoires inclus", "Accessories included", "Accesorios incluidos", "Zubehör inklusive", "Accessori inclusi"],
    ["Chargeur, boîte, câble…", "Charger, box, cable…", "Cargador, caja, cable…", "Ladegerät, Karton, Kabel…", "Caricatore, scatola, cavo…"],
    ["Dimensions (cm)", "Dimensions (cm)", "Medidas (cm)", "Maße (cm)", "Dimensioni (cm)"],
    ["Longueur × largeur × hauteur", "Length × width × height", "Largo × ancho × alto", "Länge × Breite × Höhe", "Lunghezza × larghezza × altezza"],
    ["Matière", "Material", "Material", "Material", "Materiale"],
    ["Bois, métal, tissu…", "Wood, metal, fabric…", "Madera, metal, tela…", "Holz, Metall, Stoff…", "Legno, metallo, tessuto…"],
    ["Verre, céramique, textile…", "Glass, ceramic, textile…", "Vidrio, cerámica, textil…", "Glas, Keramik, Textil…", "Vetro, ceramica, tessuto…"],
    ["Modèle / discipline", "Model / sport", "Modelo / disciplina", "Modell / Sportart", "Modello / disciplina"],
    ["Ex. : vélo de route, raquette", "E.g. road bike, racket", "Ej.: bici de carretera, raqueta", "Z. B.: Rennrad, Schläger", "Es.: bici da corsa, racchetta"],
    ["Taille ou dimensions", "Size or dimensions", "Talla o medidas", "Größe oder Maße", "Taglia o dimensioni"],
    ["Âge conseillé", "Recommended age", "Edad recomendada", "Empfohlenes Alter", "Età consigliata"],
    ["Ex. : 6 ans et +", "E.g. 6+ years", "Ej.: a partir de 6 años", "Z. B.: ab 6 Jahren", "Es.: dai 6 anni"],
    ["Contenu", "Contents", "Contenido", "Inhalt", "Contenuto"],
    ["Complet", "Complete", "Completo", "Vollständig", "Completo"],
    ["Incomplet", "Incomplete", "Incompleto", "Unvollständig", "Incompleto"],
    ["Titre / auteur", "Title / author", "Título / autor", "Titel / Autor", "Titolo / autore"],
    ["Format", "Format", "Formato", "Format", "Formato"],
    ["Poche", "Paperback (pocket)", "Bolsillo", "Taschenbuch", "Tascabile"],
    ["Broché", "Paperback", "Tapa blanda", "Broschiert", "Brossura"],
    ["Relié", "Hardcover", "Tapa dura", "Gebunden", "Rilegato"],
    ["Neuf avec étiquette", "New with tags", "Nuevo con etiquetas", "Neu mit Etikett", "Nuovo con cartellino"],
    ["Neuf sans étiquette", "New without tags", "Nuevo sin etiquetas", "Neu ohne Etikett", "Nuovo senza cartellino"],
    ["Très bon état", "Very good", "Muy bueno", "Sehr gut", "Ottime condizioni"],
    ["Bon état", "Good", "Bueno", "Gut", "Buone condizioni"],
    ["Satisfaisant", "Satisfactory", "Aceptable", "Zufriedenstellend", "Discrete condizioni"],
    ["Abîmé", "Damaged", "Dañado", "Beschädigt", "Danneggiato"],

    // ── Tarifs
    ["Des offres simples.", "Simple plans.", "Planes sencillos.", "Einfache Tarife.", "Piani semplici."],
    ["Sans engagement. Tu changes d’offre quand tu veux.", "No commitment. Change plans whenever you like.", "Sin permanencia. Cambia de plan cuando quieras.", "Keine Bindung. Wechsle den Tarif, wann du willst.", "Senza vincoli. Cambia piano quando vuoi."],
    ["Gratuit", "Free", "Gratis", "Kostenlos", "Gratis"],
    ["/mois", "/month", "/mes", "/Monat", "/mese"],
    ["Pour tester et vendre de temps en temps.", "To try it out and sell now and then.", "Para probar y vender de vez en cuando.", "Zum Ausprobieren und gelegentlichen Verkaufen.", "Per provare e vendere ogni tanto."],
    ["5 annonces par mois", "5 listings per month", "5 anuncios al mes", "5 Anzeigen pro Monat", "5 annunci al mese"],
    ["60 annonces par mois", "60 listings per month", "60 anuncios al mes", "60 Anzeigen pro Monat", "60 annunci al mese"],
    ["2 photos par objet", "2 photos per item", "2 fotos por objeto", "2 Fotos pro Artikel", "2 foto per oggetto"],
    ["4 photos par objet", "4 photos per item", "4 fotos por objeto", "4 Fotos pro Artikel", "4 foto per oggetto"],
    ["8 photos par objet", "8 photos per item", "8 fotos por objeto", "8 Fotos pro Artikel", "8 foto per oggetto"],
    ["Nom de l’objet et estimation du prix", "Item name and price estimate", "Nombre del objeto y precio estimado", "Artikelname und Preisschätzung", "Nome dell’oggetto e stima del prezzo"],
    ["Titre et description", "Title and description", "Título y descripción", "Titel und Beschreibung", "Titolo e descrizione"],
    ["Mots-clés et historique complet", "Keywords and full history", "Palabras clave e historial completo", "Suchbegriffe und vollständiger Verlauf", "Parole chiave e cronologia completa"],
    ["Rester en gratuit", "Stay on Free", "Seguir en Gratis", "Kostenlos bleiben", "Resta su Gratis"],
    ["Le plus choisi", "Most popular", "El más elegido", "Am beliebtesten", "Il più scelto"],
    ["Pour vider ton dressing et vendre sur les deux plateformes.", "To clear out your wardrobe and sell on both platforms.", "Para vaciar tu armario y vender en las dos plataformas.", "Um deinen Kleiderschrank zu leeren und auf beiden Plattformen zu verkaufen.", "Per svuotare l’armadio e vendere su entrambe le piattaforme."],
    ["60 annonces par mois, de quoi tout vendre en un week-end", "60 listings per month, enough to sell it all in a weekend", "60 anuncios al mes, para venderlo todo en un fin de semana", "60 Anzeigen pro Monat – genug, um alles an einem Wochenende zu verkaufen", "60 annunci al mese, per vendere tutto in un weekend"],
    ["Une annonce adaptée à chaque plateforme : Vinted et eBay", "A listing tailored to each platform: Vinted and eBay", "Un anuncio adaptado a cada plataforma: Vinted y eBay", "Eine passende Anzeige für jede Plattform: Vinted und eBay", "Un annuncio adatto a ogni piattaforma: Vinted ed eBay"],
    ["Mots-clés pour que les acheteurs te trouvent", "Keywords so buyers find you", "Palabras clave para que te encuentren", "Suchbegriffe, damit Käufer dich finden", "Parole chiave per farti trovare"],
    ["4 photos : plus de détails repérés", "4 photos: more details spotted", "4 fotos: se detectan más detalles", "4 Fotos: mehr Details erkannt", "4 foto: più dettagli individuati"],
    ["Historique complet de tes annonces", "Full history of your listings", "Historial completo de tus anuncios", "Vollständiger Verlauf deiner Anzeigen", "Cronologia completa dei tuoi annunci"],
    ["Analyse approfondie", "In-depth analysis", "Análisis a fondo", "Tiefgehende Analyse", "Analisi approfondita"],
    ["Choisir Pro", "Choose Pro", "Elegir Pro", "Pro wählen", "Scegli Pro"],
    ["Le plus complet", "Most complete", "El más completo", "Am umfangreichsten", "Il più completo"],
    ["Pour vendre sans compter, même les objets de valeur.", "To sell without limits, even valuable items.", "Para vender sin límites, incluso objetos de valor.", "Zum Verkaufen ohne Grenzen, auch für wertvolle Artikel.", "Per vendere senza limiti, anche oggetti di valore."],
    ["Annonces illimitées, plus aucun compteur", "Unlimited listings, no more counter", "Anuncios ilimitados, sin contador", "Unbegrenzte Anzeigen, kein Zähler mehr", "Annunci illimitati, nessun contatore"],
    ["Analyse approfondie : marque, modèle et défauts repérés plus finement", "In-depth analysis: brand, model and flaws spotted more precisely", "Análisis a fondo: marca, modelo y defectos detectados con más precisión", "Tiefgehende Analyse: Marke, Modell und Mängel werden genauer erkannt", "Analisi approfondita: marca, modello e difetti individuati con più precisione"],
    ["8 photos par objet pour ne rien oublier", "8 photos per item so nothing is missed", "8 fotos por objeto para no olvidar nada", "8 Fotos pro Artikel, damit nichts fehlt", "8 foto per oggetto per non dimenticare nulla"],
    ["Pensé pour l’électronique, les sacs et les marques", "Built for electronics, bags and brands", "Pensado para electrónica, bolsos y marcas", "Gemacht für Elektronik, Taschen und Marken", "Pensato per elettronica, borse e brand"],
    ["Vinted et eBay, mots-clés, historique complet", "Vinted and eBay, keywords, full history", "Vinted y eBay, palabras clave, historial completo", "Vinted und eBay, Suchbegriffe, vollständiger Verlauf", "Vinted ed eBay, parole chiave, cronologia completa"],
    ["Choisir Ultra", "Choose Ultra", "Elegir Ultra", "Ultra wählen", "Scegli Ultra"],
    ["Paiement sécurisé avec", "Secure payment with", "Pago seguro con", "Sichere Zahlung mit", "Pagamento sicuro con"],
    ["· Carte bancaire · Résiliable à tout moment", "· Card · Cancel anytime", "· Tarjeta · Cancela cuando quieras", "· Karte · Jederzeit kündbar", "· Carta · Disdici quando vuoi"],
    ["Offre actuelle", "Current plan", "Plan actual", "Aktueller Tarif", "Piano attuale"],
    ["Choisir", "Choose", "Elegir", "Wählen", "Scegli"],
    ["Résilier", "Cancel plan", "Cancelar", "Kündigen", "Disdici"],
    ["Passer à Pro", "Upgrade to Pro", "Pasar a Pro", "Auf Pro upgraden", "Passa a Pro"],
    ["Passer à Ultra", "Upgrade to Ultra", "Pasar a Ultra", "Auf Ultra upgraden", "Passa a Ultra"],

    // ── Avis
    ["Avis clients", "Customer reviews", "Opiniones de clientes", "Kundenbewertungen", "Recensioni dei clienti"],
    ["Avis précédents", "Previous reviews", "Opiniones anteriores", "Vorherige Bewertungen", "Recensioni precedenti"],
    ["Avis suivants", "Next reviews", "Opiniones siguientes", "Nächste Bewertungen", "Recensioni successive"],
    ["Donner mon avis", "Leave a review", "Dar mi opinión", "Bewertung abgeben", "Lascia una recensione"],
    ["Merci ! Ton avis sera affiché après validation.", "Thanks! Your review will appear once approved.", "¡Gracias! Tu opinión se mostrará tras validarla.", "Danke! Deine Bewertung erscheint nach der Prüfung.", "Grazie! La tua recensione sarà visibile dopo la verifica."],
    ["Prénom", "First name", "Nombre", "Vorname", "Nome"],
    ["Ta note", "Your rating", "Tu nota", "Deine Bewertung", "Il tuo voto"],
    ["Note", "Rating", "Nota", "Bewertung", "Voto"],
    ["Ce que tu as vendu", "What you sold", "Lo que vendiste", "Was du verkauft hast", "Cosa hai venduto"],
    ["Ton avis", "Your review", "Tu opinión", "Deine Bewertung", "La tua recensione"],
    ["Envoyer mon avis", "Send my review", "Enviar mi opinión", "Bewertung senden", "Invia la recensione"],
    ["Annuler", "Cancel", "Cancelar", "Abbrechen", "Annulla"],
    ["Avis à valider", "Reviews to approve", "Opiniones por validar", "Zu prüfende Bewertungen", "Recensioni da approvare"],
    ["Aucun avis en attente.", "No reviews waiting.", "No hay opiniones pendientes.", "Keine offenen Bewertungen.", "Nessuna recensione in attesa."],
    ["Publier", "Publish", "Publicar", "Veröffentlichen", "Pubblica"],
    ["Refuser", "Reject", "Rechazar", "Ablehnen", "Rifiuta"],
    ["Pas encore d’avis", "No reviews yet", "Aún no hay opiniones", "Noch keine Bewertungen", "Ancora nessuna recensione"],
    ["Sois le premier à partager ton expérience avec Déclic.", "Be the first to share your experience with Déclic.", "Sé el primero en compartir tu experiencia con Déclic.", "Teile als Erster deine Erfahrung mit Déclic.", "Sii il primo a condividere la tua esperienza con Déclic."],

    // ── FAQ
    ["Questions fréquentes", "FAQ", "Preguntas frecuentes", "Häufige Fragen", "Domande frequenti"],
    ["Est-ce que l’annonce est publiée automatiquement ?", "Is the listing posted automatically?", "¿Se publica el anuncio automáticamente?", "Wird die Anzeige automatisch veröffentlicht?", "L’annuncio viene pubblicato automaticamente?"],
    ["Non. Vinted et eBay ne permettent pas de publier depuis un site tiers. Un lien ouvre leur application, et tu colles l’annonce dans le formulaire de vente.", "No. Vinted and eBay don’t allow posting from third-party sites. A link opens their app, and you paste the listing into the selling form.", "No. Vinted y eBay no permiten publicar desde webs externas. Un enlace abre su app y pegas el anuncio en el formulario de venta.", "Nein. Vinted und eBay erlauben kein Veröffentlichen über fremde Websites. Ein Link öffnet ihre App, und du fügst die Anzeige ins Verkaufsformular ein.", "No. Vinted ed eBay non permettono di pubblicare da siti esterni. Un link apre la loro app e incolli l’annuncio nel modulo di vendita."],
    ["Le prix proposé est-il fiable ?", "Is the suggested price reliable?", "¿Es fiable el precio propuesto?", "Ist der vorgeschlagene Preis zuverlässig?", "Il prezzo proposto è affidabile?"],
    ["C’est une estimation basée sur les photos, pas sur des ventes réelles. Compare avec des annonces similaires avant de fixer ton prix.", "It’s an estimate based on the photos, not on actual sales. Compare with similar listings before setting your price.", "Es una estimación basada en las fotos, no en ventas reales. Compara con anuncios parecidos antes de fijar tu precio.", "Es ist eine Schätzung anhand der Fotos, nicht anhand echter Verkäufe. Vergleiche mit ähnlichen Anzeigen, bevor du deinen Preis festlegst.", "È una stima basata sulle foto, non su vendite reali. Confronta con annunci simili prima di fissare il prezzo."],
    ["Que se passe-t-il si l’objet est mal reconnu ?", "What if the item isn’t recognised correctly?", "¿Qué pasa si el objeto no se reconoce bien?", "Was passiert, wenn der Artikel falsch erkannt wird?", "Cosa succede se l’oggetto non viene riconosciuto bene?"],
    ["Tous les champs sont modifiables. Tu peux aussi ajouter des précisions avant de lancer l’analyse.", "Every field can be edited. You can also add details before starting the analysis.", "Todos los campos se pueden editar. También puedes añadir detalles antes del análisis.", "Alle Felder sind bearbeitbar. Du kannst vor der Analyse auch Details ergänzen.", "Tutti i campi sono modificabili. Puoi anche aggiungere dettagli prima dell’analisi."],
    ["Mes photos sont-elles conservées ?", "Are my photos kept?", "¿Se guardan mis fotos?", "Werden meine Fotos gespeichert?", "Le mie foto vengono conservate?"],
    ["Non. Les photos servent uniquement à créer l’annonce et ne sont pas stockées. Tes annonces créées sont enregistrées sur ton compte, et tu peux les effacer à tout moment.", "No. Photos are only used to create the listing and aren’t stored. Your listings are saved to your account, and you can delete them anytime.", "No. Las fotos solo sirven para crear el anuncio y no se guardan. Tus anuncios se guardan en tu cuenta y puedes borrarlos cuando quieras.", "Nein. Die Fotos werden nur zum Erstellen der Anzeige genutzt und nicht gespeichert. Deine Anzeigen werden in deinem Konto gespeichert, und du kannst sie jederzeit löschen.", "No. Le foto servono solo a creare l’annuncio e non vengono salvate. I tuoi annunci sono salvati nel tuo account e puoi cancellarli quando vuoi."],
    ["Que se passe-t-il quand j’atteins ma limite mensuelle ?", "What happens when I reach my monthly limit?", "¿Qué pasa cuando llego a mi límite mensual?", "Was passiert, wenn ich mein Monatslimit erreiche?", "Cosa succede quando raggiungo il limite mensile?"],
    ["Le bouton d’analyse se bloque jusqu’au mois suivant, ou jusqu’à un changement d’offre.", "The analysis button locks until next month, or until you change plans.", "El botón de análisis se bloquea hasta el mes siguiente o hasta que cambies de plan.", "Der Analyse-Button ist bis zum nächsten Monat gesperrt oder bis du den Tarif wechselst.", "Il pulsante di analisi si blocca fino al mese successivo o fino al cambio di piano."],
    ["Puis-je changer d’offre ou arrêter ?", "Can I change plans or stop?", "¿Puedo cambiar de plan o dejarlo?", "Kann ich den Tarif wechseln oder kündigen?", "Posso cambiare piano o smettere?"],
    ["Oui, à tout moment depuis ton profil, onglet Abonnement. La résiliation prend effet à la fin du mois déjà payé.", "Yes, anytime from your profile, Subscription tab. Cancellation takes effect at the end of the month already paid.", "Sí, cuando quieras desde tu perfil, pestaña Suscripción. La cancelación se aplica al final del mes ya pagado.", "Ja, jederzeit in deinem Profil im Tab „Abo“. Die Kündigung gilt zum Ende des bereits bezahlten Monats.", "Sì, in qualsiasi momento dal profilo, scheda Abbonamento. La disdetta vale alla fine del mese già pagato."],
    ["Faut-il un compte ?", "Do I need an account?", "¿Necesito una cuenta?", "Brauche ich ein Konto?", "Serve un account?"],
    ["Oui, pour lancer une analyse. La connexion se fait par un lien reçu par e-mail, sans mot de passe. L’offre gratuite donne 5 annonces par mois.", "Yes, to run an analysis. You log in with a link sent by email, no password needed. The free plan gives 5 listings per month.", "Sí, para lanzar un análisis. Inicias sesión con un enlace que recibes por e-mail, sin contraseña. El plan gratis incluye 5 anuncios al mes.", "Ja, um eine Analyse zu starten. Du meldest dich über einen Link per E-Mail an, ohne Passwort. Der kostenlose Tarif bietet 5 Anzeigen pro Monat.", "Sì, per avviare un’analisi. Accedi con un link ricevuto via e-mail, senza password. Il piano gratuito include 5 annunci al mese."],
    ["Mentions légales · Confidentialité · Conditions", "Legal notice · Privacy · Terms", "Aviso legal · Privacidad · Condiciones", "Impressum · Datenschutz · AGB", "Note legali · Privacy · Condizioni"],
    ["Haut de page", "Back to top", "Volver arriba", "Nach oben", "Torna su"],
    ["Fermer", "Close", "Cerrar", "Schließen", "Chiudi"],

    // ── Connexion
    ["Pas de mot de passe : on t’envoie un lien de connexion par e-mail. Pas encore de compte ? Il est créé automatiquement.", "No password: we email you a login link. No account yet? It’s created automatically.", "Sin contraseña: te enviamos un enlace de acceso por e-mail. ¿Aún no tienes cuenta? Se crea automáticamente.", "Kein Passwort: Wir schicken dir einen Anmeldelink per E-Mail. Noch kein Konto? Es wird automatisch erstellt.", "Nessuna password: ti inviamo un link di accesso via e-mail. Non hai un account? Viene creato automaticamente."],
    ["E-mail", "Email", "E-mail", "E-Mail", "E-mail"],
    ["Prénom (facultatif)", "First name (optional)", "Nombre (opcional)", "Vorname (optional)", "Nome (facoltativo)"],
    ["Recevoir mon lien de connexion", "Send me a login link", "Recibir mi enlace de acceso", "Anmeldelink erhalten", "Ricevi il link di accesso"],
    ["Un lien de connexion a été envoyé à", "A login link has been sent to", "Se ha enviado un enlace de acceso a", "Ein Anmeldelink wurde gesendet an", "Un link di accesso è stato inviato a"],
    ["Ouvre-le pour te connecter. Pense à regarder dans les courriers indésirables.", "Open it to log in. Remember to check your spam folder.", "Ábrelo para iniciar sesión. Revisa también la carpeta de spam.", "Öffne ihn, um dich anzumelden. Schau auch im Spam-Ordner nach.", "Aprilo per accedere. Controlla anche la cartella spam."],
    ["Changer d’adresse", "Use another address", "Cambiar de dirección", "Andere Adresse verwenden", "Cambia indirizzo"],
    ["Indique un e-mail valide.", "Enter a valid email.", "Introduce un e-mail válido.", "Gib eine gültige E-Mail-Adresse ein.", "Inserisci un’e-mail valida."],
    ["Trop de demandes. Attends une minute avant de réessayer.", "Too many requests. Wait a minute before trying again.", "Demasiadas solicitudes. Espera un minuto antes de reintentar.", "Zu viele Anfragen. Warte eine Minute und versuche es erneut.", "Troppe richieste. Attendi un minuto prima di riprovare."],
    ["Impossible d’envoyer l’e-mail pour le moment. Réessaie plus tard.", "Couldn’t send the email right now. Try again later.", "No se pudo enviar el e-mail ahora. Inténtalo más tarde.", "Die E-Mail konnte gerade nicht gesendet werden. Versuche es später erneut.", "Impossibile inviare l’e-mail ora. Riprova più tardi."],
    ["Tu es déconnecté.", "You’re logged out.", "Has cerrado sesión.", "Du bist abgemeldet.", "Sei disconnesso."],
    ["Bienvenue.", "Welcome.", "Bienvenido.", "Willkommen.", "Benvenuto."],

    // ── Messages pendant l’utilisation
    ["Connecte-toi pour lancer l’analyse : 5 annonces offertes chaque mois.", "Log in to run the analysis: 5 free listings every month.", "Inicia sesión para analizar: 5 anuncios gratis al mes.", "Melde dich an, um die Analyse zu starten: 5 kostenlose Anzeigen pro Monat.", "Accedi per avviare l’analisi: 5 annunci gratis ogni mese."],
    ["Connecte-toi d’abord pour choisir une offre.", "Log in first to choose a plan.", "Inicia sesión primero para elegir un plan.", "Melde dich zuerst an, um einen Tarif zu wählen.", "Accedi prima per scegliere un piano."],
    ["Connecte-toi pour donner ton avis.", "Log in to leave a review.", "Inicia sesión para dar tu opinión.", "Melde dich an, um eine Bewertung abzugeben.", "Accedi per lasciare una recensione."],
    ["Le service n’est pas encore disponible.", "The service isn’t available yet.", "El servicio aún no está disponible.", "Der Dienst ist noch nicht verfügbar.", "Il servizio non è ancora disponibile."],
    ["Le service n’est pas encore configuré. Reviens un peu plus tard.", "The service isn’t set up yet. Come back a little later.", "El servicio aún no está configurado. Vuelve un poco más tarde.", "Der Dienst ist noch nicht eingerichtet. Komm etwas später wieder.", "Il servizio non è ancora configurato. Torna più tardi."],
    ["Impossible de lire cette image (JPG ou PNG).", "Can’t read this image (JPG or PNG).", "No se puede leer esta imagen (JPG o PNG).", "Dieses Bild kann nicht gelesen werden (JPG oder PNG).", "Impossibile leggere questa immagine (JPG o PNG)."],
    ["Objet non reconnu. Essaie des photos plus nettes, sur fond uni.", "Item not recognised. Try sharper photos on a plain background.", "Objeto no reconocido. Prueba con fotos más nítidas sobre fondo liso.", "Artikel nicht erkannt. Versuche schärfere Fotos vor einfarbigem Hintergrund.", "Oggetto non riconosciuto. Prova foto più nitide su sfondo uniforme."],
    ["Limite mensuelle atteinte. Passe à une offre supérieure pour continuer.", "Monthly limit reached. Upgrade your plan to continue.", "Límite mensual alcanzado. Pasa a un plan superior para seguir.", "Monatslimit erreicht. Wechsle zu einem höheren Tarif, um weiterzumachen.", "Limite mensile raggiunto. Passa a un piano superiore per continuare."],
    ["Photos trop lourdes. Retire-en une et réessaie.", "Photos too large. Remove one and try again.", "Fotos demasiado pesadas. Quita una y vuelve a intentarlo.", "Fotos zu groß. Entferne eines und versuche es erneut.", "Foto troppo pesanti. Rimuovine una e riprova."],
    ["Trop de demandes en ce moment, réessaie dans un instant.", "Too many requests right now, try again in a moment.", "Demasiadas solicitudes ahora, inténtalo en un momento.", "Gerade zu viele Anfragen, versuche es gleich noch einmal.", "Troppe richieste al momento, riprova tra poco."],
    ["L’analyse a échoué. Réessaie avec des photos plus nettes. Cet essai n’a pas été décompté.", "The analysis failed. Try again with sharper photos. This attempt wasn’t counted.", "El análisis ha fallado. Prueba con fotos más nítidas. Este intento no se ha contado.", "Die Analyse ist fehlgeschlagen. Versuche es mit schärferen Fotos. Dieser Versuch wurde nicht gezählt.", "L’analisi non è riuscita. Riprova con foto più nitide. Questo tentativo non è stato conteggiato."],
    ["Annonce copiée.", "Listing copied.", "Anuncio copiado.", "Anzeige kopiert.", "Annuncio copiato."],
    ["Copie impossible.", "Couldn’t copy.", "No se pudo copiar.", "Kopieren nicht möglich.", "Impossibile copiare."],
    ["Redirection vers le paiement sécurisé…", "Redirecting to secure payment…", "Redirigiendo al pago seguro…", "Weiterleitung zur sicheren Zahlung…", "Reindirizzamento al pagamento sicuro…"],
    ["Le paiement n’est pas encore activé.", "Payments aren’t enabled yet.", "El pago aún no está activado.", "Zahlungen sind noch nicht aktiviert.", "Il pagamento non è ancora attivo."],
    ["Le paiement est indisponible pour le moment. Réessaie plus tard.", "Payment is unavailable right now. Try again later.", "El pago no está disponible ahora. Inténtalo más tarde.", "Die Zahlung ist gerade nicht verfügbar. Versuche es später erneut.", "Il pagamento non è disponibile ora. Riprova più tardi."],
    ["L’espace de paiement est indisponible pour le moment.", "The billing area is unavailable right now.", "El área de pagos no está disponible ahora.", "Der Zahlungsbereich ist gerade nicht verfügbar.", "L’area pagamenti non è disponibile ora."],
    ["Paiement annulé, rien n’a été débité.", "Payment cancelled, nothing was charged.", "Pago cancelado, no se ha cobrado nada.", "Zahlung abgebrochen, es wurde nichts abgebucht.", "Pagamento annullato, non è stato addebitato nulla."],
    ["Paiement reçu, activation de ton offre…", "Payment received, activating your plan…", "Pago recibido, activando tu plan…", "Zahlung erhalten, dein Tarif wird aktiviert…", "Pagamento ricevuto, attivazione del piano…"],
    ["Ton offre sera activée dans quelques instants. Recharge la page si besoin.", "Your plan will be active in a moment. Reload the page if needed.", "Tu plan se activará en unos instantes. Recarga la página si hace falta.", "Dein Tarif wird gleich aktiviert. Lade die Seite bei Bedarf neu.", "Il piano sarà attivo tra poco. Ricarica la pagina se serve."],
    ["Indique ton prénom, une note et un avis d’au moins 15 caractères.", "Enter your first name, a rating and a review of at least 15 characters.", "Indica tu nombre, una nota y una opinión de al menos 15 caracteres.", "Gib deinen Vornamen, eine Bewertung und einen Text mit mindestens 15 Zeichen an.", "Inserisci il nome, un voto e una recensione di almeno 15 caratteri."],
    ["Tu as déjà envoyé un avis. Merci !", "You’ve already sent a review. Thanks!", "Ya enviaste una opinión. ¡Gracias!", "Du hast bereits eine Bewertung gesendet. Danke!", "Hai già inviato una recensione. Grazie!"],
    ["Impossible d’envoyer ton avis pour le moment. Réessaie plus tard.", "Couldn’t send your review right now. Try again later.", "No se pudo enviar tu opinión ahora. Inténtalo más tarde.", "Deine Bewertung konnte gerade nicht gesendet werden. Versuche es später.", "Impossibile inviare la recensione ora. Riprova più tardi."],
    ["Action impossible.", "Action failed.", "Acción no posible.", "Aktion nicht möglich.", "Azione non riuscita."],
    ["Profil mis à jour.", "Profile updated.", "Perfil actualizado.", "Profil aktualisiert.", "Profilo aggiornato."],
    ["Enregistrement impossible.", "Couldn’t save.", "No se pudo guardar.", "Speichern nicht möglich.", "Impossibile salvare."],
    ["Impossible de changer l’e-mail.", "Couldn’t change the email.", "No se pudo cambiar el e-mail.", "E-Mail-Adresse konnte nicht geändert werden.", "Impossibile cambiare l’e-mail."],
    ["Confirme ta nouvelle adresse grâce au lien envoyé par e-mail.", "Confirm your new address with the link we emailed you.", "Confirma tu nueva dirección con el enlace enviado por e-mail.", "Bestätige deine neue Adresse über den Link in der E-Mail.", "Conferma il nuovo indirizzo con il link inviato via e-mail."],
    ["Effacer tout l’historique de tes annonces ?", "Delete your entire listing history?", "¿Borrar todo el historial de tus anuncios?", "Den gesamten Verlauf deiner Anzeigen löschen?", "Cancellare tutta la cronologia dei tuoi annunci?"],
    ["Historique effacé.", "History deleted.", "Historial borrado.", "Verlauf gelöscht.", "Cronologia cancellata."],
    ["Effacement impossible.", "Couldn’t delete.", "No se pudo borrar.", "Löschen nicht möglich.", "Impossibile cancellare."],
    ["Supprimer définitivement ton compte ? Ton abonnement sera résilié et toutes tes données effacées.", "Permanently delete your account? Your subscription will be cancelled and all your data erased.", "¿Eliminar tu cuenta para siempre? Se cancelará tu suscripción y se borrarán todos tus datos.", "Dein Konto endgültig löschen? Dein Abo wird gekündigt und alle Daten gelöscht.", "Eliminare definitivamente l’account? L’abbonamento sarà disdetto e tutti i dati cancellati."],
    ["Ton compte a été supprimé.", "Your account has been deleted.", "Tu cuenta ha sido eliminada.", "Dein Konto wurde gelöscht.", "Il tuo account è stato eliminato."],
    ["Suppression impossible pour le moment. Écris-nous.", "Couldn’t delete right now. Contact us.", "No se pudo eliminar ahora. Escríbenos.", "Löschen gerade nicht möglich. Schreib uns.", "Impossibile eliminare ora. Scrivici."],
    ["Supprimer cette annonce de ton historique ?", "Delete this listing from your history?", "¿Borrar este anuncio de tu historial?", "Diese Anzeige aus deinem Verlauf löschen?", "Eliminare questo annuncio dalla cronologia?"],
    ["Suppression impossible.", "Couldn’t delete.", "No se pudo eliminar.", "Löschen nicht möglich.", "Impossibile eliminare."],
    ["Tes données sont téléchargées.", "Your data has been downloaded.", "Tus datos se han descargado.", "Deine Daten wurden heruntergeladen.", "I tuoi dati sono stati scaricati."],

    // ── Profil
    ["+ Nouvelle annonce", "+ New listing", "+ Nuevo anuncio", "+ Neue Anzeige", "+ Nuovo annuncio"],
    ["Abonnement", "Subscription", "Suscripción", "Abo", "Abbonamento"],
    ["Réglages", "Settings", "Ajustes", "Einstellungen", "Impostazioni"],
    ["Annonces illimitées", "Unlimited listings", "Anuncios ilimitados", "Unbegrenzte Anzeigen", "Annunci illimitati"],
    ["annonces ce mois-ci", "listings this month", "anuncios este mes", "Anzeigen diesen Monat", "annunci questo mese"],
    ["annonces au total", "listings in total", "anuncios en total", "Anzeigen insgesamt", "annunci in totale"],
    ["photos analysées", "photos analysed", "fotos analizadas", "analysierte Fotos", "foto analizzate"],
    ["valeur de tes annonces", "value of your listings", "valor de tus anuncios", "Wert deiner Anzeigen", "valore dei tuoi annunci"],
    ["Activité", "Activity", "Actividad", "Aktivität", "Attività"],
    ["6 derniers mois", "last 6 months", "últimos 6 meses", "letzte 6 Monate", "ultimi 6 mesi"],
    ["Ton activité apparaîtra ici.", "Your activity will show up here.", "Tu actividad aparecerá aquí.", "Deine Aktivität erscheint hier.", "La tua attività apparirà qui."],
    ["Tes catégories", "Your categories", "Tus categorías", "Deine Kategorien", "Le tue categorie"],
    ["Crée ta première annonce pour voir tes catégories.", "Create your first listing to see your categories.", "Crea tu primer anuncio para ver tus categorías.", "Erstelle deine erste Anzeige, um deine Kategorien zu sehen.", "Crea il primo annuncio per vedere le tue categorie."],
    ["Succès", "Achievements", "Logros", "Erfolge", "Traguardi"],
    ["Premier déclic", "First click", "Primer clic", "Erster Klick", "Primo clic"],
    ["1re annonce", "1st listing", "1.er anuncio", "1. Anzeige", "1° annuncio"],
    ["Vendeur lancé", "On a roll", "Vendedor en marcha", "Verkauf läuft", "Venditore lanciato"],
    ["10 annonces", "10 listings", "10 anuncios", "10 Anzeigen", "10 annunci"],
    ["Pro de la revente", "Resale pro", "Pro de la reventa", "Wiederverkaufs-Profi", "Pro della rivendita"],
    ["50 annonces", "50 listings", "50 anuncios", "50 Anzeigen", "50 annunci"],
    ["Œil de lynx", "Eagle eye", "Ojo de lince", "Adlerauge", "Occhio di lince"],
    ["100 photos", "100 photos", "100 fotos", "100 Fotos", "100 foto"],
    ["Abonné", "Subscriber", "Suscriptor", "Abonnent", "Abbonato"],
    ["offre payante", "paid plan", "plan de pago", "kostenpflichtiger Tarif", "piano a pagamento"],
    ["Pro ou Ultra", "Pro or Ultra", "Pro o Ultra", "Pro oder Ultra", "Pro o Ultra"],
    ["Rechercher une annonce…", "Search listings…", "Buscar un anuncio…", "Anzeige suchen…", "Cerca un annuncio…"],
    ["Rechercher une annonce", "Search listings", "Buscar un anuncio", "Anzeige suchen", "Cerca un annuncio"],
    ["Filtrer par catégorie", "Filter by category", "Filtrar por categoría", "Nach Kategorie filtern", "Filtra per categoria"],
    ["Toutes les catégories", "All categories", "Todas las categorías", "Alle Kategorien", "Tutte le categorie"],
    ["Tes annonces créées apparaîtront ici.", "Your listings will show up here.", "Tus anuncios aparecerán aquí.", "Deine Anzeigen erscheinen hier.", "I tuoi annunci appariranno qui."],
    ["Avec l’offre Gratuit, seules tes 5 dernières annonces sont visibles.", "On the Free plan, only your last 5 listings are visible.", "Con el plan Gratis solo ves tus 5 últimos anuncios.", "Im kostenlosen Tarif siehst du nur deine letzten 5 Anzeigen.", "Con il piano Gratis vedi solo gli ultimi 5 annunci."],
    ["pour tout ton historique.", "for your full history.", "para todo tu historial.", "für deinen ganzen Verlauf.", "per tutta la cronologia."],
    ["Voir", "View", "Ver", "Ansehen", "Vedi"],
    ["Masquer", "Hide", "Ocultar", "Ausblenden", "Nascondi"],
    ["Copier", "Copy", "Copiar", "Kopieren", "Copia"],
    ["Supprimer", "Delete", "Eliminar", "Löschen", "Elimina"],
    ["Ton offre actuelle", "Your current plan", "Tu plan actual", "Dein aktueller Tarif", "Il tuo piano attuale"],
    ["Version Vinted", "Vinted version", "Versión Vinted", "Vinted-Version", "Versione Vinted"],
    ["Versions Vinted et eBay", "Vinted and eBay versions", "Versiones Vinted y eBay", "Vinted- und eBay-Versionen", "Versioni Vinted ed eBay"],
    ["Versions Vinted et eBay, mots-clés", "Vinted and eBay versions, keywords", "Versiones Vinted y eBay, palabras clave", "Vinted- und eBay-Versionen, Suchbegriffe", "Versioni Vinted ed eBay, parole chiave"],
    ["Mots-clés de recherche", "Search keywords", "Palabras clave de búsqueda", "Suchbegriffe", "Parole chiave di ricerca"],
    ["Historique complet", "Full history", "Historial completo", "Vollständiger Verlauf", "Cronologia completa"],
    ["0 € · 5 annonces par mois, Vinted, 2 photos", "€0 · 5 listings per month, Vinted, 2 photos", "0 € · 5 anuncios al mes, Vinted, 2 fotos", "0 € · 5 Anzeigen pro Monat, Vinted, 2 Fotos", "0 € · 5 annunci al mese, Vinted, 2 foto"],
    ["11,99 € par mois · 60 annonces, Vinted et eBay, mots-clés, 4 photos", "€11.99 per month · 60 listings, Vinted and eBay, keywords, 4 photos", "11,99 € al mes · 60 anuncios, Vinted y eBay, palabras clave, 4 fotos", "11,99 € pro Monat · 60 Anzeigen, Vinted und eBay, Suchbegriffe, 4 Fotos", "11,99 € al mese · 60 annunci, Vinted ed eBay, parole chiave, 4 foto"],
    ["18,99 € par mois · illimité, analyse approfondie, 8 photos", "€18.99 per month · unlimited, in-depth analysis, 8 photos", "18,99 € al mes · ilimitado, análisis a fondo, 8 fotos", "18,99 € pro Monat · unbegrenzt, tiefgehende Analyse, 8 Fotos", "18,99 € al mese · illimitato, analisi approfondita, 8 foto"],
    ["Paiement sécurisé par Stripe. Résiliable à tout moment.", "Secure payment by Stripe. Cancel anytime.", "Pago seguro con Stripe. Cancela cuando quieras.", "Sichere Zahlung über Stripe. Jederzeit kündbar.", "Pagamento sicuro con Stripe. Disdici quando vuoi."],
    ["Gérer mon abonnement et mes factures", "Manage my subscription and invoices", "Gestionar mi suscripción y facturas", "Abo und Rechnungen verwalten", "Gestisci abbonamento e fatture"],
    ["Informations", "Details", "Información", "Angaben", "Informazioni"],
    ["Indique ton prénom et un e-mail valide.", "Enter your first name and a valid email.", "Indica tu nombre y un e-mail válido.", "Gib deinen Vornamen und eine gültige E-Mail-Adresse an.", "Inserisci il nome e un’e-mail valida."],
    ["Enregistrer", "Save", "Guardar", "Speichern", "Salva"],
    ["Préférences", "Preferences", "Preferencias", "Einstellungen", "Preferenze"],
    ["Plateforme affichée en premier", "Platform shown first", "Plataforma que se muestra primero", "Zuerst angezeigte Plattform", "Piattaforma mostrata per prima"],
    ["Mes données", "My data", "Mis datos", "Meine Daten", "I miei dati"],
    ["Télécharge une copie de ton compte et de tes annonces, ou efface ton historique.", "Download a copy of your account and listings, or delete your history.", "Descarga una copia de tu cuenta y tus anuncios, o borra tu historial.", "Lade eine Kopie deines Kontos und deiner Anzeigen herunter oder lösche deinen Verlauf.", "Scarica una copia del tuo account e dei tuoi annunci, o cancella la cronologia."],
    ["Télécharger mes données", "Download my data", "Descargar mis datos", "Meine Daten herunterladen", "Scarica i miei dati"],
    ["Effacer mon historique", "Delete my history", "Borrar mi historial", "Meinen Verlauf löschen", "Cancella la cronologia"],
    ["Zone sensible", "Danger zone", "Zona delicada", "Gefahrenzone", "Zona delicata"],
    ["Supprimer ton compte résilie ton abonnement et efface définitivement toutes tes données.", "Deleting your account cancels your subscription and permanently erases all your data.", "Eliminar tu cuenta cancela tu suscripción y borra todos tus datos para siempre.", "Wenn du dein Konto löschst, wird dein Abo gekündigt und alle Daten werden endgültig gelöscht.", "Eliminare l’account disdice l’abbonamento e cancella definitivamente tutti i dati."],
    ["Supprimer mon compte", "Delete my account", "Eliminar mi cuenta", "Mein Konto löschen", "Elimina il mio account"],
    ["Déconnexion", "Log out", "Cerrar sesión", "Abmelden", "Esci"],

    // ── Panneau de réglages
    ["Réglages du site", "Site settings", "Ajustes del sitio", "Website-Einstellungen", "Impostazioni del sito"],
    ["Langue", "Language", "Idioma", "Sprache", "Lingua"],
    ["Thème", "Theme", "Tema", "Design", "Tema"],
    ["Sombre", "Dark", "Oscuro", "Dunkel", "Scuro"],
    ["Clair", "Light", "Claro", "Hell", "Chiaro"],
    ["Auto", "Auto", "Auto", "Auto", "Auto"],
    ["Animations", "Animations", "Animaciones", "Animationen", "Animazioni"],
    ["Activées", "On", "Activadas", "An", "Attive"],
    ["Réduites", "Reduced", "Reducidas", "Reduziert", "Ridotte"],
    ["L’annonce est aussi rédigée dans cette langue.", "Your listing is written in this language too.", "El anuncio también se redacta en este idioma.", "Die Anzeige wird auch in dieser Sprache geschrieben.", "Anche l’annuncio viene scritto in questa lingua."],

    // ── Texte de l’annonce copiée
    ["Catégorie :", "Category:", "Categoría:", "Kategorie:", "Categoria:"],
    ["Marque :", "Brand:", "Marca:", "Marke:", "Marca:"],
    ["Couleur :", "Colour:", "Color:", "Farbe:", "Colore:"],
    ["État :", "Condition:", "Estado:", "Zustand:", "Condizioni:"],
    ["Prix :", "Price:", "Precio:", "Preis:", "Prezzo:"],
    ["Mots-clés :", "Keywords:", "Palabras clave:", "Suchbegriffe:", "Parole chiave:"],
    // ── Mode lot, photos, traduction, ventes
    ["Un objet", "One item", "Un objeto", "Ein Artikel", "Un oggetto"],
    ["📦 Plusieurs objets", "📦 Several items", "📦 Varios objetos", "📦 Mehrere Artikel", "📦 Più oggetti"],
    ["Mode", "Mode", "Modo", "Modus", "Modalità"],
    ["✨ Améliorer automatiquement mes photos", "✨ Auto-enhance my photos", "✨ Mejorar mis fotos automáticamente", "✨ Meine Fotos automatisch verbessern", "✨ Migliora automaticamente le foto"],
    ["Mode lot", "Batch mode", "Modo lote", "Stapelmodus", "Modalità multipla"],
    ["Une photo par objet. L’IA reconnaît chaque objet, choisit sa catégorie et rédige toutes les annonces à la suite.", "One photo per item. The AI recognises each item, picks its category and writes every listing in a row.", "Una foto por objeto. La IA reconoce cada objeto, elige su categoría y redacta todos los anuncios seguidos.", "Ein Foto pro Artikel. Die KI erkennt jeden Artikel, wählt die Kategorie und schreibt alle Anzeigen nacheinander.", "Una foto per oggetto. L’IA riconosce ogni oggetto, sceglie la categoria e scrive tutti gli annunci di fila."],
    ["Pro · Ultra", "Pro · Ultra", "Pro · Ultra", "Pro · Ultra", "Pro · Ultra"],
    ["+ Ajouter des objets", "+ Add items", "+ Añadir objetos", "+ Artikel hinzufügen", "+ Aggiungi oggetti"],
    ["Créer les annonces", "Create the listings", "Crear los anuncios", "Anzeigen erstellen", "Crea gli annunci"],
    ["Création en cours…", "Creating…", "Creando…", "Wird erstellt…", "Creazione in corso…"],
    ["Tout effacer", "Clear all", "Borrar todo", "Alles löschen", "Cancella tutto"],
    ["En attente", "Waiting", "En espera", "Wartet", "In attesa"],
    ["Analyse…", "Analysing…", "Analizando…", "Analyse…", "Analisi…"],
    ["✓ Prête", "✓ Ready", "✓ Listo", "✓ Fertig", "✓ Pronto"],
    ["Échec", "Failed", "Error", "Fehler", "Errore"],
    ["Le mode lot est réservé aux offres Pro et Ultra.", "Batch mode is for Pro and Ultra plans.", "El modo lote es para los planes Pro y Ultra.", "Der Stapelmodus ist den Tarifen Pro und Ultra vorbehalten.", "La modalità multipla è riservata ai piani Pro e Ultra."],
    ["Analyses restantes ce mois-ci :", "Analyses left this month:", "Análisis restantes este mes:", "Verbleibende Analysen diesen Monat:", "Analisi rimaste questo mese:"],
    ["seuls les premiers objets seront traités.", "only the first items will be processed.", "solo se procesarán los primeros objetos.", "nur die ersten Artikel werden bearbeitet.", "verranno elaborati solo i primi oggetti."],
    ["Maximum 30 objets par lot.", "Maximum 30 items per batch.", "Máximo 30 objetos por lote.", "Maximal 30 Artikel pro Stapel.", "Massimo 30 oggetti per volta."],
    ["annonces prêtes !", "listings ready!", "anuncios listos!", "Anzeigen fertig!", "annunci pronti!"],
    ["annonce prête !", "listing ready!", "anuncio listo!", "Anzeige fertig!", "annuncio pronto!"],
    ["Vendre à l’étranger", "Sell abroad", "Vender en el extranjero", "Im Ausland verkaufen", "Vendi all’estero"],
    ["🇫🇷 Original", "🇫🇷 Original", "🇫🇷 Original", "🇫🇷 Original", "🇫🇷 Originale"],
    ["Traduction de l’annonce : offre Pro ou Ultra.", "Listing translation: Pro or Ultra plan.", "Traducción del anuncio: plan Pro o Ultra.", "Übersetzung der Anzeige: Pro- oder Ultra-Tarif.", "Traduzione dell’annuncio: piano Pro o Ultra."],
    ["Annonce traduite.", "Listing translated.", "Anuncio traducido.", "Anzeige übersetzt.", "Annuncio tradotto."],
    ["Traduction impossible pour le moment.", "Translation unavailable right now.", "La traducción no está disponible ahora.", "Übersetzung gerade nicht möglich.", "Traduzione non disponibile al momento."],
    ["📥 Enregistrer les photos", "📥 Save the photos", "📥 Guardar las fotos", "📥 Fotos speichern", "📥 Salva le foto"],
    ["Enregistrer les photos", "Save the photos", "Guardar las fotos", "Fotos speichern", "Salva le foto"],
    ["Aucune photo à enregistrer.", "No photos to save.", "No hay fotos para guardar.", "Keine Fotos zum Speichern.", "Nessuna foto da salvare."],
    ["Photos enregistrées.", "Photos saved.", "Fotos guardadas.", "Fotos gespeichert.", "Foto salvate."],
    ["Mes ventes", "My sales", "Mis ventas", "Meine Verkäufe", "Le mie vendite"],
    ["objets vendus", "items sold", "objetos vendidos", "verkaufte Artikel", "oggetti venduti"],
    ["gagnés", "earned", "ganados", "verdient", "guadagnati"],
    ["pour vendre, en moyenne", "to sell, on average", "para vender, de media", "bis zum Verkauf, im Schnitt", "per vendere, in media"],
    ["Touche « Vendu » dans « Mes annonces » quand un objet part : tu verras ici ce que tu gagnes.", "Tap “Sold” in “My listings” when an item sells: you’ll see your earnings here.", "Toca «Vendido» en «Mis anuncios» cuando vendas algo: aquí verás lo que ganas.", "Tippe in „Meine Anzeigen“ auf „Verkauft“, wenn ein Artikel weg ist: Hier siehst du deine Einnahmen.", "Tocca «Venduto» in «I miei annunci» quando vendi un oggetto: qui vedrai quanto guadagni."],
    ["Vendu", "Sold", "Vendido", "Verkauft", "Venduto"],
    ["Prix de vente final (€) ?", "Final selling price (€)?", "¿Precio final de venta (€)?", "Endgültiger Verkaufspreis (€)?", "Prezzo di vendita finale (€)?"],
    ["Bravo pour la vente !", "Congrats on the sale!", "¡Enhorabuena por la venta!", "Glückwunsch zum Verkauf!", "Complimenti per la vendita!"],
    ["moins d’1 jour", "under 1 day", "menos de 1 día", "unter 1 Tag", "meno di 1 giorno"],
    ["jours", "days", "días", "Tage", "giorni"],
    ["jour", "day", "día", "Tag", "giorno"],
    ["En ligne depuis", "Online for", "En línea desde hace", "Online seit", "Online da"],
    ["conseil : baisse à", "tip: lower to", "consejo: baja a", "Tipp: senke auf", "consiglio: abbassa a"]
  ];

  // Titre principal de l’accueil (mot à mot, deux lignes)
  var HERO = {
    en: [["You", "take", "the", "photo."], ["Your", "listing’s", "ready."]],
    es: [["Tú", "haces", "la", "foto."], ["El", "anuncio", "está", "listo."]],
    de: [["Du", "machst", "das", "Foto."], ["Die", "Anzeige", "ist", "fertig."]],
    it: [["Tu", "scatti", "la", "foto."], ["L’annuncio", "è", "pronto."]]
  };

  // Phrases avec des nombres ou des noms : [motif, {en, es, de, it}]
  function pl(n, one, many) { return (+n === 1 ? one : many).replace("{n}", n); }
  var P = [
    [/^(\d+) annonces? restantes?$/, {
      en: function (m) { return pl(m[1], "{n} listing left", "{n} listings left"); },
      es: function (m) { return pl(m[1], "Queda {n} anuncio", "Quedan {n} anuncios"); },
      de: function (m) { return pl(m[1], "Noch {n} Anzeige", "Noch {n} Anzeigen"); },
      it: function (m) { return pl(m[1], "{n} annuncio rimasto", "{n} annunci rimasti"); } }],
    [/^(\d+) sur (\d+) utilisées ce mois-ci$/, { en: "$1 of $2 used this month", es: "$1 de $2 usados este mes", de: "$1 von $2 diesen Monat genutzt", it: "$1 su $2 usati questo mese" }],
    [/^(\d+) annonces? ce mois-ci$/, {
      en: function (m) { return pl(m[1], "{n} listing this month", "{n} listings this month"); },
      es: function (m) { return pl(m[1], "{n} anuncio este mes", "{n} anuncios este mes"); },
      de: function (m) { return pl(m[1], "{n} Anzeige diesen Monat", "{n} Anzeigen diesen Monat"); },
      it: function (m) { return pl(m[1], "{n} annuncio questo mese", "{n} annunci questo mese"); } }],
    [/^(\d+) annonces? trouvées?$/, {
      en: function (m) { return pl(m[1], "{n} listing found", "{n} listings found"); },
      es: function (m) { return pl(m[1], "{n} anuncio encontrado", "{n} anuncios encontrados"); },
      de: function (m) { return pl(m[1], "{n} Anzeige gefunden", "{n} Anzeigen gefunden"); },
      it: function (m) { return pl(m[1], "{n} annuncio trovato", "{n} annunci trovati"); } }],
    [/^(\d+) annonces?$/, {
      en: function (m) { return pl(m[1], "{n} listing", "{n} listings"); },
      es: function (m) { return pl(m[1], "{n} anuncio", "{n} anuncios"); },
      de: function (m) { return pl(m[1], "{n} Anzeige", "{n} Anzeigen"); },
      it: function (m) { return pl(m[1], "{n} annuncio", "{n} annunci"); } }],
    [/^(\d+) annonce\(s\)$/, { en: "$1 listing(s)", es: "$1 anuncio(s)", de: "$1 Anzeige(n)", it: "$1 annuncio/i" }],
    [/^Le compteur repart à zéro le (.+)\.$/, { en: "The counter resets on $1.", es: "El contador se reinicia el $1.", de: "Der Zähler wird am $1 zurückgesetzt.", it: "Il contatore si azzera il $1." }],
    [/^Membre depuis (.+)$/, { en: "Member since $1", es: "Miembro desde $1", de: "Mitglied seit $1", it: "Membro da $1" }],
    [/^Bienvenue (.+)\.$/, { en: "Welcome $1.", es: "Bienvenido, $1.", de: "Willkommen, $1.", it: "Benvenuto, $1." }],
    [/^Offre (.+) activée\.$/, { en: "$T1 plan activated.", es: "Plan $T1 activado.", de: "Tarif $T1 aktiviert.", it: "Piano $T1 attivato." }],
    [/^Offre (.+) activée\. Merci !$/, { en: "$T1 plan activated. Thank you!", es: "Plan $T1 activado. ¡Gracias!", de: "Tarif $T1 aktiviert. Danke!", it: "Piano $T1 attivato. Grazie!" }],
    [/^Ton offre permet (\d+) photos par objet\.$/, { en: "Your plan allows $1 photos per item.", es: "Tu plan permite $1 fotos por objeto.", de: "Dein Tarif erlaubt $1 Fotos pro Artikel.", it: "Il tuo piano consente $1 foto per oggetto." }],
    [/^Jusqu’à (\d+) photos par objet avec ton offre\.$/, { en: "Up to $1 photos per item with your plan.", es: "Hasta $1 fotos por objeto con tu plan.", de: "Bis zu $1 Fotos pro Artikel mit deinem Tarif.", it: "Fino a $1 foto per oggetto con il tuo piano." }],
    [/^Jusqu’à (\d+) photos par objet avec ton offre\. Ultra : 8 photos\.$/, { en: "Up to $1 photos per item with your plan. Ultra: 8 photos.", es: "Hasta $1 fotos por objeto con tu plan. Ultra: 8 fotos.", de: "Bis zu $1 Fotos pro Artikel mit deinem Tarif. Ultra: 8 Fotos.", it: "Fino a $1 foto per oggetto con il tuo piano. Ultra: 8 foto." }],
    [/^Limite mensuelle atteinte \((\d+) annonces\)\. Passe à une offre supérieure pour continuer\.$/, { en: "Monthly limit reached ($1 listings). Upgrade your plan to continue.", es: "Límite mensual alcanzado ($1 anuncios). Pasa a un plan superior para seguir.", de: "Monatslimit erreicht ($1 Anzeigen). Wechsle zu einem höheren Tarif, um weiterzumachen.", it: "Limite mensile raggiunto ($1 annunci). Passa a un piano superiore per continuare." }],
    [/^Offre (.+)$/, { en: "$T1 plan", es: "Plan $T1", de: "Tarif $T1", it: "Piano $T1" }],
    [/^Annonce créée · (.+)$/, { en: "Listing created · $T1", es: "Anuncio creado · $T1", de: "Anzeige erstellt · $T1", it: "Annuncio creato · $T1" }],
    [/^(.+) · (\d+) – (\d+) € · (.+)$/, { en: "$T1 · €$2 – €$3 · $4", es: "$T1 · $2 – $3 € · $4", de: "$T1 · $2 – $3 € · $4", it: "$T1 · $2 – $3 € · $4" }],
    [/^(\d+) étoiles? sur 5$/, { en: "$1 out of 5 stars", es: "$1 de 5 estrellas", de: "$1 von 5 Sternen", it: "$1 stelle su 5" }],
    [/^(\d+) étoiles?$/, { en: "$1 star(s)", es: "$1 estrella(s)", de: "$1 Stern(e)", it: "$1 stella/e" }],
    [/^Photo (\d+)$/, { en: "Photo $1", es: "Foto $1", de: "Foto $1", it: "Foto $1" }],
    [/^(\d+) \/ (\d+)$/, null]
  ];

  var D = {};
  if (lang !== "fr") R.forEach(function (r) { D[r[0]] = r[IDX[lang]]; });

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  function look(k) {
    if (lang === "fr" || !k) return null;
    if (Object.prototype.hasOwnProperty.call(D, k)) return D[k];
    for (var i = 0; i < P.length; i++) {
      var m = P[i][0].exec(k);
      if (!m) continue;
      var rule = P[i][1] && P[i][1][lang];
      if (!rule) return null;
      if (typeof rule === "function") return rule(m);
      return rule.replace(/\$T(\d)/g, function (_, g) { return look(m[+g]) || m[+g]; }).replace(/\$(\d)/g, function (_, g) { return m[+g]; });
    }
    return null;
  }
  // T : traduit une phrase française (renvoie le français si aucune traduction)
  function T(s) {
    if (lang === "fr" || s == null) return s;
    var k = norm(String(s)), t = look(k);
    if (t == null) return s;
    var lead = /^\s*/.exec(s)[0], trail = /\s*$/.exec(s)[0];
    return lead + t + trail;
  }

  var done = new WeakMap();
  function skip(el) { return !el || el.closest("script,style,[data-noi18n],textarea,code,pre"); }
  function doText(n) {
    if (skip(n.parentElement)) return;
    var v = n.nodeValue;
    if (done.get(n) === v || !/[A-Za-zÀ-ÿ]/.test(v)) return;
    var t = T(v);
    if (t !== v) n.nodeValue = t;
    done.set(n, n.nodeValue);
  }
  var ATTRS = ["placeholder", "aria-label", "title"];
  function doEl(el) {
    if (skip(el)) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = el.getAttribute && el.getAttribute(ATTRS[i]);
      if (a) { var t = T(a); if (t !== a) el.setAttribute(ATTRS[i], t); }
    }
  }
  function apply(root) {
    if (lang === "fr") return;
    root = root || document.body;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doEl(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) doText(n);
    root.querySelectorAll && root.querySelectorAll("[placeholder],[aria-label],[title]").forEach(doEl);
  }
  function hero() {
    var h = document.querySelector(".hero h1"), L = HERO[lang];
    if (!h || !L) return;
    var i = 0, html = L.map(function (line, li) {
      return line.map(function (w) {
        var e = document.createElement("span"); e.textContent = w;
        return '<span class="w"><span' + (li ? ' class="gt"' : "") + ' style="--i:' + i++ + '">' + e.innerHTML + "</span></span>";
      }).join(" ");
    }).join("<br>");
    h.innerHTML = html;
  }
  function start() {
    document.documentElement.lang = lang;
    if (lang === "fr") return;
    hero();
    document.title = T(document.title);
    apply(document.body);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === "characterData") doText(m.target);
        else if (m.type === "attributes") doEl(m.target);
        else m.addedNodes.forEach(function (x) { apply(x); });
      });
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  window.I18N = {
    lang: lang, loc: LOCS[lang], langs: LANGS, T: T, start: start,
    set: function (l) { if (!LANGS[l] || l === lang) return; try { localStorage.setItem("declic_lang", l); } catch (e) {} location.reload(); }
  };
})();
