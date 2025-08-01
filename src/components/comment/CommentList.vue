<template>
  <div>
    <h2 class="mt-6 mb-4">
      Комментарии ({{ post.comments.length }})
    </h2>

    <v-list lines="two">
      <template v-if="post.comments.length === 0">
        <v-list-item>
            <v-list-item-title class="grey--text text-center">
              Комментариев пока нет
            </v-list-item-title>
        </v-list-item>
      </template>

      <CommentItem
        v-else
        v-for="comment in sortedComments"
        :key="comment.id"
        :comment="comment"
      />
    </v-list>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { IPost } from '@/types/postTypes'
import CommentItem from './CommentItem.vue'

const { post } = defineProps<{
  post: IPost
}>()

const sortedComments = computed(() => {
  if (!post) return null
  
  return [...post.comments].sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  )
})

</script>

