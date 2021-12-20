import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './alertSlice'
import { blogSlice } from './blogSlice'
import { loggedInUserSlice } from './loggedInUserSlice'
import { userSlice } from './userSlice'

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    blogs: blogSlice.reducer,
    loggedInUser: loggedInUserSlice.reducer,
    users: userSlice.reducer,
  },
})

export default store
