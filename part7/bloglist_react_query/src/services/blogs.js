import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createNewNote = async (newNote) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, newNote, config)
    return response.data
  } catch (error) {
    return null
  }
}

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  return response.data
}

const deleteBlog = async (blogId) => {
  const config ={
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.status
}

const addComments = async (comments, blogId) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comments } ,config)
    return response.data
}

export default {
  getAll,
  setToken,
  createNewNote,
  updateBlog,
  deleteBlog,
  addComments
}

