import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data
}

export const addAnecdote = async (content) => {
  const response = await axios.post(baseUrl, {
    content,
    votes: 0
  })
  return response.data
}

export const updateVote = async (anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`
  const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(url, newAnecdote)
  return response.data
}