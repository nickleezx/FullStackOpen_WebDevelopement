import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

export default function AnecdoteForm () {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = createAnecdote(e.target.anecdote.value)
    e.target.anecdote.value = ""
    dispatch(action)

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