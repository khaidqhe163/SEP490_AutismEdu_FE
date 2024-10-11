import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import tutorSlice from '../features/tutorSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    tutor: tutorSlice
  }
})