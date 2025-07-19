import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../services/anecdotes"
import { useContext } from "react"
import NotificationContext from "../contexts/NotifcationContext"
import { notifyCreate, notifyReset, notifyError } from "../contexts/NotifcationContext"

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate(content)
    
}
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch(notifyCreate(newAnecdote.content))
      setTimeout(() => dispatch(notifyReset), 5000)
    },
    onError: (error) => {
      dispatch(notifyError(error.response.data.error))
      setTimeout(() => dispatch(notifyReset), 5000)
    }
    // onSuccess: () => queryClient.invalidateQueries({queryKey: ['anecdotes']})
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
