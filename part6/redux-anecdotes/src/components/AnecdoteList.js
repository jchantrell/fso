import { vote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'  


const AnecdoteList = () => {
    const dispatch = useDispatch()  
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const sortedAnecdotes = [...anecdotes].sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))


    const showNotification = (anecdote) => {
        dispatch(displayNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>has {anecdote.votes}
                        <button onClick={() => {
                            dispatch(vote(anecdote))
                            showNotification(anecdote)}}>
                            vote
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList