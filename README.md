# DocVisa Tunisie

Site vitrine one-page pour **DocVisa Tunisie**, un service d'accompagnement à la préparation de dossiers de visa (France, Italie, Espagne, Malte, Canada) pour des demandeurs basés en Tunisie.

Le site présente les services, le tarif, le déroulé de l'accompagnement, une FAQ, et surtout un **simulateur de dossier** : le visiteur choisit sa destination, son type de visa et son profil, puis le site génère un résumé qu'il peut envoyer directement sur WhatsApp — sans aucun formulaire côté serveur.

## Fonctionnalités

- **Simulateur de dossier** : sélection destination / type de visa / profil professionnel → résumé pré-rempli ouvert dans WhatsApp (`wa.me`).
- **Bilingue FR / AR** : le français est écrit en dur dans le HTML, l'arabe est injecté dynamiquement par `script.js` (dictionnaire `I18N_AR`) avec bascule du sens de lecture (RTL).
- **Mode clair / sombre** persistant (préférence enregistrée côté navigateur).
- **Page loader** animé à l'ouverture du site.
- **Bannière vidéo** de présentation en en-tête + modale vidéo dans le hero.
- **Cartes "tampons de visa"** par pays avec drapeaux dessinés en SVG.
- Site 100% statique, sans dépendance de build ni backend.

## Structure du projet

```
index.html    Structure de la page (une seule page, sections ancrées)
styles.css    Mise en forme, thèmes clair/sombre, responsive
script.js     i18n FR/AR, thème, simulateur, envoi WhatsApp, interactions UI
docvisa-video-presentation.mp4   Vidéo affichée en bannière et dans la modale
docvisa-video-bienvenue.mp4      Vidéo d'accueil
```

## Lancer le site en local

Aucune installation n'est nécessaire, il suffit d'ouvrir `index.html` dans un navigateur, ou de servir le dossier avec un petit serveur statique, par exemple :

```bash
npx serve .
```

## Personnalisation

- **Numéro WhatsApp** : constante `WHATSAPP_NUMBER` dans `script.js`, utilisée pour les liens `wa.me`.
- **Textes en arabe** : dictionnaire `I18N_AR` dans `script.js` (le français reste la langue de référence, directement dans `index.html`).
- **Destinations / drapeaux** : section `#destSlider` et cartes `.stamp` dans `index.html` (drapeaux en SVG inline).
