import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, voteAnecdote, setNotification }) => {
  const orderedAnecdotes = useMemo(() => {
    return [...anecdotes].sort((a, b) => a.votes - b.votes)
  }, [anecdotes])

  const vote = (anecdote) => {
    voteAnecdote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`, 5)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter((a) => a.content.includes(state.filter)),
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, setNotification }
)(AnecdoteList)
