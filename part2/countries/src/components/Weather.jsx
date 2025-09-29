import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({ capital }) => {
    const [data, setData] = useState({})
    const [city, setCity] = useState({})
    const [lat, setLat] = useState([])
    const [lon, setLon] = useState([])
    const [temp, setTemp] = useState(null)
    const [wind, setWind] = useState(null)
    const [speed, setSpeed] = useState(null)
    const [icon, setIcon] = useState(null)

    useEffect(() => {
        if (capital.length != 0) {
            axios
                .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=271f420961a04c8861c3e8ccd383bd98`)
                .then(response => {
                    const chosenCity = response.data[0]
                    setCity(chosenCity)
                    setLat(chosenCity.lat)
                    setLon(chosenCity.lon)
                })
        }
    }, [capital])

    useEffect(() => {
        if (lat.length != 0) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=271f420961a04c8861c3e8ccd383bd98`)
                .then(response => {
                    setData(response.data)
                })
        }
    }, [lat])

    useEffect(() => {
        if (Object.keys(data).length != 0) {
            const main = data.main
            setTemp(main.temp)
            const weather = data.weather[0]
            setWind(data.wind)
            setSpeed(data.wind.speed)
            setIcon(weather.icon)
        }
    }, [data])

    useEffect(() => {
        if (temp && wind && speed) {

        }
    }, [temp, wind, speed])

    return (
        <div>
            <h2>
                Weather in {capital}
            </h2>
            <>
                Temperature {temp} Celsius <br />
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} /> <br />

                Wind {speed} m/s
            </>
        </div>
    )

}

export default Weather