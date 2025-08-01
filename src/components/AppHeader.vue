<template>
  <v-app-bar app color="primary">
    <v-toolbar-title>
      <a @click="goToMain" class="logo-btn">
        Vue Blog
      </a>
    </v-toolbar-title>

    <div class="d-flex align-center">
      <div
        v-if="authStore.isAuthenticated"
        class="create-buttons"
      >
        <UserCreateDialog />
        <PostDialog />
      </div>

      <v-btn
        v-if="authStore.isAuthenticated"
        icon
        class="mobile-menu-btn"
        @click="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>

    <v-btn
      :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      :aria-label="theme === 'light' ? 'Переключить в светлый режим' : 'Переключить в тёмный режим'"
      slim
      @click="toggleTheme"
    ></v-btn>

    
  </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
    >
      <v-list>
        <v-list-item>
          <UserCreateDialog />
        </v-list-item>
        <v-list-item>
          <PostDialog />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script setup lang='ts'>
import UserCreateDialog from './user/UserCreateDialog.vue'
import PostDialog from './post/PostDialog.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const authStore = useAuthStore()


const theme = defineModel('theme')
const drawer = ref(false)

function toggleDrawer() {
  drawer.value = !drawer.value
}

function goToMain() {
  router.push({
    name: 'Home',
  })
}

function toggleTheme () {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped lang='scss'>
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
