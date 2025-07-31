import type { IPostForUser } from "./postTypes"

export interface IUserInfo {
  id: number
  fullName: string
  blogName: string
  post: IPostForUser[]
}