/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import userService from '../services/user'
import { showError, showSuccess } from './alertSlice'

export const login = createAsyncThunk(
  'user/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const user = await userService.login(credentials)
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
    const { loggedInUser } = getState()

    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)

    dispatch(showSuccess(`${loggedInUser.username} logged out`))
  },
)

let initialState = null

const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
if (loggedInUserJSON) {
  const { token, username } = JSON.parse(loggedInUserJSON)

  if (token && username) {
    initialState = { token, username }
    // TODO pass token as a parameter
    blogService.setToken(token)
  }
}

export const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (_, action) => ({
          username: action.payload.username,
          token: action.payload.token,
        }),
      )
      .addCase(
        logout.fulfilled,
        () => null,
      )
  },
})
