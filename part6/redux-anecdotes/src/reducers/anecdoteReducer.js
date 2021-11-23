import anecdoteService from '../services/anecdoteService'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      return state.map((a) => {
        if (a.id === action.data.id) {
          return { ...a, votes: a.votes + 1 }
        }
        return a
      })
    case 'NEW_ANECDOTE':
      return state.concat(action.data.anecdote)
    case 'INIT_ANECDOTE':
      return action.data.anecdotes
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: { anecdote },
    })
  }
}

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: { anecdotes },
    })
  }
}

export default reducer
