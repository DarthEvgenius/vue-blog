<template>
  <v-form
    ref="formRef"
    v-model="isValidForm"
  >
    <v-row dense>
      <v-col
        cols="12"

      >
        <v-select
          v-model="userInfoId"
          label="User Id"
          :items="userIds"
          :rules="idRules"
          required
        ></v-select>
      </v-col>

      <v-col
        cols="12"

      >
        <v-text-field
          v-model="title"
          :counter="50"
          :rules="titleRules"
          label="Заголовок*"
          required
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
      >
        <v-text-field
          v-model="briefDescription"
          :rules="briefRules"
          label="Краткое описание*"
          required
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
      >
        <v-textarea
          v-model="fullDescription"
          :rules="fullRules"
          label="Текст поста*"
          required
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row class="justify-end">
      <v-btn
        color="primary"
        text="Сохранить"
        variant="tonal"
        @click="createPost"
      ></v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang='ts'>
  import { ref, computed } from 'vue'
  import api from '@/api/http'
import { usePostsStore } from '@/stores/postsStore'

  const emit = defineEmits<{
    postCreated: []
  }>()

  const postsStore = usePostsStore()

  const userIds = computed(() => {
    return postsStore.users.map(u => u.id)
  })

  const formRef = ref()
  const isValidForm = ref<boolean | null>(false)

  const userInfoId = ref()
  const title = ref()
  const briefDescription = ref()
  const fullDescription = ref()

  const idRules = [
    (value: string) => {
      if (value) return true
      return 'Выберите id автора'
    },
  ]
  
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

  async function createPost() {
    if (!formRef.value) return
    const { valid } = await formRef.value.validate()

    if (valid) {
      await savePost()
      await postsStore.getAllPosts()
      
      formRef.value.reset()
      emit('postCreated')
    }
  }

  async function savePost() {
    const body = {
      title: title.value,
      briefDescription: briefDescription.value,
      fullDescription: fullDescription.value
    }

    try {
      const response = await api.post(
        '/post',
        body,
        {
          params: { userInfoId: userInfoId.value }
        }
      )

      return response.data
    } catch(e) {
      console.warn('Error while create post', e)
    }
  }
</script>

<style module lang='scss'>

</style>
