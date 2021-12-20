/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import { showError } from './alertSlice'

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async () => userService.getAll(),
)

export const getOneUser = createAsyncThunk(
  'users/getOne',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      return await userService.getOne(id)
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
      .addCase(
        getOneUser.fulfilled,
        (state, action) => {
          const idx = state.findIndex((u) => u.id === action.payload.id)
          console.log(idx)
          if (idx === -1) {
            state.push(action.payload)
          } else {
            state[idx] = action.payload
          }
        },
      )
  },
})
