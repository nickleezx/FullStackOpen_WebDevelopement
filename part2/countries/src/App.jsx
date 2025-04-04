import { _ } from 'lodash';
import { useState, useEffect, useRef } from 'react';
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
    
    const allCountriesRef = useRef(allCountries);
    useEffect(() => {
        allCountriesRef.current = allCountries; // Update ref whenever allCountries changes
    }, [allCountries]);

    // Debounced search function using useRef
    const debouncedSearch = useRef(
        _.debounce((e) => {
            console.log("search debouncing");

            // Use allCountriesRef to get the latest allCountries value
            const filtered = allCountriesRef.current.filter(c =>
                c.name.common.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setCountries(filtered);
        }, 500)
    ).current;

    // Handle filter change and trigger debounced search
    const handleFilterChange = (e) => {
        setFilter(e.target.value);  // Update the filter state
        debouncedSearch(e);  // Call the debounced function
    };


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
