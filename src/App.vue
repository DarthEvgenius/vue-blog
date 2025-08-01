<template>
  <v-app :theme="theme">
    <AppHeader v-model:theme="theme" />
    
    <v-main>
      <v-container fluid class="px-10 fill-height">
            <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostsStore } from './stores/postsStore'
import AppHeader from './components/AppHeader.vue'

const postsStore = usePostsStore()

const theme = ref('light')

onMounted(async () => {
  try {
    await postsStore.getAllPosts()
  } catch (error) {
    console.error('Failed to load posts:', error)
  }
})

</script>

<style scoped>
@import '@mdi/font/css/materialdesignicons.min.css';

.logo-btn {
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 7px;
  transition: color 300ms;

  &:hover {
    color: tomato;
  }
}

.create-buttons {
  display: flex;
  gap: 20px;
  
  @media (max-width: 650px) {
    display: none;
  }
}

.mobile-menu-btn {
  display: none;
  
  @media (max-width: 650px) {
    display: block;
  }
}

</style>
