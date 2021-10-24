import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const handleLogin = async (returnedUser) => {
    setUser(returnedUser)
  }

  const handleNewBlog = async (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (!user) {
    return (
      <>
        <h2>login</h2>

        <LoginForm handleLogin={handleLogin} />
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

      <h2>create new</h2>

      <BlogForm handleNewBlog={handleNewBlog} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default App
