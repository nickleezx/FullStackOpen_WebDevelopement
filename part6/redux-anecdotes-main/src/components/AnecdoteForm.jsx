import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { createOneAnecdote } from "../reducers/anecdoteReducer"

export default function AnecdoteForm () {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const action = createAnecdote(e.target.anecdote.value)
    // dispatch(action)
    dispatch(createOneAnecdote(e.target.anecdote.value))
    dispatch(createNotification(`Created anecdote '${e.target.anecdote.value}'`, 5))
    e.target.anecdote.value = ""
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