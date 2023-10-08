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

const Paragraph = ({ name, value }) => {
  return (
    < div >
      <p>{name} {value}</p>
    </div >
  )

}
const Total_and_measures = ({ value_v }) => {
  const sumAll = () => {
    return value_v[0] + value_v[1] + value_v[2]
  }
  const totalValue = () => {
    return value_v[0] - value_v[2]
  }
  const averageValue = () => {
    if (sumAll() != 0)
      return totalValue() / (sumAll())
    else
      return 0
  }
  const positivePercentage = () => {
    if (sumAll() != 0)
      return 100 * (value_v[0] / (sumAll()))
    else
      return 100
  }
  return (
    <div>
      <Paragraph name={'all'} value={sumAll()} />
      <Paragraph name={'average'} value={averageValue()} />
      <Paragraph name={'positive'} value={positivePercentage().toString() + ' %'} />

    </div>
  )
}

const Statistics = ({ name_v, value_v }) => {
  return (
    <div>
      <h1>statistics</h1>
      <Paragraph name={name_v[0]} value={value_v[0]}></Paragraph>
      <Paragraph name={name_v[1]} value={value_v[1]}></Paragraph>
      <Paragraph name={name_v[2]} value={value_v[2]}></Paragraph>
      <Total_and_measures value_v={value_v} />
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