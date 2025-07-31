<template>
  <div  class="w-100">
    <h1 class="mb-3">Все записи</h1>

    <!-- <UserList /> -->

    <PostList 
      :posts="posts" 
    />
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/postsStore'
import PostList from '@/components/post/PostList.vue'
// import UserList from '@/components/user/UserList.vue'
import { computed } from 'vue'
import { IPost } from '@/types/postTypes'

const postsStore = usePostsStore()

const posts = computed<IPost[]>(() => {
  return postsStore.posts
})

</script>

