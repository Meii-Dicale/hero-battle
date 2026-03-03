<template>
  <div v-if="stats" class="stats-block">
    <div class="stat">
      <span class="stat-label">HP max</span>
      <span class="stat-value">{{ stats.hpMax }}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Attaque</span>
      <span class="stat-value">{{ stats.attaque }}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Défense</span>
      <span class="stat-value">{{ stats.defense }}</span>
    </div>
    <div class="stat">
      <span class="stat-label">Vitesse</span>
      <span class="stat-value">{{ stats.vitesse }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BattleStats } from '@/utils/battleRules'

defineProps<{ stats: BattleStats | null }>()
</script>

<style scoped>
.stats-block {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: center;
  width: 100%;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 56px;
}
.stat-label {
  font-size: 0.7rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stat-value {
  font-size: 1rem;
  font-weight: 700;
}
</style>
