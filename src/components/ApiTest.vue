<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>
        Test API
      </v-card-title>

      <v-card-text>
        <v-alert v-if="authStore.isAuthenticated" type="success">
          You authorized as {{ authStore.username }}
        </v-alert>

        <v-alert v-else>You're not authed</v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="primary"
          :loading="isLoading"
          @click="testAuth"
        >
          Check auth
        </v-btn>
      </v-card-actions>

      <v-card-text v-if="apiResponse">
        {{ apiResponse }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang='ts'>
import { useAuthStore } from '@/stores/authStore'
import http from '@/api/http'
import { ref } from 'vue'

const authStore = useAuthStore()

const isLoading = ref(false)
const apiResponse = ref<any>(null)

const testAuth = async() => {
  isLoading.value = true

  try {
    const response = await http.get('/userInfo/findAll')
    apiResponse.value = response.data
  } catch (error) {
    apiResponse.value = { error: (error as Error).message}
  } finally {
    isLoading.value = false
  }
}

// Инициализируем статус авторизации при загрузке
authStore.initialize()
</script>

<style module lang='scss'>

</style>
