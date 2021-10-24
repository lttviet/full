import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <div>
    {blog.title}
    {' '}
    {blog.author.name}
  </div>
)

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Blog
