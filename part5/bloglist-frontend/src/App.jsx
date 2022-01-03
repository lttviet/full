import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Nav from './components/Nav'
import Notification from './components/Notification'
import CustomRoutes from './routes/routes'

const App = () => {
  const user = useSelector((state) => state.loggedInUser)

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
      <Nav />

      <h2>blog app</h2>

      <Notification />

      <CustomRoutes />
    </>
  )
}

export default App
