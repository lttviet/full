import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      setUser(JSON.parse(loggedInUserJSON))
    }
  }, [])

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const returnedUser = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(returnedUser))

      setUser(returnedUser)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (!user) {
    return (
      <>
        <h2>login</h2>

        <LoginForm
          username={username}
          password={password}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
          onSubmitForm={handleLogin}
        />
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>

      <p>
        {user.username}
        {' '}
        logged in
      </p>

      <button
        type="button"
        onClick={handleLogout}
      >
        logout
      </button>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default App
