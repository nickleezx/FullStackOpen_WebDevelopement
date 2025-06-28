import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { updateMessage, removeMessage } from "../reducers/notificationReducer"

export default function AnecdoteForm () {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    clearTimeout()
    e.preventDefault()
    const action = createAnecdote(e.target.anecdote.value)
    dispatch(action)
    dispatch(updateMessage(`Created anecdote '${e.target.anecdote.value}'`))
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