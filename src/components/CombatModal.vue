<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card>
      <v-card-title>Combat</v-card-title>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false)
</script>
<style scoped>
</style>