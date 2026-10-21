# table. — Version 2 (prototype fonctionnel)

Application francophone québécoise de planification des repas, budget d'épicerie et liste par rayon. Projet autonome sans compilation ni compte obligatoire.

## Lancer l'application

- Ouvrir `index.html` dans un navigateur moderne, ou héberger tout le contenu sur GitHub Pages (recommandé).
- Pour tester facilement sur iPhone, utiliser `table-v2-demo.html` (fichier autonome joint séparément), ou une adresse web publiée.
- Les menus, les préférences et les cases cochées sont sauvegardés dans `localStorage` du navigateur.
- On peut ajouter le site à l'écran d'accueil sur mobile lorsque déployé en HTTPS.

## Parcours

1. **Épicerie en premier** : Maxi, Super C, IGA, Metro, Provigo ou Walmart.
2. Foyer, budget et choix des repas à planifier.
3. Objectif (santé générale, prise de masse, perte de gras ou végétarien), cible de protéines, allergies, exclusions et temps disponible.
4. Menu hebdomadaire, recettes avec étapes, changement de recette, liste par rayon, suivi du budget et optimisation.
5. Paramètres modifiables sans perdre tout l'historique; régénération à la demande.

## Prix et API

Le système possède une connexion en lecture seule à l'API publique `https://epiceries.ca/api` (documentation : `https://www.epiceries.ca/developers`). La source annonce des en-têtes CORS ouverts et des données sur six enseignes, les rabais et l'historique. Aucune clé n'est nécessaire au stade actuel.

- L'application tente de rechercher un produit correspondant, puis vérifie sa disponibilité et son prix dans l'enseigne choisie. Pour ne pas présenter de mauvaises correspondances comme des relevés, elle rejette les formats incompatibles et les relevés anciens.
- Les données sont mises en cache sur l'appareil afin d'éviter des requêtes inutiles; les appels sont espacés.
- Lorsqu'aucun relevé compatible n'est trouvé, on conserve un prix *estimé*, clairement indiqué.
- Les montants calculent **les emballages entiers**, pas seulement le gramme utilisé dans les recettes.
- Les prix sont **indicatifs par enseigne**, non adaptés à une succursale précise. Les prix doivent être confirmés en magasin; taxes/frais éventuels non calculés.
- Les relevés et historiques proviennent d'un service tiers indépendant : **épiceries.ca**, non affilié à cette application.

**Limite importante** : Le fonctionnement de l'intégration a été programmé selon la documentation publique mais n'a pas pu être testé contre une vraie réponse Internet dans l'environnement de développement. Les écrans et les calculs ont été testés dans Chromium en local. Des essais réels en ligne et une validation des correspondances de produits sont nécessaires avant de lancer le service à d'autres utilisateurs.

## Nutrition et sécurité alimentaire

Les valeurs de protéines et calories sont des estimations intégrées manuellement pour illustrer les fonctionnalités, non certifiées. L'application indique lorsqu'une cible de protéines n'est pas atteinte et lorsqu'un budget est dépassé. Les recettes n'ont pas été vérifiées par un diététiste. L'exclusion d'allergènes se fait via une table d'ingrédients et ne garantit pas l'absence de traces / contamination croisée : vérifier les étiquettes, les préparations et les fournisseurs.

## Architecture

- `index.html`: squelette de l'application.
- `styles.css`: interface responsive sans illustrations.
- `data.js`: catalogue local d'ingrédients et recettes.
- `app.js`: état, menus, budget, liste, prix, interactions.
- `sw.js`: cache des fichiers statiques pour un usage hors connexion après installation.
- `manifest.webmanifest` / `favicon.svg`: installation sur mobile.

Données locales sans serveur. Pour une future version grand public, on prévoira comptes, synchronisation, authentification, journal des prix, vérification qualité des produits et éventuellement source contractuelle de tarifs par succursale.

## Mise en ligne GitHub Pages

Créer un dépôt GitHub distinct (par exemple `table-epicerie`) sur le compte souhaité, puis placer ces fichiers à la racine de la branche `main`. Dans **Settings → Pages**, choisir **Deploy from a branch → main / root**. L'URL de test ressemblera alors à `https://nomiacafe-byte.github.io/table-epicerie/`.

Le dépôt Noviaclub existant n'est pas modifié.