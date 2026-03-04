<template>
  <v-dialog
    :model-value="modelValue"
    max-width="560"
    scrollable
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card class="history-modal-card">
      <v-card-title>Historique des combats</v-card-title>
      <v-divider />
      <v-card-text class="history-content">
        <p v-if="!heroStore.historyBattles.length" class="empty">
          Aucun combat enregistré.
        </p>
        <div
          v-else
          v-for="(battle, index) in heroStore.historyBattles"
          :key="battle.id ?? index"
          class="battle-row"
        >
          <div class="fighter winner">
            <v-img
              :src="battle.winner.image?.url"
              cover
              class="fighter-image"
            />
            <span class="fighter-name">{{ battle.winner.name }}</span>
          </div>
          <span class="vs">VS</span>
          <div class="fighter loser">
            <v-img
              :src="battle.loser.image?.url"
              cover
              class="fighter-image"
            />
            <span class="fighter-name">{{ battle.loser.name }}</span>
          </div>
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="flat" @click="$emit('update:modelValue', false)">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useHeroStore } from '@/stores/heroStore'

defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()

const heroStore = useHeroStore()
</script>

<style scoped>
/* Effet verre dépoli sur la modale historique */
:deep(.history-modal-card),
.history-modal-card {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

:deep(.history-modal-card .v-card-title),
:deep(.history-modal-card .v-card-text),
:deep(.history-modal-card .v-card-actions) {
  background: transparent !important;
  color: rgba(255, 255, 255, 0.95);
}

:deep(.history-modal-card .v-divider) {
  border-color: rgba(255, 255, 255, 0.2);
}

.history-content {
  max-height: 60vh;
  overflow-y: auto;
  padding: 1rem;
}
.empty {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  padding: 2rem;
}
.battle-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.battle-row:last-child {
  margin-bottom: 0;
}
.fighter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 8px;
  min-width: 100px;
}
.fighter.winner {
  background: rgba(76, 175, 80, 0.25);
  border: 2px solid rgba(76, 175, 80, 0.9);
}
.fighter.loser {
  background: rgba(244, 67, 54, 0.25);
  border: 2px solid rgba(244, 67, 54, 0.9);
}
.fighter-image {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
}
.fighter-name {
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  word-break: break-word;
}
.fighter.winner .fighter-name {
  color: rgba(129, 199, 132, 1);
}
.fighter.loser .fighter-name {
  color: rgba(239, 154, 154, 1);
}
.vs {
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
}
</style>