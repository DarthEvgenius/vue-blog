<template>
  <v-card outlined elevation="2">
    <v-card-title
      class="post-link text-indigo-lighten-1 d-flex justify-space-between align-center"
      style="cursor: pointer"
      @click="goToPost"
    >
      <span class="text-h6">
        {{ post.title }}
      </span>

      <v-icon size="24" color="indigo-lighten-2">
        mdi-open-in-new
      </v-icon>
    </v-card-title>

    <v-card-subtitle class="mb-3">
      Описание: {{ post.briefDescription }}
    </v-card-subtitle>

    <v-card-text class="d-flex flex-column gap-2">
      <p v-if="!isUserPage">
        Автор:
        <a
          @click.stop="goToAuthor"
          class="author-link text-indigo-lighten-2"
        >
          {{ authorName || 'Неизвестен' }}
        </a>
      </p>

      <p>Дата: {{ formattedDate }}</p>

      <div>
        <v-icon small class="me-1" color="grey">
          mdi-comment
        </v-icon>
        Комментарии:
        <strong>{{ post.comments.length }}</strong>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { IPost } from '@/types/postTypes'
import { usePostsStore } from '@/stores/postsStore'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const postsStore = usePostsStore()

const { post } = defineProps<{ post: IPost }>()

const isUserPage = computed(() => {
  return route.fullPath.includes('users')
})

const authorName = computed(() => {
  return postsStore.users?.find(u => u.id === post.userInfoId)?.fullName || ''
})

const goToAuthor = () => {
  if (!post.userInfoId) return

  router.push({
    name: 'UserPage',
    params: { userId: post.userInfoId }
  })
}

const goToPost = () => {
  router.push({
    name: 'PostPage',
    params: { postId: post.id }
  })
}

const formattedDate = computed(() => {
  if (!post.dateTime) return 'Неизвестна'
  const date = new Date(post.dateTime)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

<style scoped lang="scss">
.post-link {
  transition: background-color 300ms;

  &:hover {
    background-color: rgb(214, 214, 214);
  }
}

.author-link {
  color: var(--link-color);
  cursor: pointer;
  font-weight: 500;
  user-select: none;
  transition: color 0.2s;
}

.author-link:hover {
  color: var(--link-color);
  text-decoration: underline;
}
</style>
