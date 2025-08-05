import { useState } from "react"

export default function BlogForm({createBlog, blogFormRef}) {
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  const handleNewNote = async () => {
    await createBlog(newBlog)
    setNewBlog({title: '', author: '', url: ''})
    
  }

  return (
    <>
      <h2>Create new</h2>

      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input type="text" name="author" value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input type="text" name="url" value={newBlog.url} onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })} />
      </div>

      <button onClick={handleNewNote}>create</button>
    </>
  )
}