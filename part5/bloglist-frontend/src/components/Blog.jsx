import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../redux/blogSlice'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  boderWidth: 1,
  marginBottom: 5,
}

const Blog = ({
  blog, addedByLoggedInUser,
}) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  const handleLike = () => dispatch(likeBlog(blog.id))

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author.name}`,
    )

    if (!confirm) return

    dispatch(deleteBlog(blog))
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        <span className="blogTitle">
          {blog.title}
        </span>
        <button type="button" onClick={toggleVisible} className="viewBtn">
          view
        </button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <span className="blogTitle">
        {blog.title}
      </span>
      <button type="button" onClick={toggleVisible}>
        hide
      </button>
      <div className="blogUrl">
        {blog.url}
      </div>
      <div className="blogLikes">
        {blog.likes}
        <button type="button" onClick={handleLike} className="likeBtn">
          like
        </button>
      </div>
      <div className="blogAuthor">
        {blog.author.name}
      </div>
      {addedByLoggedInUser && (
        <div>
          <button type="button" onClick={handleDelete} className="deleteBtn">
            delete
          </button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  addedByLoggedInUser: PropTypes.bool.isRequired,
}

export default Blog
