import { React, useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client/react'

import AuthorForm from './components/AuthorForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommend from './components/Recommend'

function App() {
  const [errorMessage, setErrorMessage] = useState('')
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    // go back to 'authors' page after logging in
    if (token) {
      setPage('authors')
    }
  }, [token])

  const notify = (message) => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {(token === null) ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <AuthorForm show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={notify} />
      <Recommend show={page === 'recommend'} />

      <LoginForm show={page === 'login'} setToken={setToken} setError={notify} />
    </div>
  )
}

export default App;
