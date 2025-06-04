import { useState } from "react"

export default function Blog({blog, updateLikes, userId, deleteBlog}) {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = {display: visible ? '' : 'none'}

  const blogStyle = {
    border: '1px solid black',
    margin: '4px 0',
    padding: '10px 0'
  }

  const handleLike = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    updateLikes(updatedBlog)
  }

  const handleDelete = () => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`))
        return
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <p style={{display:'inline'}}>{blog.title} {blog.author}</p>
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p style={{display:'inline'}}>{blog.likes}</p>
        <button onClick={handleLike}>like</button>
        <p>{blog.author}</p>
        <button style={{display: userId === blog.user.id ? "" : "none"}} onClick={handleDelete}>Remove</button>
      </div>
    </div>
  )
}