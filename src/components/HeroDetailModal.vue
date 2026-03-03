<template>
  <v-dialog
    :model-value="!!hero"
    max-width="560"
    scrollable
    class="hero-detail-dialog"
    @update:model-value="(val) => { if (!val) $emit('close') }"
  >
    <v-card v-if="hero" class="hero-detail-card">
      <v-card-title class="d-flex align-center justify-space-between gap-2">
        <v-img
          v-if="hero.image?.url"
          :src="hero.image.url"
          cover
          class="hero-avatar"
        />
        <span>{{ hero.name }}</span>
      </v-card-title>
      <v-divider />
      <v-card-text class="detail-content">
        <section v-if="hero.powerstats" class="detail-section">
          <h3>Statistiques</h3>
          <v-table density="compact" class="stats-table">
            <tbody>
              <tr>
                <td>Intelligence</td>
                <td>{{ hero.powerstats.intelligence }}</td>
              </tr>
              <tr>
                <td>Force</td>
                <td>{{ hero.powerstats.strength }}</td>
              </tr>
              <tr>
                <td>Vitesse</td>
                <td>{{ hero.powerstats.speed }}</td>
              </tr>
              <tr>
                <td>Durabilité</td>
                <td>{{ hero.powerstats.durability }}</td>
              </tr>
              <tr>
                <td>Puissance</td>
                <td>{{ hero.powerstats.power }}</td>
              </tr>
              <tr>
                <td>Combat</td>
                <td>{{ hero.powerstats.combat }}</td>
              </tr>
            </tbody>
          </v-table>
        </section>

        <section v-if="hero.biography" class="detail-section">
          <h3>Biographie / Origine</h3>
          <dl class="detail-dl">
            <template v-if="hero.biography['full-name']">
              <dt>Nom complet</dt>
              <dd>{{ hero.biography['full-name'] }}</dd>
            </template>
            <template v-if="hero.biography['place-of-birth']">
              <dt>Lieu de naissance</dt>
              <dd>{{ hero.biography['place-of-birth'] }}</dd>
            </template>
            <template v-if="hero.biography.publisher">
              <dt>Éditeur</dt>
              <dd>{{ hero.biography.publisher }}</dd>
            </template>
            <template v-if="hero.biography.alignment">
              <dt>Alignement</dt>
              <dd>{{ hero.biography.alignment }}</dd>
            </template>
            <template v-if="hero.biography['first-appearance']">
              <dt>Première apparition</dt>
              <dd>{{ hero.biography['first-appearance'] }}</dd>
            </template>
            <template v-if="hero.biography.aliases?.length">
              <dt>Alias</dt>
              <dd>{{ hero.biography.aliases.join(', ') }}</dd>
            </template>
          </dl>
        </section>

        <section v-if="hero.appearance" class="detail-section">
          <h3>Apparence</h3>
          <dl class="detail-dl">
            <template v-if="hero.appearance.gender">
              <dt>Genre</dt>
              <dd>{{ hero.appearance.gender }}</dd>
            </template>
            <template v-if="hero.appearance.race">
              <dt>Race</dt>
              <dd>{{ hero.appearance.race }}</dd>
            </template>
            <template v-if="hero.appearance.height?.length">
              <dt>Taille</dt>
              <dd>{{ hero.appearance.height.join(' / ') }}</dd>
            </template>
            <template v-if="hero.appearance.weight?.length">
              <dt>Poids</dt>
              <dd>{{ hero.appearance.weight.join(' / ') }}</dd>
            </template>
            <template v-if="hero.appearance['eye-color']">
              <dt>Couleur des yeux</dt>
              <dd>{{ hero.appearance['eye-color'] }}</dd>
            </template>
            <template v-if="hero.appearance['hair-color']">
              <dt>Couleur des cheveux</dt>
              <dd>{{ hero.appearance['hair-color'] }}</dd>
            </template>
          </dl>
        </section>

        <section v-if="hero.work && (hero.work.occupation || hero.work.base)" class="detail-section">
          <h3>Travail</h3>
          <dl class="detail-dl">
            <template v-if="hero.work.occupation">
              <dt>Occupation</dt>
              <dd>{{ hero.work.occupation }}</dd>
            </template>
            <template v-if="hero.work.base">
              <dt>Base</dt>
              <dd>{{ hero.work.base }}</dd>
            </template>
          </dl>
        </section>

        <section v-if="hero.connections && (hero.connections['group-affiliation'] || hero.connections.relatives)" class="detail-section">
          <h3>Connexions</h3>
          <dl class="detail-dl">
            <template v-if="hero.connections['group-affiliation']">
              <dt>Groupe d'affiliation</dt>
              <dd>{{ hero.connections['group-affiliation'] }}</dd>
            </template>
            <template v-if="hero.connections.relatives">
              <dt>Proches</dt>
              <dd>{{ hero.connections.relatives }}</dd>
            </template>
          </dl>
        </section>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="flat" @click="$emit('close')">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Hero } from '@/types/heroTypes'

defineProps<{ hero: Hero | null }>()
defineEmits<{ close: [] }>()
</script>

<style scoped>
/* Effet verre dépoli sur la modale */
:deep(.hero-detail-card),
.hero-detail-card {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

:deep(.hero-detail-card .v-card-title),
:deep(.hero-detail-card .v-card-text),
:deep(.hero-detail-card .v-card-actions) {
  background: transparent !important;
  color: rgba(255, 255, 255, 0.95);
}

:deep(.hero-detail-card .v-divider) {
  border-color: rgba(255, 255, 255, 0.2);
}

.detail-content {
  max-height: 65vh;
  overflow-y: auto;
}
.hero-avatar {
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 8px;
  flex-shrink: 0;
}
.detail-section {
  margin-bottom: 1.25rem;
}
.detail-section:last-child {
  margin-bottom: 0;
}
.detail-section h3 {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: rgba(255, 255, 255, 0.95);
}
.stats-table {
  font-size: 0.9rem;
}
.detail-dl {
  margin: 0;
  font-size: 0.9rem;
}
.detail-dl dt {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 0.35rem;
}
.detail-dl dt:first-child {
  margin-top: 0;
}
.detail-dl dd {
  margin: 0.15rem 0 0;
  padding-left: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

:deep(.hero-detail-card .v-table),
:deep(.hero-detail-card .v-table td) {
  background: transparent !important;
  color: rgba(255, 255, 255, 0.9);
}
</style>
