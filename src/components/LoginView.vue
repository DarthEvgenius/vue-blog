<template>
  <v-container class="fill-height">
    <v-row justify="center">
        <v-card>
          <v-card-title>Авторизация</v-card-title>
          
          <v-card-text>
            <AuthForm />
          </v-card-text>
        </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue'
</script>