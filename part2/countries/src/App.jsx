import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


const App = () => {
  const [filter, setFilter] = useState('')
  const [all, setAll] = useState([])
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [data, setData] = useState({})

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const names = response.data.map(country => country.name)
          const common = names.map(name => name.common)
          setAll(common)
        })
  }, [])
  
  useEffect(() => {
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setData(response.data)
        })
    }
  }, [country])

  const getCountries = (event) => {
    event.preventDefault()
    const list =
      all.filter(country => country.toLowerCase().includes(filter.toLowerCase()))

    setCountries(list)

    if (list.length == 1) {
      setCountry(list[0])
    }
    else{
      setCountry(null)
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <form onInput={getCountries}>
        find countries: <input
          value={filter}
          onChange={handleFilterChange}
        />
      </form>
      <Countries country={country} countries={countries} data={data} />
    </div>
  )
}

export default App