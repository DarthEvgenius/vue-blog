<template>
  <div>
    <h1>Все записи</h1>

    <UserList />

    <PostList 
      :posts="posts" 
    />
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/postsStore'
import PostList from '@/components/post/PostList.vue'
import UserList from '@/components/user/UserList.vue'
import { computed } from 'vue'
import { IPost } from '@/types/postTypes'

const postsStore = usePostsStore()
const router = useRouter()

const posts = computed<IPost[]>(() => {
  return postsStore.posts
})


</script>

<style module lang='scss'>

</style>
