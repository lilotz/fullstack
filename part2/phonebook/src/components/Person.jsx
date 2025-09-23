import personService from '../services/persons'

const Person = ({ id, name, number }) => {
  
  const deletePerson = () => {
    if (confirm(`Delete '${name}'?`)) {
      personService.deletePerson(id)
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