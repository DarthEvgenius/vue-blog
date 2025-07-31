<template>
  <v-app :theme="theme">
    <v-app-bar app color="primary">
      <v-toolbar-title>
        <a @click="goToMain" class="logo-btn">
          Vue Blog
        </a>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="authStore.isAuthenticated" class="create-buttons">
        <UserCreateDialog />
        <PostCreateDialog />
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
import { ref, onMounted } from 'vue'
import PostCreateDialog from './components/post/PostCreateDialog.vue'
import UserCreateDialog from './components/user/UserCreateDialog.vue'
import { usePostsStore } from './stores/postsStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const postsStore = usePostsStore()
const theme = ref('light')


onMounted(async () => {
  await postsStore.getAllPosts()
})

function goToMain() {
  router.push({
    name: 'Home',
  })
}

function onClick () {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
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
  
  @media (max-width: 650px) {
    display: none;
  }
}
</style>
