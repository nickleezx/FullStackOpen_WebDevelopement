const Filter = ({filter, handleFilterChange}) => {
    
    
    return (
        <>
            Find countries
            <input type="text" value={filter} onChange={handleFilterChange}/>
        </>
    )
}

export default Filter