<template>
  <main class="battle-view">
    <template v-if="heroStore.winner">
      <h1 class="victory-message">Victoire de {{ heroStore.winner.name }} !</h1>
      <div v-if="heroStore.loser" class="loser-message">
        {{ heroStore.loser.name }} a été vaincu.
      </div>
      <div v-if="heroStore.combatLog.length" class="combat-log">
        <h2>Journal de combat</h2>
        <ul class="log-list">
          <li
            v-for="(line, i) in heroStore.combatLog"
            :key="i"
            class="log-line"
            :style="{ animationDelay: `${i}s` }"
          >
            {{ line }}
          </li>
        </ul>
      </div>
      <div class="actions">
        <v-btn color="primary" variant="flat" size="large" @click="replayDuel">
          Rejouer le duel
        </v-btn>
        <v-btn color="white" variant="outlined" size="large" @click="$router.push('/')">
          Retour à l'accueil
        </v-btn>
      </div>
    </template>
    <p v-else class="no-result">
      Aucun combat récent. <RouterLink to="/">Choisir des héros</RouterLink>
    </p>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHeroStore } from '@/stores/heroStore'

const heroStore = useHeroStore()

function replayDuel() {
  heroStore.runCombat()
}
</script>

<style scoped>
.battle-view {
  padding: 2rem;
  max-width: 640px;
  margin: 0 auto;
}
.victory-message {
  font-size: 1.75rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 0.5rem;
  color: var(--v-theme-primary);
}
.loser-message {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}
.combat-log {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  max-height: 40vh;
  overflow-y: auto;
}
.combat-log h2 {
  font-size: 1rem;
  margin: 0 0 0.75rem;
}
.log-list {
  margin: 0;
  padding-left: 1.25rem;
  list-style: none;
}
.log-line {
  margin-bottom: 0.35rem;
  opacity: 0;
  animation: log-line-in 0.5s ease-out forwards;
}

/* 1 seconde de délai entre chaque apparition */
@keyframes log-line-in {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.no-result {
  text-align: center;
  color: #666;
}
.no-result a {
  color: var(--v-theme-primary);
}
</style>
