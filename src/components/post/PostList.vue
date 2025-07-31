<template>
  <div class="d-flex flex-column ga-3">
    <PostItem 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import PostItem from '@/components/post/PostItem.vue'
import type { IPost } from '@/types/postTypes';

const { posts } =  defineProps<{ posts: IPost[] }>()

</script>