import { useEffect, useState, useRef } from "react";
import loginService from '../services/login-service'
import blogService from '../services/blogs'
import Blog from './Blog'
import LoginForm from './LoginForm'
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

export default function MainPage() {
  
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  

  const showErrorMessage = () => {
    setError('Unable to login')
    setTimeout(() => setError(null), 2000)
  }

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUser){
      setUser(JSON.parse(storedUser))
      blogService.setToken(JSON.parse(storedUser).token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(response => setBlogs(response.sort((a, b) => b.likes - a.likes)))
  }, [user])

  const login = async (username, password) => {
    const response = await loginService.login({username, password})
    if (response === null)
      showErrorMessage()
    else
    {
      setUser(response)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response))
      blogService.setToken(response.token)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }

  const createBlog = async (newBlog) => {
    const response = await blogService.createNewNote(newBlog)

    if (!response){
      setError('Failed to add blog')
      return setTimeout(() => setError(''), 2000)
    }
    setError(`Added a new blog: ${response.title} by ${response.author}`)
    setTimeout(() => setError(''), 2000)
    setBlogs(blogs.concat(response).sort((a, b) => b.likes - a.likes))
    blogFormRef.current.toggleVisibility()
  }

  const updateLikes = async (updatedBlog) => {
    const result = await blogService.updateBlog(updatedBlog)
    setBlogs(blogs.map(blog => blog.id === result.id ? result : blog).sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = async (blogId) => {
    const status = await blogService.deleteBlog(blogId)
    if (status === 404 || status === 403){
      setError('Unable to delete blog')
      setTimeout(() => setError(''), 2000)
    } else {
      setBlogs(blogs.filter(blog => blog.id !== blogId).sort((a,b) => b.likes - a.likes))
    }
  }

  if (user === null) {
    return (
      <div >
      <h1>Log in to application</h1>
      {error === null ?  null : <h2 style={{border: '2px solid red', backgroundColor: 'grey', color:'red'}}>{error}</h2>}
      <LoginForm
        login={login}
      />
      
    </div>
    )
  }

  return (
    <div>
      <h2>Blog</h2>
      {error && <h2 style={{
        color: error.toLowerCase().includes('failed') ? 'red' : 'green',
        border: error.toLowerCase().includes('failed') ? '2px solid red' : '2px solid green',
        backgroundColor: 'grey',
      }}>{error}</h2>}

      <p style={{display: 'inline-block'}}>{user.username} logged in</p>
      <button onClick={handleLogout}>Log out</button>

      <Togglable 
        buttonLabel={'new blog'}
        ref={blogFormRef}
      >
        <BlogForm createBlog={createBlog} blogFormRef={blogFormRef}/>

      </Togglable>
      
      {blogs.map(blog => 
        <Blog key={blog.id} 
          blog={blog}  
          updateLikes={updateLikes} 
          userId={user.id}
          deleteBlog={deleteBlog}
          />)}
    </div>
  )
}