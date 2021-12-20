import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../redux/userSlice'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>username</th>
          <th>blogs created</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={user.id}>
                {user.name}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserList
