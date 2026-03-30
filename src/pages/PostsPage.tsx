import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function PostsPage() {
  const { posts } = usePosts()

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Step 2</p>
          <h2>게시판 목록</h2>
          <p className="panel-copy">
            목록, 상세, 작성, 수정, 삭제 흐름을 한 화면 구조 안에서 연습할 수 있어요.
          </p>
        </div>

        <Link to="/posts/new" className="button-link">
          새 글 작성
        </Link>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-card-top">
              <div>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
              <span>{post.author}</span>
            </div>

            <div className="post-meta">
              <small>수정일 {formatDate(post.updatedAt)}</small>
              <Link to={`/posts/${post.id}`}>상세 보기</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PostsPage
