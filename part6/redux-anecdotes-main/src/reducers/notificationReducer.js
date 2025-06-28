import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'initial notification',
  reducers: {
    updateMessage(state, action) {
      return action.payload
    },
    removeMessage() {
      return ""
    }
  }
})

export const { updateMessage, removeMessage } = notificationSlice.actions

export const createNotification = (content, time) => {
  return dispatch => {
    clearTimeout()
    dispatch(updateMessage(content))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time* 1000)
  }
}
export default notificationSlice.reducer