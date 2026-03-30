import { useState, type ReactNode } from 'react'
import { samplePosts } from '../data/samplePosts'
import { PostsContext } from './posts-context'
import type { Post, PostPayload } from '../types'

const STORAGE_KEY = 'study-posts'

function readStoredPosts(): Post[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? (JSON.parse(stored) as Post[]) : samplePosts
}

type PostsUpdater = Post[] | ((currentPosts: Post[]) => Post[])

interface PostsProviderProps {
  children: ReactNode
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>(readStoredPosts)

  const syncPosts = (updater: PostsUpdater) => {
    setPosts((currentPosts) => {
      const nextPosts =
        typeof updater === 'function' ? updater(currentPosts) : updater
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts))
      return nextPosts
    })
  }

  const createPost = (post: PostPayload): Post => {
    const now = new Date().toISOString()
    const nextPost: Post = {
      ...post,
      id: String(Date.now()),
      createdAt: now,
      updatedAt: now,
    }

    syncPosts((currentPosts) => [nextPost, ...currentPosts])
    return nextPost
  }

  const updatePost = (postId: string, values: PostPayload): Post | null => {
    let updatedPost: Post | null = null

    syncPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post
        }

        updatedPost = {
          ...post,
          ...values,
          updatedAt: new Date().toISOString(),
        }

        return updatedPost
      }),
    )

    return updatedPost
  }

  const deletePost = (postId: string) => {
    syncPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId))
  }

  const getPostById = (postId?: string) =>
    posts.find((post) => post.id === postId)

  return (
    <PostsContext.Provider
      value={{
        posts,
        createPost,
        updatePost,
        deletePost,
        getPostById,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
