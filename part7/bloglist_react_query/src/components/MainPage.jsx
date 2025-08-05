import { useEffect, useState, useRef } from "react";
import loginService from '../services/login-service'
import blogService from '../services/blogs'
import Blog from './Blog'
import LoginForm from './LoginForm'
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { triggerNotification, useNotificationDispatch, useNotificationValue } from "../reducers/NotificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initializeUser, useUserDispatch, useUserValue } from "../reducers/UserContext";

export default function MainPage() {

  const error = useNotificationValue()
  const setError = useNotificationDispatch()
  const user = useUserValue()
  const setUser = useUserDispatch()
  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  console.log(user)

  const blogResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    // enabled: !!user,
    refetchOnWindowFocus: false,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.createNewNote,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      triggerNotification(setError, `Added a new blog: ${response.title} by ${response.author}`)
    },
    onError: () => {
      triggerNotification(setError, 'Failed to add blog')
    }
  })

  const likeBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: () => {

    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: () => {
      triggerNotification(setError, 'Unable to delete blog')
    }
  })

  const showErrorMessage = () => {
    triggerNotification(setError, 'Unable to login')
  }

  useEffect(() => {
    initializeUser(setUser);
  }, [])


  const login = async (username, password) => {
    const response = await loginService.login({ username, password })
    if (response === null)
      showErrorMessage()
    else {
      setUser({type: 'LOGIN', payload: response})
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response))
      blogService.setToken(response.token)
    }
  }

  const handleLogout = () => {
    setUser({type: 'LOGOUT'})
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }

  const createBlog = async (newBlog) => {
    newBlogMutation.mutate(newBlog)
    blogFormRef.current.toggleVisibility()
  }

  const updateLikes = async (updatedBlog) => {
    likeBlogMutation.mutate(updatedBlog)
  }

  const deleteBlog = async (blogId) => {
    deleteBlogMutation.mutate(blogId)
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

  if (blogResult.isLoading) {
    return <div>Loading blogs...</div>;
  }

  if (blogResult.isError) {
    return <div>An error occurred while fetching blogs.</div>;
  }

  const blogs = blogResult.data.toSorted((a, b) => b.likes - a.likes)

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