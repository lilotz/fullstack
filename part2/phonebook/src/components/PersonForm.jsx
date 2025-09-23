import axios from 'axios'
import personService from '../services/persons'

const PersonForm = ({ persons, newName, newNumber, setNewName, setNewNumber, setPersons }) => {
    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }

        if (persons.some(person => person.name === nameObject.name)) {
            alert(`${newName} is already added to phonebook`)
        }
        else {
            setPersons(persons.concat(nameObject))
        }

        personService
            .create(nameObject)
            .then(returnedPerson => {
                console.log(returnedPerson)
            })

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addName}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange} />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm