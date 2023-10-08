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
const Anecdote_display = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const [selected, setSelected] = useState(Math.floor((Math.random() * anecdotes.length)))
  const [allVotes, setAllVotes] = useState({ [selected]: 0 })

  const selectRandomAnecdote = () => {
    let vote_number_temp = selected
    let i = 0
    while (vote_number_temp == selected && i < 100) {
      vote_number_temp = Math.floor((Math.random() * anecdotes.length))
      i++
      //console.log(i)
    }
    const vote_number = vote_number_temp
    setSelected(vote_number)
    if (!(vote_number in allVotes)) {
      const new_allVotes = {
        ...allVotes,
        [vote_number]: 0
      }
      setAllVotes(new_allVotes)
    }
  }
  const addVote = () => {
    const copy = { ...allVotes }
    copy[selected] += 1
    setAllVotes(copy)
  }
  return (
    < div >
      <Anecdote_display text={anecdotes[selected]} votes={allVotes[selected]} />
      <Button name={'vote'} handleClick={addVote} />
      <Button name={'next anecdote'} handleClick={selectRandomAnecdote} />
    </div >
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]



  const setters = [() => setGood(good + 1), () => setNeutral(neutral + 1), () => setBad(bad + 1)]
  const names = ['good', 'neutral', 'bad']
  const values = [good, neutral, bad]
  return (
    <div>
      <GiveFeedback funcs_v={setters} name_v={names} />
      <Statistics value_v={values} name_v={names} />
      <Anecdote anecdotes={anecdotes} />
    </div>
  )
}

export default App