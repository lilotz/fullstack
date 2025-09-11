import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Statistics = () => {
  return (
    <div>
      <h1>statistics</h1>
    </div>
  )
}

const Button = (props) => {
  return (
  <button onClick={props.onClick}>{props.text}
  </button>
  )
}

const StatisticsLine = (props) => {
  return (
      <tr>
        <td>{props.name}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const SumOfClicks = ({sumGood, sumNeutral, sumBad}) => {
  const total = sumGood+sumNeutral+sumBad
  const avg = ((1*sumGood + (-1)*sumBad)/total)
  const percentage = (sumGood/total)*100
  if (total == 0) {
    return (
      <div>
        No feedback was given
      </div>
    )
  }

  return (
      <table>
        <tbody>
          <StatisticsLine name='good' value={sumGood} />
          <StatisticsLine name ='neutral' value ={sumNeutral} />
          <StatisticsLine name ='bad' value ={sumBad} />
          <StatisticsLine name ='all' value ={total} />
          <StatisticsLine name ='average' value ={avg} />
          <StatisticsLine name ='positive' value ={`${percentage} %`} />
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButton = () => {
    console.log('clicked the good button')
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralButton = () => {
    console.log('clicked the neutral button')
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadButton = () => {
    console.log('clicked the bad button')
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <Header />
      <Button onClick={handleGoodButton} text = 'good'/>
      <Button onClick={handleNeutralButton} text='neutral' />
      <Button onClick={handleBadButton} text='bad' />
      <Statistics />
      <SumOfClicks sumGood={good} sumNeutral={neutral} sumBad={bad} />
    </div>
  )
}

export default App