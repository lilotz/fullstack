const Course = ({course}) => {
    const sum = 0
    const exercises = course.parts.map (part => part.exercises)
    const total = exercises.reduce((acc, cur) => acc + cur, sum)
    return(
        <div>
            <h1> {course.name} </h1>
            {course.parts.map (part =>
                <p> {part.name} {part.exercises}</p>
            )}
            <p>total of {total} exercises</p>
        </div>
    )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
        {courses.map(course =>
        <Course course={course} />)}
    </div>
    )    
}

export default App