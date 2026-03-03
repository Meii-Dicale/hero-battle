<template>
  <div class="statistics-battle">
    <span>Nombre de combats : {{ heroStore.historyBattles.length }}</span>
    <v-btn variant="outlined" size="small" @click="heroStore.clearHistoryBattles()">
      Effacer les combats
    </v-btn>
    <v-btn variant="flat" color="primary" size="small" @click="showHistoryModal = true">
      Historique
    </v-btn>
    <HistoryBattleModale v-model="showHistoryModal" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import HistoryBattleModale from '@/components/HistoryBattleModale.vue'
import { useHeroStore } from '@/stores/heroStore'

const heroStore = useHeroStore()
const showHistoryModal = ref(false)
</script>
<style scoped>
.statistics-battle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.75rem;
  padding: 0.75rem;
}
</style>