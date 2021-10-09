import React, { useEffect, useState } from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
  const [show, setShow] = useState([])

  useEffect(() => {
    if (countries.length > 1 && countries.length < 11) {
      setShow(new Array(countries.length).fill(false))
    }
  }, [countries])

  const toggleShow = (index) => {
    const newShow = show.map((v, i) => i === index ? !v : v)
    setShow(newShow)
  }

  if (countries.length > 10) {
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map((country, index) =>
          <div key={country.name.common}>
            {country.name.common}

            <button onClick={() => toggleShow(index)}>
              {show[index] ? "hide" : "show"}
            </button>

            {show[index] &&
              <Country country={countries[index]} />
            }
          </div>
        )}
      </>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }

  return <>No countries matched</>
}

export default Countries
