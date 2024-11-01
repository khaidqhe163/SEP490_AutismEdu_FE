import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import tutorSlice from '../features/tutorSlice'
import listStudentSlice from '../features/listStudent'

export default configureStore({
  reducer: {
    user: userSlice,
    tutor: tutorSlice,
    listStudent: listStudentSlice
  }
})