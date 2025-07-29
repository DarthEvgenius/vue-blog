<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Vue Blog</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="authStore.isAuthenticated">
        Привет, {{ authStore.username }}

        <v-btn @click="authStore.logout()" class="ml-4">
          Выйти
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fluid class="pa-0 ma-0 fill-height">
            <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<style scoped>
@import '@mdi/font/css/materialdesignicons.min.css';

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
