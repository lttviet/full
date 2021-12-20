/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async () => userService.getAll(),
)

const initialState = []

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllUsers.fulfilled,
        (_, action) => action.payload,
      )
  },
})
