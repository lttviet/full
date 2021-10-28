import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  boderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <button type="button" onClick={toggleVisible}>
          view
        </button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button type="button" onClick={toggleVisible}>
          hide
        </button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes}
        <button type="button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>
        {blog.author.name}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
}

export default Blog
