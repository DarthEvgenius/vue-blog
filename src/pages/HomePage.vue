<template>
  <div>
    <h1>Все записи</h1>

    <UserList />

    <PostList 
      :posts="posts" 
      @click:authorId="goToAuthor" 
      @click:postId="goToPost" 
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

const goToAuthor = (authorId: number) => {
  router.push({ name: 'UserPage', params: { userId: authorId }})
}

const goToPost = (postId: number) => {
  router.push({ name: 'PostPage', params: { postId }})
}

onMounted(async () => {
  await postsStore.getAllPosts()
})
</script>

<style module lang='scss'>

</style>
