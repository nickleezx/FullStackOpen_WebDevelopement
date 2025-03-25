function Persons({persons, filterName}) {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()));
    
    return (
        <>
            {filtered.map((person, index) => <div key={index}>{person.name} {person.number}</div>)}
        </>
    )
}

export default Persons