<template>
  <v-list-item>
    <v-list-item-title>
      {{ comment.userInfo }} 
      <small class="text-grey">
        &lt;{{ comment.email }}&gt;
      </small>

      <v-btn
        icon
        size="x-small"
        color="error"
        variant="text"
        @click.stop="deleteComment"
      >
        <v-icon>mdi-delete-outline</v-icon>
        <v-tooltip activator="parent" location="top">
          Удалить комментарий
        </v-tooltip>
      </v-btn>
    </v-list-item-title>

    <p>
      {{ comment.textComment }}
    </p>

    <v-list-item-subtitle
      class="text-caption grey--text"
    >
      {{ formatCommentDate(comment.dateTime) }}
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script setup lang='ts'>
import { IComment } from '@/types/commentTypes'
import api from '@/api/http'
import { usePostsStore } from '@/stores/postsStore'

const postsStore = usePostsStore()

const { comment } = defineProps<{
  comment: IComment
}>()

function formatCommentDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function deleteComment() {
  if (!confirm('Удалить этот комментарий?')) return

  try {
    const response = await api.delete(`/comment/${comment.id}`)
    await postsStore.getAllPosts()
    
    return response.data
  } catch (error) {
    console.error('Ошибка удаления:', error)
    alert('Не удалось удалить комментарий')
  }
}
</script>
