<template>
<v-form @submit.prevent="handleSubmit">
  <v-text-field
    v-model="username"
    label="Логин"
    required
  ></v-text-field>

  <v-text-field
      v-model="password"
      label="Пароль"
      type="password"
      required
    ></v-text-field>

  <v-btn
    type="submit"
    color="primary"
    :loading="loading"
  >
    Войти
  </v-btn>

  <v-alert
    v-if="error"
    type="error"
    class="mt-4"
  >
    {{ error }}
  </v-alert>
</v-form>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { authService } from '@/api/authApi'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const username = ref(import.meta.env.VITE_API_USERNAME)
const password = ref(import.meta.env.VITE_API_PASSWORD)
const loading = ref(false)
const error = ref('')

const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async() => {
  loading.value = true
  error.value = ''

  try {
    const responseData = await authService.login(username.value, password.value)

    console.log('response:', responseData)

    authStore.setUser(responseData)

    router.push('/')
  } catch(e) {
    error.value = 'Auth error, check login/password'
  } finally {
    loading.value = false
  }
}
</script>

<style module lang='scss'>

</style>
