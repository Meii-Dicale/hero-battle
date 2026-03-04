<template>
  <div class="sticky-hero-bar">
    <template v-if="!heroStore.firstHero && !heroStore.secondHero">
      <p class="placeholder">Veuillez sélectionner vos héros</p>
    </template>
    <template v-else>
      <div class="slot slot-first">
        <template v-if="heroStore.firstHero">
          <div class="hero-preview">
            <v-img
              :src="heroStore.firstHero.image?.url"
              cover
              class="hero-image"
            />
            <span class="hero-name">{{ heroStore.firstHero.name }}</span>
          </div>
          <v-btn
            icon
            variant="text"
            color="error"
            size="small"
            aria-label="Retirer le héros 1"
            @click="heroStore.clearFirstHero()"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            color="green"
            size="small"
            :loading="heroStore.loadingRandom"
            :disabled="heroStore.loadingRandom"
            @click="heroStore.getRandomHero('first')"
          >
            <v-icon>mdi-dice-6-outline</v-icon>
          </v-btn>
        </template>
        <p v-else class="slot-placeholder">Héros 1</p>
      </div>
      <span class="vs">VS</span>
      <div class="slot slot-second">
        <template v-if="heroStore.secondHero">
          <div class="hero-preview">
            <v-img
              :src="heroStore.secondHero.image?.url"
              cover
              class="hero-image"
            />
            <span class="hero-name">{{ heroStore.secondHero.name }}</span>
          </div>
          <v-btn
            icon
            variant="text"
            color="error"
            size="small"
            aria-label="Retirer le héros 2"
            @click="heroStore.clearSecondHero()"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            color="green"
            size="small"
            :loading="heroStore.loadingRandom"
            :disabled="heroStore.loadingRandom"
            @click="heroStore.getRandomHero('second')"
          >
            <v-icon>mdi-dice-6-outline</v-icon>
          </v-btn>
        </template>
        <p v-else class="slot-placeholder">Héros 2</p>
      </div>
      <v-btn
        v-if="heroStore.firstHero && heroStore.secondHero"
        color="primary"
        variant="flat"
        @click="showCombatModal = true"
      >
        Lancer le combat
      </v-btn>
    </template>
    <CombatModal v-model="showCombatModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CombatModal from '@/components/CombatModal.vue'
import { useHeroStore } from '@/stores/heroStore'

const heroStore = useHeroStore()
const showCombatModal = ref(false)
</script>

<style scoped>
/* Effet verre dépoli */
.sticky-hero-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  color: white;
}

.placeholder {
  margin: 0;
  color: white;
  font-size: 1rem;
}

.slot {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 160px;
}

.hero-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.hero-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
}

.hero-name {
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slot-placeholder {
  margin: 0;
  color: white;
  font-size: 0.9rem;
}

.vs {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--v-theme-primary);
  letter-spacing: 0.1em;
}
</style>