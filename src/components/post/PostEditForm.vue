<template>
  <v-form
    ref="formRef"
    v-model="isValidForm"
  >
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="title"
          :counter="50"
          :rules="titleRules"
          label="Заголовок*"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="briefDescription"
          :rules="briefRules"
          label="Краткое описание*"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="fullDescription"
          :rules="fullRules"
          label="Текст поста*"
          required
        ></v-textarea>
      </v-col>

      <v-col cols="6">
        <v-btn
        color="primary"
        text="Очистить"
        variant="tonal"
        @click="resetForm"
      ></v-btn>
      </v-col>

      <v-col cols="6" class="d-flex justify-end">
        <v-btn
        color="primary"
        text="Сохранить"
        variant="tonal"
        @click="createPost"
      ></v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang='ts'>
  import { ref, computed } from 'vue'
  import api from '@/api/http'
  import { usePostsStore } from '@/stores/postsStore'
  import { IPost } from '@/types/postTypes'

  const { post } = defineProps<{
    post: IPost
  }>()
  
  const emit = defineEmits<{
    posted: []
  }>()

  const postsStore = usePostsStore()

  const formRef = ref()
  const isValidForm = ref<boolean | null>(false)

  const title = ref(post.title)
  const briefDescription = ref(post.briefDescription)
  const fullDescription = ref(post.fullDescription)

  
  const titleRules = [
    (value: string) => {
      if (value) return true
      return 'Заполните поле'
    },
    (value: string) => {
      if (value?.length <= 50) return true
      return 'Максимальная длина 50 символов.'
    }
  ]

  const briefRules = [
    (value: string) => {
      if (value) return true
      return 'Заполните поле'
    },
    (value: string) => {
      if (value?.length <= 100) return true
      return 'Максимальная длина 100 символов.'
    }
  ]

  const fullRules = [
    (value: string) => {
      if (value) return true
      return 'Заполните поле'
    },
    (value: string) => {
      if (value?.length <= 255) return true
      return 'Максимальная длина 255 символов.'
    }
  ]

  function resetForm() {
    formRef.value.reset()
  }

  async function createPost() {
    if (!formRef.value) return
    const { valid } = await formRef.value.validate()

    if (valid) {
      await savePost()
      await postsStore.getAllPosts()
      
      resetForm()
      emit('posted')
    }
  }

  async function savePost() {
    const body = {
      title: title.value,
      briefDescription: briefDescription.value,
      fullDescription: fullDescription.value,
      id: post.id
    }

    try {
      const response = await api.put('/post', body)

      return response.data
    } catch(e) {
      console.warn('Error while edit post', e)
    }
  }
</script>

