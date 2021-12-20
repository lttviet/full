import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/loggedInUserSlice'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault()

    dispatch(login({ username, password }))

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmitLogin} data-cy="loginForm">
      <div>
        username
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          data-cy="username"
        />
      </div>

      <div>
        password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          data-cy="password"
        />
      </div>

      <button type="submit" data-cy="loginBtn">login</button>
    </form>
  )
}

export default LoginForm
