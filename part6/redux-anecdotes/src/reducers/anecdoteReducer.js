import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
    initialState,
    reducers: {
        appendAnecdote: {
          reducer: (state, action) => {
          state.push(action.payload)
          },
        },
        setAnecdotes: {
          reducer: (state, action) => {
            return action.payload
          },
        },
        updateAnecdote: {
          reducer: (state, action) => {
            return state.map(a =>
              a.id !== action.payload.id ? a : action.payload
            )
          },
        },
    },
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const newAnecdote = await anecdotesService.update(anecdote.id, updatedAnecdote)
    dispatch(updateAnecdote(newAnecdote))   
  }
}

export default anecdoteSlice.reducer


