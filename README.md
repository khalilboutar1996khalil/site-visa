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

