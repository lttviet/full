import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import { showError, showSuccess } from './redux/alertSlice'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const showNotification = (message, success) => {
    if (success) {
      dispatch(showSuccess(message))
    } else {
      dispatch(showError(message))
    }
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (!user) {
    return (
      <>
        <Notification />

        <h2>login</h2>

        <LoginForm handleLogin={handleLogin} />
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>

      <Notification />

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

      <Toggle buttonLabel="create new blog">
        <BlogForm />
      </Toggle>

      <BlogList />
    </>
  )
}

export default App
