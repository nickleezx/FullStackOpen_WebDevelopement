import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login-service";
import blogService from "../services/blogs"

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  }
})

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const response = await loginService.login({ username, password })
      console.log(response)
      if (response === null){
        throw new Error("Invalid username or password");
      }
  
      dispatch(setUser(response))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response))
      blogService.setToken(response.token)
    } catch (error) {
      throw error
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }
}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer