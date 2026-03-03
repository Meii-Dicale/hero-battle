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
/* Effet verre dépoli */
.statistics-battle {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  color: white;
}
</style>