import { useEffect, useState } from "react";
import WeatherService from "../services/WeatherService"

const Weather = ({country}) => {
    const [lat, lng] = country.latlng;
    const [weatherInfo, setWeatherInfo] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            WeatherService.getWeather(country.latlng)
                    .then(response => setWeatherInfo(response))
                    .catch(e => console.log(e.response.data));
            console.log("effect ran");
        }, 3000)

        return () => {
            clearTimeout(timer);
        }
    }, [lat,lng])

    useEffect(() => {
        setWeatherInfo(null)
    }, [country])

    if (weatherInfo === null)
        return <p>loading...</p>

    return (
        <>
            <h3>Weather in {country.name.common}</h3>
            
            <p>Temperature: {weatherInfo.current.temp}</p>

            <img src={`https://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@2x.png`} alt="" />
            <p>wind {weatherInfo.current.wind_speed}</p>
        </>
    )
}

export default Weather