import { useState } from 'react'

const Button = ({ name, handleClick }) => {

  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}

const GiveFeedback = ({ funcs_v, name_v }) => {

  return (
    <div>
      <h1>give feedback</h1>
      <span>
        <Button name={name_v[0]} handleClick={funcs_v[0]}></Button>
        <Button name={name_v[1]} handleClick={funcs_v[1]}></Button>
        <Button name={name_v[2]} handleClick={funcs_v[2]}></Button>
      </span>
    </div>
  )
}

const StatisticLine = ({ name, value }) => {
  return (
    < tr >
      <td>{name} </td>
      <td> {value}</td>
    </tr >
  )

}
const Total_and_measures = ({ value_v, sumAll }) => {

  const totalValue = () => {
    return value_v[0] - value_v[2]
  }
  const averageValue = () => {
    if (sumAll() != 0)
      return (totalValue() / (sumAll())).toFixed(2)
    else
      return 0
  }
  const positivePercentage = () => {
    if (sumAll() != 0)
      return (100 * (value_v[0] / (sumAll()))).toFixed(2)
    else
      return 100
  }
  return (
    <>
      <StatisticLine name={'all'} value={sumAll()} />
      <StatisticLine name={'average'} value={averageValue()} />
      <StatisticLine name={'positive'} value={positivePercentage().toString() + ' %'} />

    </>
  )
}

const Statistics = ({ name_v, value_v }) => {
  const sumAll = () => {
    return value_v[0] + value_v[1] + value_v[2]
  }
  return (
    <div>
      <h1>statistics</h1>
      {sumAll() != 0 ? (
        <table>
          <tbody>
            <StatisticLine name={name_v[0]} value={value_v[0]}></StatisticLine >
            <StatisticLine name={name_v[1]} value={value_v[1]}></StatisticLine >
            <StatisticLine name={name_v[2]} value={value_v[2]}></StatisticLine >
            <Total_and_measures value_v={value_v} sumAll={sumAll} />
          </tbody>
        </table>
      ) : (<p>No feedback given</p>)}
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setters = [() => setGood(good + 1), () => setNeutral(neutral + 1), () => setBad(bad + 1)]
  const names = ['good', 'neutral', 'bad']
  const values = [good, neutral, bad]
  return (
    <div>
      <GiveFeedback funcs_v={setters} name_v={names} />
      <Statistics value_v={values} name_v={names} />
    </div>
  )
}

export default App