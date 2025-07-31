<template>
  <v-container class="pa-2" max-width="1200">
    <v-toolbar>
      <v-toolbar-title>
        <h1>
          Записи автора: {{ authorName }}
        </h1>
      </v-toolbar-title>
    </v-toolbar>

    <v-divider class="my-4"></v-divider>

    <div class="wrapper">
      <v-card
        class="pa-4"
        variant="outlined"
        title="Новый пост"
      >
        <PostCreateForm />
      </v-card>
      
      <div>
        <PostList
          v-if="posts.length"
          :posts="posts"
        />
  
        <div v-else class="text-center grey--text">
          У автора пока нет постов.
        </div>
      </div>
    </div>

  </v-container>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/postsStore'
import PostList from '@/components/post/PostList.vue'
import PostCreateForm from '@/components/post/PostCreateForm.vue'

const route = useRoute()
const router = useRouter()

const postsStore = usePostsStore()

const authorId = ref<number>(Number(route.params.userId) || 0)


const posts = computed(() => {
  return postsStore.posts.filter(post => post.userInfoId === authorId.value)
})

const authorName = computed(() => {
  console.log('authorName', postsStore.users)
  return postsStore.users.find(user => user.id === authorId.value)?.fullName
})

</script>

<style scoped lang='scss'>
.wrapper {
  display: grid;
  grid-template-columns: minmax(350px, 30%) 1fr;
  gap: 2rem;

  @media (max-width: 920px) {
    grid-template-columns: 100%;
  }
}
</style>
