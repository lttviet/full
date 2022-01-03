import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBlogs } from '../redux/blogSlice'

const blogLinkStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  boderWidth: 1,
  marginBottom: 5,
}

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  const sortedBlogs = useMemo(() => {
    if (blogs) return [...blogs].sort((a, b) => a.likes - b.likes)
    return []
  }, [blogs])

  return (
    <>
      <h4>Blog list sorted by likes ascending</h4>

      {sortedBlogs.map((blog) => (
        <div style={blogLinkStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      ))}
    </>
  )
}

export default BlogList
