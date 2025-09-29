import Weather from './Weather'

const Country = ({ data, country }) => {
    const languages = Object.values(data.languages ?? {})
    const flags = Object.values(data.flags ?? {})
    const capital = Object.values(data.capital ?? {})

    return (
        <div>
            <h1>
                {country}
            </h1>
            <>Capital: {data.capital} <br />
                Area: {data.area}</>
            <h2>
                Languages
            </h2>
            <ul>
                {languages.map(language =>
                    <li key={language}>
                        {language}
                    </li>
                )}
            </ul>
            <img src={flags[0]} />
            <Weather capital={capital}/>

        </div>
    )
}

export default Country