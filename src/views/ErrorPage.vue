<template>
  <main class="error-page">
    <div class="error-content">
      <span class="error-code">404</span>
      <h1 class="error-title">Perdus dans l’espace !</h1>
      <p class="error-message">
        Cette page s’est envolée vers une autre galaxie. Même les Gardiens de la Galaxie ne l’ont pas trouvée.
      </p>
      <p class="error-sub">
        Pas de panique : utilise la Force (ou le lien ci-dessous) pour revenir au combat.
      </p>
      <RouterLink to="/" class="back-link">
        Retour à l’accueil
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.error-page {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(10, 10, 30, 0.316) 0%, rgba(30, 20, 50, 0.9) 100%);
}
.error-content {
  text-align: center;
  max-width: 420px;
}
.error-code {
  display: block;
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  color: rgba(255, 255, 255, 0.15);
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.error-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem;
}
.error-message {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin: 0 0 0.75rem;
}
.error-sub {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  margin: 0 0 1.5rem;
}
.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background 0.2s, transform 0.2s;
}
.back-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.02);
}
</style>
