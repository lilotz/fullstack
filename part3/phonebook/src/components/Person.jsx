import personService from '../services/persons'

const Person = ({ id, name, number, setErrorMessage }) => {
  
  const deletePerson = () => {
    if (confirm(`Delete '${name}'?`)) {
      personService.deletePerson(id)
      .catch(error => {
                        setErrorMessage(`Information of ${name} has already been removed from server`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
    }
  }

  return (
    <>
      {name} {number} &nbsp;
      <button onClick={deletePerson}>delete</button> <br />
    </>
  )
}

export default Person