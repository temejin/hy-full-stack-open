import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'


const Weather = ({location}) => {
  const [weather,setWeather] = useState(null)
  const iconUrl = "https://openweathermap.org/img/wn"

  useEffect(() => {
      weatherService.getWeather(location)
        .then(weatherData => setWeather(weatherData)
        )},[])

  console.log(weather)
  if (weather) {
    const icon = weather.weather[0].icon
    return (
      <div>
        <h3>Weather in {location}</h3>
        <p>{weather.weather[0].description}, temperature {weather.main.temp} °C</p>
        <img src={`${iconUrl}/${icon}@2x.png`} />
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

const Country = ({country}) => {
  console.log(country)

  const getLanguages = (country) => {
    const langs = []
    const codes = Object.keys(country.languages)
    const languages = Object.values(country.languages)
    for (let i=0; i < codes.length; ++i) {
      langs.push({code: codes[i],language: languages[i]})
    }
    return langs
  }

  const countryLanguages = getLanguages(country)
  console.log(countryLanguages)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {countryLanguages.map(l => <li key={l.code}>{l.language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    <Weather location={country.capital[0]}/>
    </div>
  )
}

const CountryList = ({nappi, countryList}) => {
  const showCountry = (country) => {
    console.log(country)
    return (
      <div>
        <Country country={country} />
      </div>
    )
  }
    
  if (countryList.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countryList.length > 1) {
    return (
      <div>
        {countryList.map(c => <p>{c.name.common}   
                                 <button type="submit"
                                         onClick={() => nappi(c.name.common)}>show</button>
                              </p>)}
      </div>
    )
  } else if (countryList.length == 0) {
    return (
      <div>
        No countries match filter
      </div>
    )
  } else {
    console.log(countryList[0])
    return (
      <div>
        <Country country={countryList[0]} />
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    console.log(searchTerm)
  }

  const findCountry = (c) => {
    console.log(c)
  }

  const filterCountries = (c) => {
    return c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) || c.name.official.toLowerCase().includes(searchTerm.toLowerCase())
  }

  useEffect(() => {
      countryService.getAll()
        .then(initialCountries => setCountries(initialCountries)
        )},[])

  if (countries && countries.length > 0) {
    return (
      <div>
        <h1>Countries</h1>
          <div>find countries <input onChange={handleSearchChange} /></div>
        <CountryList nappi={setSearchTerm} countryList={countries.filter(filterCountries)} />
      </div>
    )
  }

  return (
    <div>
      <h1>Countries</h1>
      <div>find countries <input onChange={handleSearchChange} /></div>
    </div>
  )
}

export default App
