import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import type { PostFormValues, PostPayload } from '../types'

interface PostEditorPageProps {
  mode: 'create' | 'edit'
}

function PostEditorPage({ mode }: PostEditorPageProps) {
  const navigate = useNavigate()
  const { postId } = useParams()
  const { user } = useAuth()
  const { createPost, updatePost, getPostById } = usePosts()
  const editingPost = mode === 'edit' ? getPostById(postId) : undefined
  const [form, setForm] = useState<PostFormValues>({
    title: editingPost?.title ?? '',
    content: editingPost?.content ?? '',
  })

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (mode === 'edit' && !editingPost) {
    return <Navigate to="/posts" replace />
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload: PostPayload = {
      title: form.title.trim(),
      content: form.content.trim(),
      author: editingPost?.author ?? user.nickname,
    }

    if (!payload.title || !payload.content) {
      return
    }

    if (mode === 'create') {
      const newPost = createPost(payload)
      navigate(`/posts/${newPost.id}`)
      return
    }

    if (postId) {
      updatePost(postId, payload)
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section className="panel editor-panel">
      <div>
        <p className="section-label">Step 4</p>
        <h2>{mode === 'create' ? '새 글 작성' : '게시글 수정'}</h2>
        <p className="panel-copy">
          하나의 폼을 재사용하면서 작성과 수정을 모두 처리하는 구조입니다.
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          제목
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </label>

        <label>
          내용
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={10}
            placeholder="내용을 입력하세요"
          />
        </label>

        <div className="action-row">
          <button type="submit">
            {mode === 'create' ? '등록하기' : '수정 저장'}
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate(mode === 'create' ? '/posts' : `/posts/${postId}`)}
          >
            취소
          </button>
        </div>
      </form>
    </section>
  )
}

export default PostEditorPage
