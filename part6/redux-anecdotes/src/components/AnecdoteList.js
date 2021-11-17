import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const orderedAnecdotes = useMemo(() => {
    return [...anecdotes].sort((a, b) => a.votes - b.votes)
  }, [anecdotes])

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)

    dispatch(voteAnecdote(id))
    setNotification(dispatch, `you voted '${anecdote.content}'`)
  }

  return (
    <>
      {orderedAnecdotes.map((anecdote) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
