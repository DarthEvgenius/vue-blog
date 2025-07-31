<template>
<div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-post"
          text="Создать пост"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Новый пост"
      >
        <v-card-text>
          <PostCreateForm
            @post-created="closeDialog"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Закрыть"
            variant="plain"
            @click="closeDialog"
          ></v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang='ts'>
  import PostCreateForm from './PostCreateForm.vue'

  import { ref } from 'vue'

  const dialog = ref(false)
  
  function closeDialog() {
    dialog.value = false
  }
</script>

<style module lang='scss'>

</style>
