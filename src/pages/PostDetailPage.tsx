import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(value))
}

function PostDetailPage() {
  const navigate = useNavigate()
  const { postId } = useParams()
  const { getPostById, deletePost } = usePosts()
  const post = getPostById(postId)

  if (!post) {
    return (
      <section className="panel">
        <h2>게시글을 찾을 수 없어요.</h2>
        <button type="button" onClick={() => navigate('/posts')}>
          목록으로 돌아가기
        </button>
      </section>
    )
  }

  const handleDelete = () => {
    deletePost(post.id)
    navigate('/posts')
  }

  return (
    <section className="panel detail-panel">
      <div className="detail-head">
        <div>
          <p className="section-label">Step 3</p>
          <h2>{post.title}</h2>
          <p className="detail-meta">
            작성자 {post.author} · 최종 수정 {formatDate(post.updatedAt)}
          </p>
        </div>

        <div className="action-row">
          <Link to={`/posts/${post.id}/edit`} className="ghost-button button-link">
            수정
          </Link>
          <button type="button" className="danger-button" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>

      <article className="detail-body">{post.content}</article>

      <Link to="/posts" className="inline-link">
        목록으로 돌아가기
      </Link>
    </section>
  )
}

export default PostDetailPage
