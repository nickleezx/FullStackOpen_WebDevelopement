import axios from "axios"

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = ([lat, lng]) => {
    const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'
    return axios.get(`${baseUrl}lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`).then(response => response.data)

    
}

export default {getWeather}