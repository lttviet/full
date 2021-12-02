/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

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
})

export const { reset, showSuccess, showError } = alertSlice.actions
