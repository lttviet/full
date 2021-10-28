import PropTypes from 'prop-types'
import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.create({ title, url })

      setTitle('')
      setUrl('')
      handleNewBlog(returnedBlog)
    } catch (e) {
      handleNewBlog(null, e.response.data.error)
      console.error(e)
    }
  }

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleUrlChange}
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default BlogForm
