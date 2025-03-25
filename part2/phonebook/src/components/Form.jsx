const Form = function({newName, newNumber, setNewName, setNewNumber, persons, setPersons}){
    const handleNameChange = (e) => setNewName(e.target.value);

    const handleNumberChange = (e) => setNewNumber(e.target.value);

    const handleSubmit = function (e) {
            e.preventDefault();
            const newEntry = {
                name: newName,
                number: newNumber
            };
            const found = persons.find((element) => element.name === newName);
    
            if (found)
                alert(`${newName} is already added to phonebook`)
            else{
                setPersons(persons.concat(newEntry));
            }
    
            setNewName('');
            setNewNumber('');
    
    }

    return (
        <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} required/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} required/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    )
}

export default Form