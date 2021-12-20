import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../redux/userSlice'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  })

  return (
    <>
      <h4>Users</h4>

      {users.map((user) => (
        <p>{user.username}</p>
      ))}
    </>
  )
}

export default UserList
