<template>
  <div>
    <PostItem 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
      @click:authorId="onAuthorClick"
      @click:postId="onPostClick"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import PostItem from '@/components/post/PostItem.vue'
import type { IPost } from '@/types/postTypes';


const { posts } =  defineProps<{ posts: IPost[] }>()

const emit = defineEmits<{
  (e: 'click:author', authorId: number): void,
  (e: 'click:post', postId: number): void
}>()

const onAuthorClick = (authorId: number) => {
  emit('click:author', authorId)
}

const onPostClick = (postId: number) => {
  emit('click:post', postId)
}
</script>