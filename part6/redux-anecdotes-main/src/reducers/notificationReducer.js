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
export default notificationSlice.reducer