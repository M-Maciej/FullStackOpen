const Part = (props) => {
  return (
    <>
      <p>
        {props.arg1} {props.arg2}
      </p>
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part arg1={props.part1} arg2={props.exercises1} />
      <Part arg1={props.part2} arg2={props.exercises2} />
      <Part arg1={props.part3} arg2={props.exercises3} />
    </div>
  )
}
const Total = (props) => {
  return (
    <>
      < p >
        Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
      </p >
    </>

  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App
