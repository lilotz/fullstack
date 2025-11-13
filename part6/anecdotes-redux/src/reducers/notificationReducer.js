import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlicer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const setNotificationTimeout = (message, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export const { setNotification, clearNotification } =
  notificationSlicer.actions
export default notificationSlicer.reducer