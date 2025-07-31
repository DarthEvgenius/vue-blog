<template>
  <v-card class="my-4" outlined elevation="2">
    <v-card-title
      class="d-flex justify-space-between align-center"
      style="cursor: pointer"
      @click="$emit('click:postId', post.id)"
    >
      <span class="text-h6">
        {{ post.title }}
      </span>

      <v-icon size="24" color="primary">
        mdi-open-in-new
      </v-icon>
    </v-card-title>

    <v-card-subtitle class="mb-3">
      Описание: {{ post.briefDescription }}
    </v-card-subtitle>

    <v-card-text class="d-flex flex-column gap-2">
      <div>
        Автор: 
        <span
          @click.stop="$emit('click:authorId', post.userInfoId)"
          class="author-link"
        >
          {{ authorName || 'Неизвестен' }}
        </span>
      </div>

      <div>Дата: {{ formattedDate }}</div>

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

const { post } = defineProps<{ post: IPost }>()

const postsStore = usePostsStore()

const authorName = computed(() => {
  return postsStore.users?.find(u => u.id === post.userInfoId)?.fullName || ''
})

// Форматируем дату в более читаемый вид
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

<style scoped>
.author-link {
  color: #1976d2;
  cursor: pointer;
  font-weight: 500;
  user-select: none;
  transition: color 0.2s;
}

.author-link:hover {
  color: #1565c0;
  text-decoration: underline;
}
</style>

<!-- <template>
  <div class="post-item">
    <h3 @click="$emit('click:postId', post.id)" style="cursor:pointer">
      {{ post.title }}
    </h3>

    <p>
      {{ post.briefDescription }}
    </p>

    <p>
      Автор: 
      <span @click.stop="$emit('click:authorId', post.userInfoId)" style="color:blue; cursor:pointer;">
        {{ authorName }}
      </span>
    </p>

    <p>
      Дата: {{ post.dateTime }}
    </p>

    <p>
      Комментарии: {{ post.comments }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { IPost } from '@/types/postTypes'
import { usePostsStore } from '@/stores/postsStore'

const postsStore = usePostsStore()

const { post } = defineProps<{ post: IPost }>()

console.log('users:', postsStore.users)
console.log('posts:', postsStore.posts)

const authorName = computed(() => {
  return postsStore.users.find(u => u.id === post.userInfoId)?.fullName
})


console.log('post author:', authorName.value)
</script>

<style scoped>
.post-item {
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  background: #fff;
}
</style> -->