import Person from './Person'

const Persons = ({ persons, setErrorMessage }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.id} id = {person.id} name={person.name} number={person.number} setErrorMessage={setErrorMessage} />
            )}
        </div>
    )
}

export default Persons