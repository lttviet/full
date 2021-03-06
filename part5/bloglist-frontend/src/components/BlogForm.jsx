import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../redux/blogSlice'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    dispatch(createNewBlog({ title, url }))
    setTitle('')
    setUrl('')
  }

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  return (
    <form onSubmit={handleCreateBlog} className="blogForm">
      <div>
        title:
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          data-cy="title"
        />
      </div>

      <div>
        url
        <input
          id="url"
          type="text"
          name="url"
          value={url}
          onChange={handleUrlChange}
          data-cy="url"
        />
      </div>

      <button type="submit" data-cy="createBlogBtn">create</button>
    </form>
  )
}

export default BlogForm
