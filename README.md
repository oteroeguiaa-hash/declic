# Déclic

Site « photo → annonce » pour Vinted et eBay.

## Comment c'est construit

| Élément | Rôle |
|---|---|
| `index.html` | Le site (HTML, CSS, JS). N'affiche que ce que le serveur lui dit : il ne décide ni de l'offre, ni du quota. |
| `api/analyze.js` | Analyse des photos par Claude. Vérifie le compte, l'offre, le nombre de photos et le quota **avant** d'appeler l'IA. Rend le crédit si l'analyse échoue. |
| `api/me.js` | Infos du compte connecté (offre, compteur du mois). |
| `api/checkout.js` | Ouvre le paiement Stripe, ou l'espace client Stripe pour changer d'offre / résilier / voir les factures. |
| `api/stripe-webhook.js` | Seul endroit où l'offre d'un compte change, sur confirmation signée de Stripe. |
| `api/reviews-admin.js` | Validation des avis clients (réservée à `ADMIN_EMAILS`). |
| `api/delete-account.js` | Suppression du compte et de toutes ses données (RGPD). |
| `api/translate.js` | Traduction d'une annonce en anglais, espagnol, allemand ou italien (offres payantes). |
| `i18n.js` | Traductions du site (FR, EN, ES, DE, IT). |
| `supabase/schema.sql` | Tables, règles de sécurité (RLS) et fonctions de la base. |

- **Comptes** : Supabase, connexion par lien reçu par e-mail (sans mot de passe).
- **Abonnements** : Stripe Checkout et webhook.
- **Analyse** : Sonnet 5.5 pour Gratuit et Pro, Opus 5.5 pour Ultra. Si le modèle décline une demande, l'API la relance automatiquement sur un modèle de secours (`fallbacks: "default"`).

## Offres (définies dans `api/_lib.js`)

| Offre | Prix | Analyses / mois | Photos | eBay + mots-clés | Modèle |
|---|---|---|---|---|---|
| Gratuit | 0 € | 5 | 2 | non | Sonnet 5.5 |
| Pro | 11,99 € | 60 | 4 | oui | Sonnet 5.5 |
| Ultra | 18,99 € | « illimité » (plafond anti-abus `ULTRA_MONTHLY_CAP`, 300 par défaut) | 8 | oui | Opus 5.5 |

## Mise en ligne, étape par étape

### 1. Supabase (comptes et base de données)
1. Crée un projet sur [supabase.com](https://supabase.com) (région : Europe).
2. **SQL Editor** → New query → colle le contenu de `supabase/schema.sql` → **Run**.
   - Projet déjà créé avant le suivi des ventes ? Exécute aussi `supabase/002_ventes.sql` (une seule fois).
3. **Authentication → URL Configuration** : *Site URL* = l'adresse de ton site (ex. `https://declic.fr`), et ajoute-la dans *Redirect URLs*.
4. **Authentication → Emails → SMTP Settings** : branche un vrai service d'envoi d'e-mails (Resend, Brevo, Postmark…). **Indispensable** : sans ça, Supabase n'envoie que quelques e-mails par heure et seulement aux membres de ton équipe.
5. (Conseillé) Traduis le modèle d'e-mail « Magic Link » en français dans **Authentication → Emails → Templates**.
6. **Project Settings → API** : note `Project URL`, la clé `anon` et la clé `service_role`.

### 2. Stripe (paiements)
1. **Product catalog** : crée deux produits avec un prix **mensuel récurrent** : « Déclic Pro » à 11,99 € et « Déclic Ultra » à 18,99 €. Note les deux identifiants `price_…`.
2. **Settings → Billing → Customer portal** : active-le, autorise la résiliation et le changement d'offre entre Pro et Ultra.
3. **Developers → Webhooks** → Add endpoint :
   - URL : `https://ton-domaine/api/stripe-webhook`
   - Événements : `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Note le *Signing secret* `whsec_…`.
4. Teste d'abord en **mode test** (clés `sk_test_…`, carte `4242 4242 4242 4242`), puis refais ces étapes en mode live.

### 3. Anthropic
Crée une clé API sur [platform.claude.com](https://platform.claude.com) et fixe une limite de dépense mensuelle.

### 4. Vercel (hébergement)
1. Importe ce dépôt GitHub sur [vercel.com](https://vercel.com).
2. **Settings → Environment Variables** : renseigne toutes les variables de `.env.example`.
3. Déploie, puis branche ton nom de domaine.

### 5. Vérification finale
- Crée un compte avec ton e-mail, fais une analyse : le compteur passe à 1 sur 5.
- Prends l'offre Pro en mode test : elle s'active quelques secondes après le paiement.
- Résilie depuis Profil → Abonnement → « Gérer mon abonnement » : retour en Gratuit.
- Dépose un avis : il apparaît dans « Avis à valider » quand tu es connecté avec une adresse de `ADMIN_EMAILS`.

## Reste à faire de ton côté
- **Pages légales** : mentions légales, politique de confidentialité et CGV sont obligatoires en France pour vendre un abonnement. Le pied de page affiche les liens mais les pages n'existent pas encore. Elles doivent contenir tes informations (statut, SIRET, adresse…).
- **Rentabilité d'Ultra** : une analyse Opus avec 8 photos coûte environ 0,10 €. À 18,99 €, l'offre reste rentable jusqu'à environ 150 analyses par mois et par abonné. Ajuste `ULTRA_MONTHLY_CAP` ou le prix si besoin.
- **Comptes gratuits multiples** : une personne peut créer plusieurs comptes avec plusieurs e-mails pour cumuler les 5 analyses gratuites. Le coût est limité (environ 0,03 € par analyse), mais tu peux réduire l'offre gratuite si ça arrive.
