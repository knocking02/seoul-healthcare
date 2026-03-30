import { createContext } from 'react'
import type { Post, PostPayload } from '../types'

export interface PostsContextValue {
  posts: Post[]
  createPost: (post: PostPayload) => Post
  updatePost: (postId: string, values: PostPayload) => Post | null
  deletePost: (postId: string) => void
  getPostById: (postId?: string) => Post | undefined
}

export const PostsContext = createContext<PostsContextValue | null>(null)
