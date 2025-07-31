<template>
  <v-app :theme="theme">
    <v-app-bar app color="primary">
      <v-toolbar-title>Vue Blog</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="authStore.isAuthenticated">
        <UserCreateDialog />
      </div>

      <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="px-10 fill-height">
            <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import UserCreateDialog from '@/components/user/UserCreateDialog.vue'

const authStore = useAuthStore()
const theme = ref('light')


function onClick () {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

</script>

<style scoped>
@import '@mdi/font/css/materialdesignicons.min.css';
</style>
