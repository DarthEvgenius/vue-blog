<template>
<div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-post"
          variant="tonal"
          :text="action==='create' ? 'Создать пост' : 'Редактировать пост'"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Заполните поля:"
      >
        <v-card-text>
          <PostCreateForm
            v-if="action === 'create'"
            @posted="closeDialog"
          />

          <PostEditForm
            v-else
            :post="post!"
            @posted="closeDialog"
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
  import { IPost } from '@/types/postTypes';
import PostCreateForm from './PostCreateForm.vue'
  import PostEditForm from './PostEditForm.vue'
  import { ref } from 'vue'

  const { action='create', post } = defineProps<{
    action?: 'create' | 'edit',
    post?: IPost
  }>()

  const dialog = ref(false)
  
  function closeDialog() {
    dialog.value = false
  }
</script>

