import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    },
    removeBlog(state, action) {
      const blogIdToDelete = action.payload
      return state.filter(blog => blog.id !== blogIdToDelete)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.createNewNote(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.updateBlog(blog)
    dispatch(updateBlog(response))
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    await blogService.deleteBlog(blogId)
    dispatch(removeBlog(blogId))
  }
}

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer