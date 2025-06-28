import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createOneAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const addOneVoteToAnecdote = async (id, anecdote) => {
  const newAnecdote = {...anecdote, votes: anecdote.votes + 1}

  const url = `${baseUrl}/${id}`

  const response = await axios.put(url, newAnecdote)
  return response.data
}

export default { getAll, createOneAnecdote, addOneVoteToAnecdote }