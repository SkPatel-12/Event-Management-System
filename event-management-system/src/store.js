import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/authSlice.js"
import eventReducer from './features/eventSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer
  },
})