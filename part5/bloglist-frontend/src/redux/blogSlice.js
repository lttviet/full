/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const getAllBlogs = createAsyncThunk(
  'blogs/getAll',
  async () => blogService.getAll(),
)

export const createNewBlog = createAsyncThunk(
  'blogs/new',
  async (newBlog) => blogService.create(newBlog),
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
