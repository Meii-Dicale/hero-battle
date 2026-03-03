<template>
  <v-dialog :model-value="modelValue" max-width="700" persistent class="combat-dialog" @update:model-value="$emit('update:modelValue', $event)">
    <v-card class="combat-modal-card">
      <v-card-title class="text-center">Combat</v-card-title>
      <v-divider />
      <div v-if="heroStore.firstHero && heroStore.secondHero" class="combatants">
        <div class="fighter">
          <v-img
            :src="heroStore.firstHero.image?.url"
            cover
            class="fighter-image"
          />
          <h3 class="fighter-name">{{ heroStore.firstHero.name }}</h3>
          <StatsBar :stats="stats1" />
        </div>
        <span class="vs">VS</span>
        <div class="fighter">
          <v-img
            :src="heroStore.secondHero.image?.url"
            cover
            class="fighter-image"
          />
          <h3 class="fighter-name">{{ heroStore.secondHero.name }}</h3>
          <StatsBar :stats="stats2" />
        </div>
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="flat" @click="startCombat">
          Démarrer le combat
        </v-btn>
        <v-btn variant="text" @click="$emit('update:modelValue', false)">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHeroStore } from '@/stores/heroStore'
import { getBattleStats } from '@/utils/battleRules'
import StatsBar from './StatsBar.vue'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const router = useRouter()
const heroStore = useHeroStore()

const stats1 = computed(() =>
  heroStore.firstHero ? getBattleStats(heroStore.firstHero.powerstats) : null
)
const stats2 = computed(() =>
  heroStore.secondHero ? getBattleStats(heroStore.secondHero.powerstats) : null
)

function startCombat() {
  heroStore.runCombat()
  emit('update:modelValue', false)
  router.push('/battle')
}
</script>

<style scoped>
/* Effet verre dépoli sur la modale combat */
:deep(.combat-modal-card),
.combat-modal-card {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

:deep(.combat-modal-card .v-card-title),
:deep(.combat-modal-card .v-card-actions) {
  background: transparent !important;
  color: rgba(255, 255, 255, 0.95);
}

:deep(.combat-modal-card .v-divider) {
  border-color: rgba(255, 255, 255, 0.2);
}

.combatants {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem;
}
.fighter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  max-width: 240px;
}
.fighter-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
}
.fighter-name {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
}
.vs {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--v-theme-primary);
  align-self: center;
}
</style>