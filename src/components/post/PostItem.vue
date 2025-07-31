<template>
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
        {{ post.userInfoId }}
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
import { defineProps } from 'vue'
import type { IPost } from '@/types/postTypes'
import { usePostsStore } from '@/stores/postsStore'

const postsStore = usePostsStore()

const props = defineProps<{ post: IPost }>()

console.log('users:', postsStore.users)
console.log('posts:', postsStore.posts)
const authorName = ''
</script>

<style scoped>
.post-item {
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  background: #fff;
}
</style>