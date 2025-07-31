<template>
  <v-container max-width="1200" class="pa-2">
    <v-card v-if="post" outlined>
      <v-card-title class="text-h5">
        <h1>
          {{ post.title }}
        </h1>
      </v-card-title>

      <v-card-subtitle class="text-subtitle-1 mb-3">
        {{ post.briefDescription }}
      </v-card-subtitle>

      <v-card-text>
        <p class="mb-4">
          {{ post.fullDescription }}
        </p>

        <p class="mb-4 text-caption grey--text">
          Дата добавления: {{ formattedDate }}
        </p>

        <v-divider></v-divider>

        <CommentList
          :post="post"
        />

        <v-divider class="my-6"></v-divider>

        <AddCommentForm
          class="comment-form"
          :post-id="postId"
        />
        
      </v-card-text>
    </v-card>

    <div v-else>
      Пост с заданным id({{ postId }}) не найден
    </div>
  </v-container>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { IPost } from '@/types/postTypes'
import { usePostsStore } from '@/stores/postsStore'
import CommentList from '@/components/comment/CommentList.vue'
import AddCommentForm from '@/components/comment/AddCommentForm.vue'

const route = useRoute()
const postsStore = usePostsStore()

const postId = Number(route.params.postId)

const post = computed(():IPost | undefined => {
  return postsStore.posts.find(p => p.id === postId)
})

const formattedDate = computed(() => {
  if (!post.value?.dateTime) return 'Неизвестна'
  
  const date = new Date(post.value.dateTime)
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

</script>

<style scoped lang='scss'>
.comment-form {
  margin-inline: auto;
  max-width: 500px;
}
</style>
