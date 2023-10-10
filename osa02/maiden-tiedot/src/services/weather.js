import axios from 'axios'
const api_key = import.meta.env.VITE_OWM_KEY
const baseUrl = "http://api.openweathermap.org"

const getCoordinates = (locationName) => {
  const request = axios.get(`${baseUrl}/geo/1.0/direct?q=${locationName}&limit=1&appid=${api_key}`)
  return request.then((response) => {
    const latitude = response.data[0].lat
    const longitude = response.data[0].lon
    return { lat: latitude, lon: longitude }
  })
}

const getWeather = (locationName) => {
  return getCoordinates(locationName)
    .then(coords => {
      return axios.get(`${baseUrl}/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${api_key}&units=metric`)
        .then(response => response.data)
    })
}

export default {getWeather}
