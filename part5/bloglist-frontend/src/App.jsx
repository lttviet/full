import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import { logout } from './redux/userSlice'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => dispatch(logout())

  if (!user.token) {
    return (
      <>
        <Notification />

        <h2>login</h2>

        <LoginForm />
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
