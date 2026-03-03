<template>
  <v-dialog
    :model-value="modelValue"
    max-width="560"
    persistent
    scrollable
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card>
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
.history-content {
  max-height: 60vh;
  overflow-y: auto;
  padding: 1rem;
}
.empty {
  text-align: center;
  color: #666;
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
  background: #f5f5f5;
  border-radius: 8px;
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
  background: rgba(76, 175, 80, 0.2);
  border: 2px solid rgb(76, 175, 80);
}
.fighter.loser {
  background: rgba(244, 67, 54, 0.2);
  border: 2px solid rgb(244, 67, 54);
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
  color: #2e7d32;
}
.fighter.loser .fighter-name {
  color: #c62828;
}
.vs {
  font-size: 1rem;
  font-weight: 700;
  color: #666;
}
</style>