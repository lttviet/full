/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showError, showSuccess } from './alertSlice'

export const getAllBlogs = createAsyncThunk(
  'blogs/getAll',
  async () => blogService.getAll(),
)

export const getOneBlog = createAsyncThunk(
  'blogs/getOne',
  async (id) => blogService.getOne(id),
)

export const createNewBlog = createAsyncThunk(
  'blogs/new',
  async (newBlog, { dispatch, rejectWithValue }) => {
    try {
      newBlog = await blogService.create(newBlog)
      dispatch(showSuccess(`a new blog ${newBlog.title} added`))
      return newBlog
    } catch (e) {
      const error = e.response.data

      if (error.error) {
        dispatch(showError(error.error))
      } else {
        dispatch(showError(error))
      }

      return rejectWithValue(error)
    }
  },
)

export const likeBlog = createAsyncThunk(
  'blogs/like',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const blog = await blogService.like(id)
      dispatch(showSuccess(`Like ${blog.title}`))

      return blog
    } catch (e) {
      const error = e.response.data

      if (error.error) {
        dispatch(showError(error.error))
      } else {
        dispatch(showError(error))
      }

      return rejectWithValue(error)
    }
  },
)

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (blog, { dispatch, rejectWithValue }) => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch(showSuccess(`Delete ${blog.title}`))

      return blog
    } catch (e) {
      const error = e.response.data

      if (error.error) {
        dispatch(showError(error.error))
      } else {
        dispatch(showError(error))
      }

      return rejectWithValue(error)
    }
  },
)

const initialState = []

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllBlogs.fulfilled,
        (_, action) => action.payload,
      )
      .addCase(
        getOneBlog.fulfilled,
        (state, action) => {
          const idx = state.findIndex((b) => b.id === action.payload.id)
          if (idx === -1) {
            state.push(action.payload)
          } else {
            state[idx] = action.payload
          }
        },
      )
      .addCase(
        createNewBlog.fulfilled,
        (state, action) => state.concat(action.payload),
      )
      .addCase(
        likeBlog.fulfilled,
        (state, action) => state.map((blog) => {
          if (blog.id === action.payload.id) {
            return action.payload
          }
          return blog
        }),
      )
      .addCase(
        deleteBlog.fulfilled,
        (state, action) => state.filter((blog) => blog.id !== action.payload.id),
      )
  },
})
