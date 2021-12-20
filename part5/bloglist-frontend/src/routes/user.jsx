import React from 'react'
import { useParams } from 'react-router-dom'
import UserProfile from '../components/UserProfile'

const User = () => {
  const { id } = useParams()

  return <UserProfile id={id} />
}

export default User
