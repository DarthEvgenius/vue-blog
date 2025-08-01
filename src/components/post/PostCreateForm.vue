<template>
  <v-form
    ref="formRef"
    v-model="isValidForm"
  >
    <v-row dense>
      <v-col cols="12">
        <v-select
          v-model="selectedUser"
          label="Автор*"
          :items="users"
          item-title="fullName"
          item-value="id"
          return-object
          :rules="idRules"
          required
        ></v-select>
      </v-col>

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

  const emit = defineEmits<{
    posted: []
  }>()

  const postsStore = usePostsStore()

  const users = computed(() => {
    return postsStore.users
  })

  const formRef = ref()
  const isValidForm = ref<boolean | null>(false)

  const selectedUser = ref()
  const title = ref()
  const briefDescription = ref()
  const fullDescription = ref()

  const idRules = [
    (value: string) => {
      if (value) return true
      return 'Выберите автора'
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
      fullDescription: fullDescription.value
    }

    try {
      const response = await api.post(
        '/post',
        body,
        {
          params: { userInfoId: selectedUser.value.id }
        }
      )

      return response.data
    } catch(e) {
      console.warn('Error while create post', e)
    }
  }
</script>

