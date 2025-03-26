import PersonService from "../services/PersonService";

function Persons({ persons, filterName, setPersons }) {
    
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()));

    const handleDelete = (person) => {
        if (confirm(`Delete ${person.name}?`)) 
        PersonService.deletePerson(person.id)
            .then(response => {
                setPersons(persons.filter(person => person.id !== response.id))
            })
            .catch(e => console.log(e.message));
    }

    return (
        filtered.map(person => {
            return (
                <div key={person.id}>
                    <div style={{
                        display: 'inline-block',
                        margin: '8px'
                    }}>{person.name} {person.number}</div>
                    <button onClick={() => handleDelete(person)}>delete</button>
                </div>
            )
        })
    )
}

export default Persons