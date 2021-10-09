import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = ({ city }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const url = `${process.env.REACT_APP_WEATHER_URL}&query=${city}`
    axios
      .get(url)
      .then(res => {
        console.log(res)
        if ('success' in res.data && !res.data.success) {
          return
        } else {
          setData(res.data)
        }
      })
  }, [city])

  if (!data) {
    return <>Loading weather data...</>
  }

  return (
    <>
      <div>
        <b>temperature: </b>
        {data.current.temperature} Celcius
      </div>

      <img alt="weather" src={data.current.weather_icons[0]} />

      <div>
        <b>wind: </b>
        {data.current.wind_speed} km/h direction {data.current.wind_dir}
      </div>
    </>
  )
}

export default Weather
