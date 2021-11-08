import PropTypes from 'prop-types'
import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault()

    try {
      const returnedUser = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(returnedUser))

      blogService.setToken(returnedUser.token)

      setUsername('')
      setPassword('')

      handleLogin(returnedUser)
    } catch (e) {
      handleLogin(null, e.response.data.error)
      console.error(e.response)
    }
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
