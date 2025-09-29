import Country from './Country'
import ListOfCountries from './ListOfCountries'

const Countries = ({ country, countries, data, setCountry }) => {
    if (country) {
        return (
            <Country data={data} country={country} />
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
                        <ListOfCountries country={country} setCountry={setCountry}/>
                    </div>
                )
            )
        }
    }
}

export default Countries