const Course = ({ course }) => {
    const sum = 0
    const exercises = course.parts.map (part => part.exercises)
    const total = exercises.reduce((acc, cur) => acc + cur, sum)
    return (
        <div>
            <h1> {course.name} </h1>
            {course.parts.map (part =>
                <p key ={part.id}> {part.name} {part.exercises}</p>
            )}
            <p>total of {total} exercises</p>
        </div>
    )
}

export default Course