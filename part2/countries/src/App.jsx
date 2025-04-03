import { useState } from 'react';
import { useEffect } from 'react';
import Countries from './components/Countries';
import Filter from './components/Filter';
import CountryServices from './services/CountryServices';
import { all } from 'axios';

function App() {

    const [filter, setFilter] = useState('');
    const [countries, setCountries] = useState([])
    const [allCountries, setAllCountries] = useState([])

    useEffect(() => {
        CountryServices.fetchAllCountries().then(response => setAllCountries(response))
    }, [])

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        const filtered = allCountries.filter(c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
        setCountries(filtered)
    }


    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>

            <Countries 
                countries={countries}
                setCountries={setCountries}
            ></Countries>
        </div>
    )
}

export default App
