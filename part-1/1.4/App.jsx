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
      <Part arg1={props.parts[0].name} arg2={props.parts[0].exercises} />
      <Part arg1={props.parts[1].name} arg2={props.parts[1].exercises} />
      <Part arg1={props.parts[2].name} arg2={props.parts[2].exercises} />
    </div>
  )
}
const Total = (props) => {
  return (
    <>
      < p >
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p >
    </>

  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
