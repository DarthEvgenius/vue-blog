<template>
<v-card class="mb-3 pa-3 d-flex flex-column ga-2">
  Users:

  <v-card v-for="user in users" class="py-3">
    {{ user }}
  </v-card>
</v-card>
</template>

<script setup lang='ts'>
import { usePostsStore } from '@/stores/postsStore'
import { IUserInfo } from '@/types/userTypes'
import { computed } from 'vue'

const postsStore = usePostsStore()

const users = computed<IUserInfo[]>(() => {
  return postsStore.users
})


</script>

<style module lang='scss'>

</style>
