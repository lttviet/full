import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { logout } from './redux/loggedInUserSlice'
import Home from './routes/home'
import Users from './routes/users'

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default App
