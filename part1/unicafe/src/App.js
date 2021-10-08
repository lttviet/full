import React, { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = good / all * 100 || 0

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const noFeedback = (good + neutral + bad) === 0

  return (
    <>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={increaseGood} />
      <Button text="Neutral" handleClick={increaseNeutral} />
      <Button text="Bad" handleClick={increaseBad} />

      <h1>Statistics</h1>
      {noFeedback
        ? <p>No feedback given</p>
        : <Statistic good={good} neutral={neutral} bad={bad} />
      }
    </>
  )
}

export default App
