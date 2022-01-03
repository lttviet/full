import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewComment } from '../redux/blogSlice'

const CommentForm = ({ blogId }) => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const handleCreateComment = async (event) => {
    event.preventDefault()

    dispatch(createNewComment({ blogId, text }))
    setText('')
  }

  const handleCommentChange = ({ target }) => {
    setText(target.value)
  }

  return (
    <form onSubmit={handleCreateComment} className="commentForm">
      <input
        id="comment"
        type="text"
        name="comment"
        value={text}
        onChange={handleCommentChange}
        data-cy="comment"
      />
      <button type="submit" data-cy="createCommentBtn">create</button>
    </form>
  )
}

CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired,
}

export default CommentForm
