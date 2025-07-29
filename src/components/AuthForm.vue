<template>
<v-form @submit.prevent="handleSubmit">
  <v-text-field
    v-model="username"
    lagel="Логин"
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
import { authService } from '@/api/auth'
import { ref } from 'vue'

// const username = ref(import.meta.env.VITE_API_USERNAME)
const username = ref('Prokofiev')

// const password = ref(import.meta.env.VITE_API_PASSWORD)
const password = ref('Sergei')
const loading = ref(false)
const error = ref('')

const handleSubmit = async() => {
  try {
    loading.value = true
    await authService.login(username.value, password.value)
  } catch(e) {
    error.value = 'Auth error, check login/password'
  } finally {
    loading.value = false
  }
}
</script>

<style module lang='scss'>

</style>
