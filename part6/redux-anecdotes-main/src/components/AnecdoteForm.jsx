import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { updateMessage, removeMessage } from "../reducers/notificationReducer"
import anecdoteService from '../service/anecdote'

export default function AnecdoteForm () {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    clearTimeout()
    e.preventDefault()
    // const action = createAnecdote(e.target.anecdote.value)
    // dispatch(action)
    const newAnecdote = await anecdoteService.createOneAnecdote(e.target.anecdote.value)
    dispatch(createAnecdote(newAnecdote))
    dispatch(updateMessage(`Created anecdote '${newAnecdote.content}'`))
    e.target.anecdote.value = ""
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000);
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} >
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
      </form>
    </>
  )
}