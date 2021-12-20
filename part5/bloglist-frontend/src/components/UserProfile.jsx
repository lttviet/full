import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneUser } from '../redux/userSlice'

const UserProfile = ({ id }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => {
    if (id) return state.users.find((u) => u.id === id)
    return null
  })

  useEffect(() => {
    if (id) {
      dispatch(getOneUser(id))
    }
  }, [id])

  if (!user) return null

  return (
    <>
      <h3>{user.name}</h3>

      <h4>added blogs</h4>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </>
  )
}

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
}

export default UserProfile
