import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const addNumber = (newContact) => {
    console.log(newContact)
    return axios.post(baseUrl, newContact)
    .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
            .then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson)
            .then(response => response.data)
}

const getAll = () =>{

}
``
export default {
    addNumber,
    getAll,
    deletePerson,
    updatePerson,
}