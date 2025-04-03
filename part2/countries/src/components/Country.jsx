import Weather from "./Weather"

const Country = ({country}) => {


    return (
        <>
            <h2>{country.name.common}</h2>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map((lang,index) => <li key={index}>{lang}</li>)}
            </ul>

            <img src={country.flags.png} alt={`${country.name.common} flag`} />

            <Weather country={country}/>
        </>
    )
}

export default Country