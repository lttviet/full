/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { createNewBlog, getAllBlogs } from './blogSlice'

const initialState = {
  id: 1,
  message: '',
  type: 'success',
}

export const alertSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: () => initialState,
    showSuccess: (state, action) => {
      state.id += 1
      state.message = action.payload
      state.type = 'success'
    },
    showError: (state, action) => {
      state.id += 1
      state.message = action.payload
      state.type = 'error'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.id += 1
        state.message = action.error.message
        state.type = 'error'
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        state.id += 1
        state.message = `a new blog ${action.payload.title} added`
        state.type = 'success'
      })
      .addCase(createNewBlog.rejected, (state, action) => {
        console.log(action)
        state.id += 1
        state.message = action.error.message
        state.type = 'error'
      })
  },
})

export const { reset, showSuccess, showError } = alertSlice.actions
