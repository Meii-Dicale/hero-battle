# Hero Battle

Application de combat de héros (Vue 3 + Vite + Vuetify). Choisissez deux héros, lancez le duel et consultez l’historique des combats.

---

## Installation et lancement

### Prérequis

- **Node.js** : `^20.19.0` ou `>=22.12.0` (voir `package.json` → `engines`)

### Installation des dépendances

```sh
npm install
```

### Lancer l’application en développement

```sh
npm run dev
```

L’application est disponible (par défaut) sur `http://localhost:5173`.

### Autres commandes

| Commande | Description |
|----------|-------------|
| `npm run build` | Vérification TypeScript + build de production |
| `npm run preview` | Prévisualisation du build (`dist/`) |
| `npm run type-check` | Vérification des types uniquement |
| `npm run format` | Formatage du code avec Prettier |

---

## Règles de combat

Le combat est **tour par tour**. Les statistiques de combat sont calculées à partir des **powerstats** de l’API (intelligence, strength, speed, durability, power, combat). Les formules sont dans `src/utils/battleRules.ts`.

### Calcul des stats (HP, attaque, défense, vitesse)

| Stat | Formule | Description |
|------|--------|-------------|
| **HP max** | `50 + durability × 2` | Points de vie en début de combat. |
| **Attaque** | `strength + ⌊power / 2⌋` | Puissance d’attaque. |
| **Défense** | `⌊(durability + combat) / 2⌋` | Réduction des dégâts subis. |
| **Vitesse** | `speed` | Utilisée pour l’initiative (qui commence). |

### Qui commence ?

- Le héros qui a la **vitesse la plus élevée** attaque en premier.
- En cas d’**égalité**, le premier héros choisi (J1) commence.

### Dégâts par tour

À chaque tour :

1. Un héros est **attaquant**, l’autre **défenseur**.
2. **Dégâts infligés** :  
   `dégâts = max(1, attaque_attaquant − défense_défenseur / 2)`  
   (valeur entière, minimum 1).
3. Les HP du défenseur sont diminués de ce montant.
4. Les rôles attaquant / défenseur sont échangés au tour suivant.

Le combat s’arrête quand un héros atteint **0 HP ou moins**. Le store enregistre le **vainqueur** et le **perdant**, et ajoute le combat à l’**historique**.

---

## Architecture

### Vue Router (`src/router/index.ts`)

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | `HomeView` | Grille de héros (chargement par lots), sélection J1/J2, modale détail, barre fixe. |
| `/battle` | `BattleView` | Résultat du combat (vainqueur, journal de combat), bouton « Rejouer le duel ». |

### Pinia – Store `hero` (`src/stores/heroStore.ts`)

**État :**

- `heroes` : liste des héros chargés (par lots de 30).
- `firstHero`, `secondHero` : héros sélectionnés pour le duel.
- `winner`, `loser` : résultat du dernier combat.
- `combatLog` : journal des coups (phrases par tour).
- `historyBattles` : historique des combats (pour la modale Historique).
- `loading`, `loadingMore`, `nextOffset`, `hasMore` : chargement et pagination.

**Actions principales :**

- `getHeroes()` : charge les 30 premiers héros (réinitialise la liste).
- `loadMoreHeroes()` : charge les 30 suivants (infinite scroll).
- `setFirstHero(hero)` / `setSecondHero(hero)` : assigne J1 / J2.
- `clearFirstHero()` / `clearSecondHero()` : retire le héros du slot.
- `runCombat()` : exécute le duel tour par tour, met à jour `winner`, `loser`, `combatLog`, et pousse dans `historyBattles`.
- `clearHistoryBattles()` : vide l’historique.

**Un seul store** ; pas d’autre store Pinia dans le projet.

### Composants principaux

- **StickyHeroBar** : barre fixe en bas (slots J1/J2, bouton « Lancer le combat »).
- **StatisticsBattle** : barre en haut (nombre de combats, boutons Effacer / Historique).
- **CombatModal** : modale avant combat (présentation des deux héros, bouton « Démarrer le combat »).
- **HistoryBattleModale** : modale scrollable listant l’historique (gagnant en vert, perdant en rouge).
- **HeroDetailModal** : modale détail d’un héros (stats, biographie, apparence, etc.).
- **StatsBar** : affichage des stats de combat (HP max, Attaque, Défense, Vitesse).

---

## Configuration du token SuperHero API

L’API [SuperHero API](https://superheroapi.com/) nécessite une clé d’accès. Le projet lit la variable d’environnement **`VITE_SUPERHERO_TOKEN`** (Vite n’expose que les variables préfixées par `VITE_` au client).

### Étapes

1. Créer un fichier **`.env`** à la **racine du projet** (à côté de `package.json`).
2. Y ajouter une ligne (en remplaçant par votre clé) :

   ```
   VITE_SUPERHERO_TOKEN=votre_cle_api_ici
   ```

3. Redémarrer le serveur de dev (`npm run dev`) après toute modification de `.env`.

Pour obtenir une clé : se connecter sur [superheroapi.com](https://superheroapi.com/) (par exemple via GitHub) et générer un access token.

**Sécurité :** ne commitez pas le fichier `.env` (il doit être listé dans `.gitignore`). En production, configurer la variable d’environnement côté hébergeur.

---

## Stack technique

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 7**
- **Vue Router 5**
- **Pinia** (store unique `hero`)
- **Vuetify 4**
- **TypeScript**
- **SuperHero API** (données héros)
