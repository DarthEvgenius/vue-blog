<template>
  <v-card class="pa-3">
    <h3 class="mb-4">Добавить комментарий</h3>

    <v-form
      ref="form"
      v-model="formValid"
    >
      <v-text-field
        v-model="newComment.userInfo"
        label="Имя"
        :rules="[v => !!v || 'Имя обязательно']"
        required
        outlined
        dense
      />

      <v-text-field
        v-model="newComment.email"
        label="Email"
        :rules="emailRules"
        required
        outlined
        dense
      />

      <v-textarea
        v-model="newComment.textComment"
        label="Комментарий"
        :rules="[v => !!v || 'Комментарий обязателен']"
        required
        outlined
        dense
        rows="4"
      />

      <v-btn
        color="primary"
        :disabled="!formValid || loading"
        @click="submitComment"
      >
        Отправить
        <v-progress-circular 
          v-if="loading" 
          indeterminate 
          color="white" 
          size="16" 
          class="ml-2"
        />
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import api from '@/api/http'
import { usePostsStore } from '@/stores/postsStore'

const postsStore = usePostsStore()

const { postId } = defineProps<{
  postId: number
}>()

const form = ref()
const formValid = ref(false)
const loading = ref(false)

interface ICommentForm {
  userInfo: string
  email: string
  textComment: string
}

const newComment = ref<ICommentForm>({
  userInfo: '',
  email: '',
  textComment: '',
})

const emailRules = [
  (v: string) => !!v || 'Email обязателен',
  (v: string) => /^\S+@\S+\.\S+$/.test(v) || 'Некорректный email',
]

async function submitComment() {
  if (!form.value.validate()) return

  loading.value = true

  try {
    const body = {
      userInfo: newComment.value.userInfo,
      email: newComment.value.email,
      textComment: newComment.value.textComment,
    }

    await api.post(
      `/comment`,
      body,
      {
        params: { postId }
      }
    )

    await postsStore.getAllPosts()

    newComment.value.userInfo = ''
    newComment.value.email = ''
    newComment.value.textComment = ''

    form.value.reset()
  } catch (error) {
    console.error('Ошибка отправки комментария', error)
  } finally {
    loading.value = false
  }
}

</script>

