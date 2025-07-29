<template>
<div>
  <h1>Vue Blog</h1>

  <v-btn color="primary" @click="showAlert">
    Vuetify
  </v-btn>

  <v-card class="mt-4" width="400">
    <v-card-title>Тестовая карточка</v-card-title>
    <v-card-text>
      Если вы видите эту карточку и кнопку выше - Vuetify работает!
    </v-card-text>
  </v-card>
</div>
</template>

<script setup lang='ts'>
const showAlert = () => {
  alert('Vuetify работает корректно!')
}
</script>

<style module lang='scss'>

</style>
