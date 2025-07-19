import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateVote } from './services/anecdotes'
import { useContext } from 'react'
import NotificationContext from './contexts/NotifcationContext'
import { notifyVote, notifyReset } from './contexts/NotifcationContext'

const App = () => {

  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const filtered = anecdotes.map( a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
      queryClient.setQueryData(['anecdotes'], filtered)
      dispatch(notifyVote(updatedAnecdote.content))
      setTimeout(() => dispatch(notifyReset()), 5000)
    }
  })

  if (result.isLoading) {
    return (
      <div>loading data...</div>
    )
  }

  if (result.isError) {
    return (
      <div>anecdote service not available due to problems in server</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
