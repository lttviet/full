import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username, onUsernameChange, password, onPasswordChange, onSubmitForm,
}) => (
  <form onSubmit={onSubmitForm}>
    <div>
      username
      <input
        type="text"
        name="username"
        value={username}
        onChange={onUsernameChange}
      />
    </div>

    <div>
      password
      <input
        type="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
      />
    </div>

    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
}

export default LoginForm
