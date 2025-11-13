import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecodotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    changeVote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

const { setAnecdotes, createAnecdote, changeVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const updateAnecdotes = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    dispatch(changeVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer