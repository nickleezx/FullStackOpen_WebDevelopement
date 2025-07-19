import { createContext, useReducer } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY_CREATE':
      return `anecdote ${action.payload} created`
    case 'NOTIFY_VOTE':
      return `anecdote ${action.payload} voted`
    case "NOTIFY_ERROR":
      return action.payload
    case "RESET":
      return ''
    default:
      return ''
  }
}

export const notifyCreate = (anecdote) => {
  return {
    type: "NOTIFY_CREATE",
    payload: anecdote
  }
}

export const notifyVote = (anecdote) => {
  return {
    type: "NOTIFY_VOTE",
    payload: anecdote
  }
}

export const notifyReset = () => {
  return {
    type: "NOTIFY_RESET",
  }
}

export const notifyError = (message) => {
  return {
    type: 'NOTIFY_ERROR',
    payload: message
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext