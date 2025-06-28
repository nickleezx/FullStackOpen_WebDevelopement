import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"


export default function AnecdoteList () {

  const anecdotes = useSelector(state => {
    const filter = state.filter
    const anecdotes = state.anecdotes

    if (filter === '') {
      return anecdotes.toSorted((a,b) => b.votes - a.votes)
    } else {
      const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      return filtered.toSorted((a,b) => b.votes - a.votes)
    }

  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote))
    dispatch(createNotification(`you voted '${anecdote.content}'`, 5))
  }
  
  return (
    <>
      {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </>)
}