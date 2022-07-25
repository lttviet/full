import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genres, setGenres] = useState(null)
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data && !genres) {
      const allGenres = result.data.allBooks.reduce(
        (prev, curr) => prev.concat(
          curr.genres.filter((item) => prev.indexOf(item) < 0)
        ),
        []
      )
      setGenres(allGenres)
    }
  }, [result.data, genres])

  const filterByGenre = async (genre) => {
    await result.refetch({ genre })
  }

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button key={genre} onClick={() => filterByGenre(genre)}>{genre}</button>
      ))}
    </div>
  )
}

export default Books
