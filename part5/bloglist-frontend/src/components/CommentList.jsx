import PropTypes from 'prop-types'
import React from 'react'

const CommentList = ({ comments }) => (
  <>
    <h4>comments</h4>

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
  comments: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
}

export default CommentList
