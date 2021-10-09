import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [matches, setMatches] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  useEffect(() => {
    if (!filterValue) setMatches(countries)
    else {
      const found = countries
        .filter(country =>
          country.name.common
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      setMatches(found)
    }
  }, [countries, filterValue])

  const handleFilterUpdate = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <>
      <div>
        find countries
        <Filter value={filterValue} onChange={handleFilterUpdate} />
      </div>

      <Countries countries={matches} />
    </>
  )
}

export default App
