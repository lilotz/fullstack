const Filter = ({newFilter, setNewFilter}) => {
    const addNewFilter = (event) => {
    event.preventDefault()
       setNewFilter(newFilter)
    }
    
    const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

    return (
        <form onInput={addNewFilter}>
      <div>
        filter shown with <input 
        value={newFilter}
        onChange={handleFilterChange}/>
      </div>
      </form>
    )
}

export default Filter