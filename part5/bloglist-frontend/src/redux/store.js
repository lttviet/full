import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './alertSlice'
import { blogSlice } from './blogSlice'
import { loggedInUserSlice } from './loggedInUserSlice'

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    blogs: blogSlice.reducer,
    loggedInUser: loggedInUserSlice.reducer,
  },
})

export default store
