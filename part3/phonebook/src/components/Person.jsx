import personService from '../services/persons'

const Person = ({ id, name, number, setUpdateMessage, setErrorMessage }) => {

  const deletePerson = () => {
    if (confirm(`Delete '${name}'?`)) {
      personService.deletePerson(id)
        .then(() => {
          setUpdateMessage(`${name} has been deleted`)

          setTimeout(() => {
            setUpdateMessage(null)
          }, 5000)
        })
        .catch(() => {
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