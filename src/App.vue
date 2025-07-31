<template>
  <v-app :theme="theme">
    <v-app-bar app color="primary">
      <v-toolbar-title>Vue Blog</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="authStore.isAuthenticated">
        <v-btn @click="createBlog" class="ml-4">
          Создать блог
        </v-btn>

        <v-btn @click="authStore.logout()" class="ml-4">
          Выйти
        </v-btn>
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
import api from '@/api/http'

const authStore = useAuthStore()
const theme = ref('light')

async function createBlog() {
  const username = authStore.user?.username

  if (!username) {
    console.error('No authenticated user')
    return null
  }
  
  try {
    const response = await api.post('/userInfo', {
      blogName: 'my blog',
      fullName: username
    })

    console.log('Created:', response.data)

    return response.data
  } catch(e) {
    console.warn('Error while create user', e)
  }
}

function onClick () {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

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
