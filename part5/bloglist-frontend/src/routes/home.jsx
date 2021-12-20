import React from 'react'
import BlogForm from '../components/BlogForm'
import BlogList from '../components/BlogList'
import Toggle from '../components/Toggle'

const Home = () => (
  <>
    <Toggle buttonLabel="create new blog">
      <BlogForm />
    </Toggle>

    <BlogList />
  </>
)

export default Home
