const ListOfCountries = ({ country, setCountry }) => {
    const showCountry = () => {
        setCountry(country)
    }

    return (
        <>{country} &nbsp;
            <button onClick={showCountry}>Show</button>
            <br />
        </>
    )
}

export default ListOfCountries