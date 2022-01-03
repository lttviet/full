import PropTypes from 'prop-types'
import React from 'react'
import CommentForm from './CommentForm'

const CommentList = ({ blogId, comments }) => (
  <>
    <h4>comments</h4>

    <CommentForm blogId={blogId} />

    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.text}
        </li>
      ))}
    </ul>
  </>

)

CommentList.propTypes = {
  blogId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
}

export default CommentList
