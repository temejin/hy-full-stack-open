import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}> {props.text} </button>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const total = good + neutral + bad
  const average = (good + -1*bad) / total
  const positive = 100 * good / total
  if (total > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <thead></thead>
          <tbody>
            <tr><StatisticsLine text="good" value={good} /></tr>
            <tr><StatisticsLine text="neutral" value={neutral} /></tr>
            <tr><StatisticsLine text="bad" value={bad} /></tr>
            <tr><StatisticsLine text="all" value={total} /></tr>
            <tr><StatisticsLine text="average" value={average} /></tr>
            <tr><StatisticsLine text="positive" value={positive} /><td>%</td></tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return ( <div> <p>No feedback given</p></div> )
  }
}

const StatisticsLine = ({text,value}) => {
  return (
    <>
      <td>{text}</td><td>{value}</td>
    </>
  )
}

const App = () =>  {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addFeedback = (feedback) => {
    switch (feedback) {
      case 'good':
        console.log('hyvää oli')
        setGood(good + 1)
        break;
      case 'neutral':
        console.log('ei erityisempi')
        setNeutral(neutral + 1)
        break;
      case 'bad':
        console.log('kammottavaa')
        setBad(bad+1)
        break;
      }
    }

  const handleClick = (feedback) => {
    const handler = () => addFeedback(feedback)
    return handler
  }

  return (
    <div>
      <h1> Give feedback </h1>
      <Button handleClick={handleClick('good')} text = 'good' />
      <Button handleClick={handleClick('neutral')} text = 'neutral' />
      <Button handleClick={handleClick('bad')} text = 'bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
