import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { logout } from './redux/loggedInUserSlice'
import CustomRoutes from './routes/routes'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedInUser)

  const handleLogout = () => dispatch(logout())

  if (!user) {
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

      <nav>
        <Link to="/">Home</Link>
        {' '}
        |
        {' '}
        <Link to="/users">Users</Link>
      </nav>

      <CustomRoutes />
    </>
  )
}

export default App
