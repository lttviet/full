import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  boderWidth: 1,
  marginBottom: 5,
}

const Blog = ({
  blog, addedByLoggedInUser, handleLike, handleDelete,
}) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  if (!visible) {
    return (
      <div style={blogStyle} className="blogTitle">
        {blog.title}
        <button type="button" onClick={toggleVisible} className="viewBtn">
          view
        </button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div className="blogTitle">
        {blog.title}
        <button type="button" onClick={toggleVisible}>
          hide
        </button>
      </div>
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
          <button type="button" onClick={handleDelete}>
            delete
          </button>
        </div>
      )}
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
  addedByLoggedInUser: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
