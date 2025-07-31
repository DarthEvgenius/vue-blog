import { defineStore } from 'pinia'
import api from '@/api/http'
import type { IPost, TPostCreate } from '@/types/postTypes'
import type { IUserInfo } from '@/types/userTypes'
import { useAuthStore } from './authStore'



export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as IPost[],
    users: [] as IUserInfo[]
  }),

  actions: {
    async fetchAllUserInfo() {
      try {
        const response = await api.get<IUserInfo[]>('/userInfo/findAll')
        this.users = response.data
        
        // console.log('fetch users in store:', response.data)
        
        return response.data
      } catch (error) {
        console.error('Failed to fetch user info:', error)
        throw error
      }
    },

    async getAllPosts() {
      try {
        const allUserInfo = await this.fetchAllUserInfo()

        const newPosts = allUserInfo.flatMap(user =>
          user.post.map(post => ({
            ...post,
            userInfoId: user.id
          }))
        )

        this.posts = this.sortPosts(newPosts)

        return this.posts
      } catch (error) {
        console.error('Failed to get all posts:', error)
        throw error
      }
    },

    sortPosts(posts: IPost[]) {
      return [...posts]
        .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
    },

    async getPost(id: number) {
      try {
        const response = await api.get<IPost>(`/post/${id}`)
        return response.data
      } catch (error) {
        console.error('Failed to get post:', error)
        throw error
      }
    },

    async addPost(post: TPostCreate) {
      const authStore = useAuthStore()
      const userInfoId = authStore.user?.id

      if (!userInfoId) throw new Error('User is not authenticated')

      const body = { ...post }

      try {
        const response = await api.post('/post',
          body,
          { params: { userInfoId } }
        )
        return response.data
      } catch(error) {
        console.error('Failed to add post:', error)
        throw error
      }
      
    },

    async editPost(post: IPost) {
      const body = {
        briefDescription: post.briefDescription,
        fullDescription: post.fullDescription,
        id: post.id,
        title: post.title
      }

      try {
        const response = await api.put('/post', body)
        return response.data
      } catch(error) {
        console.error('Failed to edit post:', error)
        throw error
      }
    },

    async deletePost(id: number) {
      try {
        const response = await api.delete(`/post/${id}`)
        return response.data
      } catch(error) {
        console.error('Failed to delete post:', error)
        throw error
      }
    }
  }
})