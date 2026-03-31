import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { LoginForm } from '../types'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoggedIn, user } = useAuth()
  const [form, setForm] = useState<LoginForm>({
    email: 'study@example.com',
    password: '1234',
  })
  const [message, setMessage] = useState('')

  const nextPath = (location.state as { from?: string } | null)?.from ?? '/posts'

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = login(form)

    if (!result.ok) {
      setMessage(result.message ?? '')
      return
    }

    navigate(nextPath, { replace: true })
  }

  return (
    <section className="panel auth-panel">
      <div>
        <p className="section-label">Step 1</p>
        <h2>로그인 연습</h2>
        <p className="panel-copy">
          지금은 서버 없이 동작하는 예제라서, 입력한 이메일 기준으로 바로 로그인됩니다.
        </p>
      </div>

      {isLoggedIn && user ? (
        <div className="status-card">
          <strong>{user.nickname} 님으로 로그인되어 있어요.</strong>
          <p>게시판 목록으로 이동해서 CRUD 흐름을 이어서 확인해보세요.</p>
          <button type="button" onClick={() => navigate('/posts')}>
            게시판 가기
          </button>
        </div>
      ) : (
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            이메일
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="study@example.com"
            />
          </label>

          <label>
            비밀번호
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="1234"
            />
          </label>

          {message ? <p className="form-message">{message}</p> : null}

          <button type="submit">로그인</button>
        </form>
      )}
    </section>
  )
}

export default LoginPage
