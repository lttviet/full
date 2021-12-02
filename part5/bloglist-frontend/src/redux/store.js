import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './alertSlice'
import { blogSlice } from './blogSlice'

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    blogs: blogSlice.reducer,
  },
})

export default store
