import { createContext, useContext, useReducer } from "react"

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userValueAndDispatch = useContext(UserContext)
  return userValueAndDispatch[0]
}

export const useUserDispatch = () => {
  const userValueAndDispatch = useContext(UserContext)
  return userValueAndDispatch[1]
}

export const loginUserState = (dispatch, user) => {
  dispatch({type: "LOGIN", payload: user})
}

export const initializeUser = (dispatch) => {
  const storedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUser) {
      dispatch({type: "LOGIN", payload: JSON.parse(storedUser)})
      blogService.setToken(JSON.parse(storedUser).token)
    }
}

export default UserContext