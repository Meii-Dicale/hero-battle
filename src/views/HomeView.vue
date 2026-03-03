

<template>
  <main>
    <StatisticsBattle />
    <div v-if="heroStore.loading" class="loading">
      <p>Chargement des héros...</p>
    </div>
    <template v-else>
      <div class="hero-grid">
        <v-card
          v-for="hero in heroStore.heroes"
          :key="hero.id"
          class="hero-card"
          hover
        >
          <v-card-title>
            <h2>{{ hero.name }}</h2>
          </v-card-title>
          <v-img v-if="hero.image?.url" :src="hero.image.url" cover />
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
        <v-progress-circular indeterminate color="primary" />
        <span>Chargement des héros suivants...</span>
      </div>
      <p v-else-if="heroStore.heroes.length > 0 && !heroStore.hasMore" class="end-message">
        Tous les héros sont chargés.
      </p>
    </template>
    <StickyHeroBar />
  </main>
</template>

<script setup lang="ts">
import StatisticsBattle from '@/components/StatisticsBattle.vue'
import StickyHeroBar from '@/components/StickyHeroBar.vue'
import { useHeroStore } from '@/stores/heroStore'
import { onMounted, ref, watch } from 'vue'

const heroStore = useHeroStore()
const sentinelRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await heroStore.getHeroes()
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
.hero-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 1rem;
  padding: 1rem 0;
}
.hero-card {
  min-height: 0;
}
.hero-actions {
  padding: 0.5rem;
  gap: 0.5rem;
  justify-content: center;
}
.hero-card :deep(.v-card-title) {
  font-size: 0.9rem;
  padding: 0.5rem;
  word-break: break-word;
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