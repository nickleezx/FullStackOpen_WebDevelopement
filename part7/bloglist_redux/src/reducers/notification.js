import { createSlice } from "@reduxjs/toolkit"

// const notificationReducer = (state, action) => {
//   switch(action.type) {
//     case 'SET_ERROR':
//       return action.payload
//     case 'RESET_ERROR':
//       return null
//     default:
//       return state
//   }
// }

// export const setError = (message) => {
//   return {
//     type: 'SET_ERROR',
//     payload: message
//   }
// }

// export const resetError = () => {
//   return {
//     type: 'RESET_ERROR',
//     payload: ''
//   }
// }


// export default notificationReducer

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setError(state, action) {
      return action.payload
    },
    resetError(state, action) {
      return null
    }
  }
})

export const { setError, resetError } = notificationSlice.actions
export default notificationSlice.reducer