import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/loggedInUserSlice'

const navStyle = {
  background: 'grey',
  padding: '5px',
}

const Nav = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedInUser)

  const handleLogout = () => dispatch(logout())

  return (
    <nav style={navStyle}>
      <Link to="/">Home</Link>
      {' '}
      |
      {' '}
      <Link to="/users">Users</Link>
      {' '}
      |
      {' '}
      {user.username}
      {' '}
      logged in
      <button
        type="button"
        onClick={handleLogout}
      >
        logout
      </button>
    </nav>
  )
}

export default Nav
