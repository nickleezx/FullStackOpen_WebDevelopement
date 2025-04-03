import Country from "./Country";

const Countries = ({ countries, setCountries }) => {

    const handleClick = (c) => {
        setCountries([c])
    }

    if (countries.length === 0)
        return null

    if (countries.length > 10)
        return <p>Too many matches, specify another filter</p>

    else if (countries.length > 2 && countries.length < 11) {
        return countries.map((c, index) => {
            return (
                <div key={index}>
                    <p >{c.name.common}
                        <button onClick={() => handleClick(c)}>show</button>
                    </p>
                </div>
            )
        })
    }
    else {
        return <Country country={countries[0]} />
    }

}

export default Countries