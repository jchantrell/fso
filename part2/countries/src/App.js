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
      <Filter filter={filter} handleFilter={handleFilter} />
      <Countries countries={filteredCountries} filter={filter} setFilter={setFilter} filteredCountries={filteredCountries} />
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
    const country = props.countries[0]
    return (
      <CountryInfo country={country} />
    )
  }
  else return (
    <ul>
      {props.countries.map(country => 
        <Country key={country.name.common} country={country} filter={props.filter} setFilter={props.setFilter} filteredCountries={props.filteredCountries}/>
      )}
    </ul>
  )
}

const Country = (props) => {
  const country = props.country
  return (
    <div>
      <li>{country.name.common} 
      <Button handleClick={() => ShowCountry(country, props.setFilter)}
       text="show" /></li>
    </div>
  )
}

const ShowCountry = (country, setFilter) => {
  setFilter(country.name.common)
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.entries(languages).map(lang => 
        <Language key={lang[1]} language={lang[1]} />
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
  return (
    <div>
      <h2>{props.country.name.common}</h2>
      <p>Capital {props.country.capital}</p>
      <p>Areas {props.country.area}</p>
      <h4>Languages</h4>
      <Languages languages={props.country.languages} />
      <img src={props.country.flags.png} alt="flag"></img>
    </div>
  )
}

export default App