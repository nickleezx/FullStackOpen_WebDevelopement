import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/login-form'

export default function App() {
  const [blogs, setBlogs] = useState([])

  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then(blogs => setBlogs(blogs))
  // }, [])

  return (
    <LoginForm />
    // <div>
    //   <h2>blogs</h2>
    //   {blogs.map((blog, index) => <Blog key={index} blog={blog} />)}
    // </div>
  )
}
