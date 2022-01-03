import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneBlog, likeBlog } from '../redux/blogSlice'
import CommentList from './CommentList'

const BlogDetails = ({ id }) => {
  const dispatch = useDispatch()

  const blog = useSelector((state) => {
    if (id) return state.blogs.find((b) => b.id === id)
    return null
  })

  useEffect(() => {
    if (id) dispatch(getOneBlog(id))
  }, [id])

  const handleLike = () => dispatch(likeBlog(id))

  if (!blog) return null

  return (
    <>
      <h3>
        {blog.title}
      </h3>

      <a href={blog.url}>
        {blog.url}
      </a>

      <div>
        {blog.likes}
        {' '}
        likes
        <button type="button" onClick={handleLike}>
          like
        </button>
      </div>

      <div>
        added by
        {' '}
        {blog.author.name}
      </div>

      <CommentList blogId={blog.id} comments={blog.comments} />
    </>
  )
}

BlogDetails.propTypes = {
  id: PropTypes.string.isRequired,
}

export default BlogDetails
