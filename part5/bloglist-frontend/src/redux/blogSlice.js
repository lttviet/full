/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showError, showSuccess } from './alertSlice'

export const getAllBlogs = createAsyncThunk(
  'blogs/getAll',
  async () => blogService.getAll(),
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
        createNewBlog.fulfilled,
        (state, action) => state.concat(action.payload),
      )
  },
})
