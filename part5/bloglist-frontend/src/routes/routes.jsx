import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Blog from './blog'
import Home from './home'
import User from './user'
import Users from './users'

const CustomRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users" element={<Users />} />
    <Route path="/users/:id" element={<User />} />
    <Route path="/blogs/:id" element={<Blog />} />
  </Routes>
)

export default CustomRoutes
