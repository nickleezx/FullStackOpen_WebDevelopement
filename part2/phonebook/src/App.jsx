import { useState } from 'react';
import {Filter, Form, Persons} from './components/index';

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '040-1234567'
        }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');

    const handleFilterChange = (e) => setFilterName(e.target.value);

    

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
            
            <h3>Add a new</h3>
            <Form 
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                persons={persons}
                setPersons={setPersons}
            />

            <h3>Numbers</h3>

            <Persons persons={persons} filterName={filterName}/>
            
        </div>
    )
}

export default App