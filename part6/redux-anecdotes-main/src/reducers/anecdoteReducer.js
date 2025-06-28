import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../service/anecdote'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotes = anecdotesAtStart.map(asObject)

// const reducer = (state = anecdotes, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     case 'INCREMENT': {
//       const id = action.payload.id 
//       const anecdoteToEdit = state.find(anecdote => anecdote.id === id)
//       anecdoteToEdit.votes = anecdoteToEdit.votes + 1
//       return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteToEdit)
//     }
//     case 'NEW_ANECDOTE': {
//       return state.concat(action.payload)
//     }
//     default:
//       return state
//   }

// }

// export const addOneVote = (id) => {
//   return {
//     type: "INCREMENT",
//     payload: {
//       id: id
//     }
//   }
// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: asObject(anecdote)
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    addOneVote(state, action) {
      const id = action.payload
      const anecdoteToEdit = state.find(anecdote => anecdote.id === id)
      const newAnecdote = {...anecdoteToEdit, votes: anecdoteToEdit.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
    },
    setAll(state, action) {
      return action.payload
    }
  }

})

export const {createAnecdote, addOneVote, setAll} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch(setAll(data))
  }
}

export const createOneAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createOneAnecdote(content)
    dispatch(createAnecdote(data))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const response = await anecdoteService.addOneVoteToAnecdote(anecdote.id, anecdote)
    dispatch(addOneVote(response.id))
  }
}

export default anecdoteSlice.reducer