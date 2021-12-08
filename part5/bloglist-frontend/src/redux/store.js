import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './alertSlice'
import { blogSlice } from './blogSlice'
import { userSlice } from './userSlice'

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    blogs: blogSlice.reducer,
    user: userSlice.reducer,
  },
})

export default store
