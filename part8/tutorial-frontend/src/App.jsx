import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_PERSONS, FIND_PERSON } from "./queries/queries";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";


const Person = ({ person, onClose }) => {
    return (
        <div>
            <h2>{person.name}</h2>
            <div>
                {person.address.street} {person.address.city}
            </div>
            <div>{person.phone}</div>
            <button onClick={onClose}>close</button>
        </div>
    )

}

const Persons = ({ persons }) => {
    const [nameToSearch, setNameToSearch] = useState(null)
    const result = useQuery(FIND_PERSON, {
        variables: {nameToSearch},
        skip: !nameToSearch
    })

    if (nameToSearch && result.data) {
        return (
            <Person 
                person={result.data.findPerson}
                onClose={() =>setNameToSearch(null)}
            />
        )
    }

    return (
        <div>
            <h2>Persons</h2>
            {persons.map(p => (
                <div key={p.name}>
                    {p.name} {p.phone}
                    <button onClick={() => setNameToSearch(p.name)}>
                        show address
                    </button>
                </div>
            ))}
        </div>
    )
}

const Notify = ({message}) => {
    if (!message) {
     return null   
    }

    return (
        <div style={{color: "red"}}>
            {message}
        </div>
    )
}

const App = () => {
    const result = useQuery(ALL_PERSONS)
    const [showPersonForm, setShowPersonForm] = useState(false)
    const [showPhoneForm, setShowPhoneForm] = useState(false)
    const [error, setError] = useState(null)

    const notify = (message) => {
        setError(message)
        setTimeout(() => setError(null), 10000)
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <Notify message={error}/>
            <Persons persons={result.data.allPersons} />
            <div>
                {showPersonForm && <PersonForm setError={notify}/>}
                <button style={{display: "block"}} onClick={() => setShowPersonForm(!showPersonForm)}>{showPersonForm ? 'hide' : 'show'}</button>
                {showPhoneForm && <PhoneForm setError={notify}/>}
                <button style={{display: "block"}} onClick={() => setShowPhoneForm(!showPhoneForm)}>{showPhoneForm ? 'hide' : 'show'}</button>
            </div>
        </div>
    )

}

export default App