import { useEffect, useState } from "react";
import loginService from '../services/login-service'
import blogService from '../services/blogs'
import Blog from './Blog'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

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
    blogService.getAll().then(response => setBlogs(response))
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await loginService.login({username, password})
    if (response === null)
      showErrorMessage()
    else
    {
      setUser(response)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response))
      blogService.setToken(response.token)
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }

  const handleNewNote = async () => {
    const response = await blogService.createNewNote(newBlog)
    if (!response){
      setError('Failed to add blog')
      return setTimeout(() => setError(''), 2000)
    }
    setError(`Added a new blog: ${response.title} by ${response.author}`)
    setTimeout(() => setError(''), 2000)
    setBlogs(blogs.concat(response))
    setNewBlog({title: '', author: '', url: ''})
  }

  if (user === null) {
    return (
      <div >
      <h1>Log in to application</h1>
      {error === null ?  null : <h2 style={{border: '2px solid red', backgroundColor: 'grey', color:'red'}}>{error}</h2>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
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

      <h2>Create new</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={newBlog.title} onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}/>
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input type="text" name="author" value={newBlog.author} onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}/>
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input type="text" name="url" value={newBlog.url} onChange={(e) => setNewBlog({...newBlog, url: e.target.value})}/>
      </div>
      <button onClick={handleNewNote}>create</button>
      {blogs.map(blog => 
      <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
}