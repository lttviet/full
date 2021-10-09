import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>

      <div>
        capital {country.capital.join(', ')}
      </div>
      <div>
        population {country.population}
      </div>

      <h3>languages</h3>

      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>

      <div>
        <img alt="country flag" src={country.flags.svg} width="100px" />
      </div>

      <h3>Weather in {country.capital[0]}</h3>
      <Weather city={country.capital[0]} />
    </>
  )
}

export default Country
