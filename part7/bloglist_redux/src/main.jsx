import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App.jsx'
import errorReducer from '../src/reducers/notification.js'
import blogReducer from '../src/reducers/blog.js'
import userReducer from '../src/reducers/user.js'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: errorReducer,
    user: userReducer
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
