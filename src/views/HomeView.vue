

<template>
  <main class="home-main">
    <StatisticsBattle />
    <div v-if="heroStore.loading" class="loading">
      <v-progress-circular indeterminate color="white" />
      <p>Chargement des héros...</p>
    </div>
    <template v-else>
      <div class="hero-grid mt-10">
        <v-card
          v-for="hero in heroStore.heroes"
          :key="hero.id"
          class="hero-card"
        >
          <div class="hero-card-clickable  " @click="selectedHero = hero">
            <v-card-title>
              <h2>{{ hero.name }}</h2>
            </v-card-title>
            <v-img v-if="hero.image?.url" :src="hero.image.url" cover />
          </div>
          <v-card-actions class="hero-actions">
            <v-btn size="small" variant="flat" color="primary" @click="heroStore.setFirstHero(hero)">
              J1
            </v-btn>
            <v-btn size="small" variant="flat" color="secondary" @click="heroStore.setSecondHero(hero)">
              J2
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div ref="sentinelRef" class="sentinel" aria-hidden="true" />
      <div v-if="heroStore.loadingMore" class="loading-more">
        <v-progress-circular indeterminate color="white" />
        <span>Chargement des héros suivants...</span>
      </div>
      <p v-else-if="heroStore.heroes.length > 0 && !heroStore.hasMore" class="end-message">
        Tous les héros sont chargés.
      </p>
    </template>
    <HeroDetailModal :hero="selectedHero" @close="selectedHero = null" />
    <StickyHeroBar />
  </main>
</template>

<script setup lang="ts">
import type { Hero } from '@/types/heroTypes'
import HeroDetailModal from '@/components/HeroDetailModal.vue'
import StatisticsBattle from '@/components/StatisticsBattle.vue'
import StickyHeroBar from '@/components/StickyHeroBar.vue'
import { useHeroStore } from '@/stores/heroStore'
import { onMounted, ref, watch } from 'vue'

const heroStore = useHeroStore()
const sentinelRef = ref<HTMLElement | null>(null)
const selectedHero = ref<Hero | null>(null)

onMounted(async () => {
  if (heroStore.heroes.length === 0) {
    await heroStore.getHeroes()
  }
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry?.isIntersecting && heroStore.hasMore && !heroStore.loadingMore) {
        heroStore.loadMoreHeroes()
      }
    },
    { rootMargin: '200px', threshold: 0 }
  )
  watch(
    sentinelRef,
    (el, _oldEl, onCleanup) => {
      if (el) observer.observe(el)
      onCleanup(() => {
        if (el) observer.unobserve(el)
      })
    },
    { immediate: true }
  )
})
</script>

<style scoped>
.home-main {
  padding-top: 56px;
  padding-bottom: 120px;
  min-height: 100vh;
}
.hero-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 1rem;
  padding: 1rem 0;
}
/* Effet verre dépoli : pas de hover Vuetify (conflit avec backdrop-filter = clignotement) */
.hero-card {
  min-height: 0;
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateZ(0);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.hero-card:hover {
  border-color: rgba(255, 255, 255, 0.45);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}
/* Désactiver le hover par défaut de Vuetify sur la carte */
.hero-card :deep(.v-card__underlay) {
  display: none;
}
.hero-card-clickable {
  cursor: pointer;
}
.hero-actions {
  padding: 0.5rem;
  gap: 0.5rem;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.hero-card :deep(.v-card-title) {
  font-size: 0.9rem;
  padding: 0.5rem;
  word-break: break-word;
  color: white;
  background: transparent !important;
}
.hero-card :deep(.v-img) {
  aspect-ratio: 1;
}
.loading,
.loading-more,
.end-message {
  text-align: center;
  padding: 1rem;
}
.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.sentinel {
  height: 1px;
  visibility: hidden;
  pointer-events: none;
}
</style>