const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  console.log({parts})
  const sum = (acc,exercises) => acc += exercises
  return (
    <div>
      { parts.map(part => <Part part={part} />) }
      <b>Total of { parts.map(p => p.exercises).reduce(sum) } exercises</b>
    </div>
  )
}

const Part = ({part}) => {
  console.log({part})
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}


const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course
