import type { IComment } from "./commentTypes"

export interface IPost {
  id: number
  title: string
  briefDescription: string
  fullDescription: string
  dateTime: string
  userInfoId: number
  comments: IComment[]
}

export type TPostCreate = Pick<IPost, 'title' | 'briefDescription' | 'fullDescription'>

export interface IPostForUser extends Omit<IPost, 'userInfoId'> {}