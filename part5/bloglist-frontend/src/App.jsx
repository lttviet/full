import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState({ message: '', success: true })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const showNotification = (message, success, ms = 5000) => {
    setToast({ message, success })
    setTimeout(() => setToast({ message: '', success: true }), ms)
  }

  const handleLogin = async (returnedUser, errorMessage) => {
    if (returnedUser) {
      setUser(returnedUser)
      showNotification(
        `${returnedUser.username} logged in`,
        true,
      )
    } else {
      showNotification(errorMessage, false)
    }
  }

  const handleNewBlog = async (returnedBlog, errorMessage) => {
    if (returnedBlog) {
      setBlogs(blogs.concat(returnedBlog))

      blogFormRef.current.toggleVisible()
      showNotification(
        `a new blog ${returnedBlog.title} by ${user.username} added`,
        true,
      )
    } else {
      showNotification(errorMessage, false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (!user) {
    return (
      <>
        <Notification success={toast.success} message={toast.message} />

        <h2>login</h2>

        <LoginForm handleLogin={handleLogin} />
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>

      <Notification success={toast.success} message={toast.message} />

      <div>
        {user.username}
        {' '}
        logged in
        <button
          type="button"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      <Toggle buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm handleNewBlog={handleNewBlog} />
      </Toggle>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default App
