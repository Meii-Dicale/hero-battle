<template>
  <main class="best-hero-view">
    <v-btn variant="flat" color="primary" size="small" @click="$router.push('/')">
      Retour à l'accueil
    </v-btn>
    <h1 class="page-title">Classement des meilleurs héros</h1>
    <p v-if="ranking.length === 0" class="empty">
      Aucun combat joué. Les victoires apparaîtront ici après vos duels.
    </p>
    <div v-else class="ranking-list">
      <div
        v-for="(entry, index) in ranking"
        :key="entry.hero.id"
        class="ranking-row"
        :class="{ 'top-three': index < 3 }"
      >
        <span class="rank">#{{ index + 1 }}</span>
        <v-img
          v-if="entry.hero.image?.url"
          :src="entry.hero.image.url"
          cover
          class="hero-thumb"
        />
        <div class="hero-info">
          <span class="hero-name">{{ entry.hero.name }}</span>
          <span v-if="entry.hero.biography?.publisher" class="hero-publisher">
            {{ entry.hero.biography.publisher }}
          </span>
        </div>
        <span class="wins">{{ entry.wins }} victoire{{ entry.wins > 1 ? 's' : '' }}</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Hero } from '@/types/heroTypes'
import { useHeroStore } from '@/stores/heroStore'

const heroStore = useHeroStore()

/** Classement : héros avec au moins une victoire, triés par nombre de victoires (décroissant). */
const ranking = computed(() => {
  const winsById = new Map<number, { hero: Hero; wins: number }>()
  for (const battle of heroStore.historyBattles) {
    const w = battle.winner
    const current = winsById.get(w.id)
    if (current) {
      current.wins += 1
    } else {
      winsById.set(w.id, { hero: w, wins: 1 })
    }
  }
  return Array.from(winsById.values())
    .filter((e) => e.wins > 0)
    .sort((a, b) => b.wins - a.wins)
})
</script>

<style scoped>
.best-hero-view {
  padding: 2rem;
  padding-top: 4rem;
  max-height: 90vh;
  margin: 0 auto;
  max-width: 560px;
}
.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
  color: white;
  margin: 0 0 1.5rem;
}
.empty {
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
}
.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.ranking-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.ranking-row.top-three {
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.15);
}
.rank {
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  min-width: 2.5rem;
  font-size: 1.1rem;
}
.ranking-row.top-three .rank {
  color: #ffd700;
}
.hero-thumb {
  border-radius: 10px;
  flex-shrink: 0;
}
.hero-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.hero-name {
  font-weight: 600;
  color: white;
  font-size: 1rem;
}
.hero-publisher {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
}
.wins {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  white-space: nowrap;
}
</style>
