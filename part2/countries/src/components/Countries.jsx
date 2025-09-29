import Country from './Country'

const Countries = ({ country, countries, data }) => {
    if (country) {
        return(
            <Country data={data} country={country}/>
        )
    }
    else {
        if (countries.length > 10) {
            return (
                <>Too many matches, specify another filter</>
            )
        }
        else {
            return (
                countries.map(country =>
                    <div key={country}>
                        {country} <br />
                    </div>
                )
            )
        }
    }
}

export default Countries