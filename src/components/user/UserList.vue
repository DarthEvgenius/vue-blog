<template>
<div>
  Users:

  <div v-for="user in users">
    {{ user }}
  </div>
</div>
</template>

<script setup lang='ts'>
import { usePostsStore } from '@/stores/postsStore'
import { onMounted, ref } from 'vue'

const postsStore = usePostsStore()
const users = ref<any>([])

onMounted(async () => {
  users.value = await postsStore.fetchAllUserInfo()
})
</script>

<style module lang='scss'>

</style>
