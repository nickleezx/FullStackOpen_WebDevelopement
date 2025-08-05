import { useEffect, useState, useRef } from "react";
import blogService from '../services/blogs'
import Blog from './Blog'
import LoginForm from './LoginForm'
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useSelector, useDispatch } from "react-redux";
import { setError, resetError } from "../reducers/notification";
import { initializeBlogs, createBlog as createBlogAction, likeBlog, deleteBlog as deleteBlogAction } from "../reducers/blog";
import { loginUser, logoutUser, setUser } from "../reducers/user";

export default function MainPage() {

  const dispatch = useDispatch()
  const error = useSelector(state => state.notification)
  // const blogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))
  const blogs = useSelector(state => {
    const blogs = [...state.blogs]
    return blogs.sort((a, b) => b.likes - a.likes)
  })
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()


  const showErrorMessage = () => {
    dispatch(setError('Unable to login'))
    setTimeout(() => dispatch(resetError()), 2000)
  }

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUser) {
      // setUser(JSON.parse(storedUser))
      dispatch(setUser(JSON.stringify(storedUser)))
      blogService.setToken(JSON.parse(storedUser).token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [user])

  const login = async (username, password) => {
    try { 
      await dispatch(loginUser(username, password)) 
    }
    catch (exception) {
      showErrorMessage()
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const createBlog = (newBlog) => {

    // console.log('newblog', newBlog)
    try {
      dispatch(createBlogAction(newBlog))
      blogFormRef.current.toggleVisibility()

      dispatch(setError(`Added a new blog: ${newBlog.title} by ${newBlog.author}`))
      setTimeout(() => dispatch(resetError()), 2000)
    } catch (exception) {
      console.error(exception.showErrorMessage())
    }
  }

  const updateLikes = (updatedBlog) => {
    // const result = await blogService.updateBlog(updatedBlog)
    // setBlogs(blogs.map(blog => blog.id === result.id ? result : blog).sort((a, b) => b.likes - a.likes))
    dispatch(likeBlog(updatedBlog))
  }

  const deleteBlog = (blogId) => {
    try {
      dispatch(deleteBlogAction(blogId))
    } catch (exception) {
      dispatch(setError('Unable to delete blog'))
      setTimeout(() => dispatch(resetError()), 2000)
    }
  }

  if (user === null) {
    return (
      <div >
        <h1>Log in to application</h1>
        {error === null ? null : <h2 style={{ border: '2px solid red', backgroundColor: 'grey', color: 'red' }}>{error}</h2>}
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

      <p style={{ display: 'inline-block' }}>{user.username} logged in</p>
      <button onClick={handleLogout}>Log out</button>

      <Togglable
        buttonLabel={'new blog'}
        ref={blogFormRef}
      >
        <BlogForm createBlog={createBlog} blogFormRef={blogFormRef} />

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