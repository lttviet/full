import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState({ message: '', success: true })

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
      setToast({ message: '', success: true })
    } else {
      showNotification(errorMessage, false)
    }
  }

  const handleNewBlog = async (newBlog) => {
    setBlogs(blogs.concat(newBlog))
    showNotification(
      `a new blog ${newBlog.title} by ${user.username} added`,
      true,
    )
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

      <h2>create new</h2>

      <BlogForm handleNewBlog={handleNewBlog} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default App
