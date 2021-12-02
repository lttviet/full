import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../redux/blogSlice'
import Blog from './Blog'

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
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </>
  )
}

export default BlogList
