import personService from '../services/persons'

const PersonForm = ({ persons, newName, newNumber, setNewName, setNewNumber, setPersons, setUpdateMessage, setErrorMessage }) => {
    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }

        if(newName.length < 2 || newNumber.length < 2) {
            setErrorMessage('input is too short')

            setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
        }

        if (persons.some(person => person.name === nameObject.name)) {
            if (confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)) {
                const personToChange = persons.find(person => person.name === newName)
                const id = personToChange.id

                personService
                    .update(id, nameObject)

                setUpdateMessage(`${nameObject.name} has been updated`)

                setTimeout(() => {
                    setUpdateMessage(null)
                }, 5000)
            }
        }
        else {
            personService
                .create(nameObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })

            setUpdateMessage(`${nameObject.name} has been added`)
            setTimeout(() => {
                setUpdateMessage(null)
            }, 5000)
        }

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