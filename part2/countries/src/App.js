import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Search countries</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <Countries countries={filteredCountries}/>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>      
      <input 
      value={props.filter} 
      onChange={props.handleFilter} />
    </div>
  )
}

const Countries = (props) => {
  if (props.countries.length > 10){
    return (
      <p>Too many matches</p>
    )
  }
  if (props.countries.length === 1){
    return (
      <CountryInfo country={props.countries} />
    )
  }
  else return (
    <ul>
      {props.countries.map(country => 
        <Country key={country.name.common} country={country} />
      )}
    </ul>
  )
}

const Country = ({ country }) => {
  return (
    <li>{country.name.common}</li>
  )
}

const Languages = ({ languages }) => {

  return (
    <ul>
      {languages.map(language => 
        <Language key={language.value} language={language.value} />
      )}
    </ul>
  )
}

const Language = ({ language }) => {
  return (
    <li>{language}</li>
  )
}

const CountryInfo = (props) => {
  const country = props.country[0]


  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Areas {country.area}</p>
      <h4>Languages</h4>
      <Languages languages={country.languages} />
      <img src={country.flags.png}></img>
    </div>
  )
}



export default App