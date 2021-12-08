/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { showError, showSuccess } from './alertSlice'

export const login = createAsyncThunk(
  'user/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      // TODO pass token as a parameter
      blogService.setToken(user.token)

      dispatch(showSuccess(`${user.username} logged in`))

      return user
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

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, getState }) => {
    const { user } = getState()

    window.localStorage.removeItem('loggedInUser')
    dispatch(showSuccess(`${user.username} logged out`))
  },
)

let initialState = {
  token: '',
  username: '',
}

const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
if (loggedInUserJSON) {
  const { token, username } = JSON.parse(loggedInUserJSON)

  if (token && username) {
    initialState = { token, username }
    // TODO pass token as a parameter
    blogService.setToken(token)
  }
}

export const userSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action) => {
          state.username = action.payload.username
          state.token = action.payload.token
        },
      )
      .addCase(
        logout.fulfilled,
        () => initialState,
      )
  },
})
