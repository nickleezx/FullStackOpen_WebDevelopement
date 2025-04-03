import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

function fetchCountries(name) {
    if (name === null) return null;

    return axios
        .get(`${baseUrl}/name/${name}`)
        .then((response) => response.data);
}

function fetchAllCountries() {
    return axios
        .get(`${baseUrl}/all`)
        .then((response) => response.data);
}

export default { fetchCountries, fetchAllCountries };
