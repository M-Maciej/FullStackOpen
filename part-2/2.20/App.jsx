import { useState, useEffect } from 'react'
import axios from 'axios'


const CountryView = ({ countryMatchTriple, isMain }) => {
  const [showView, setShowView] = useState(isMain)
  const [weather, setWeather] = useState(null)
  const toggleView = () => {
    setShowView(!showView)
  }
  const imgStyle = {
    maxHeight: "100px",
    height: "auto"
  }
  const country = countryMatchTriple.originalObject
  const match = countryMatchTriple.match
  const key = countryMatchTriple.key
  const previousKey = countryMatchTriple.previousKey
  const api_key = import.meta.env.VITE_SOME_KEY
  const baseURL = 'https://api.openweathermap.org/data/3.0/onecall?'
  console.log(Object.values(country.latlng))
  if (showView) {
    axios
      .get(`${baseURL}lat=${Object.values(country.latlng)[0]}&lon=${Object.values(country.latlng)[1]}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
        console.log(response)
      })
  }


  return (
    <>
      {showView
        ?
        <div>
          <h3>{country.name.common}</h3>



          {country.name.common !== match
            ? (
              <>
                {(previousKey != "altSpellings") && (previousKey != "name") ?
                  (
                    <>
                      in &apos;{previousKey}&apos; {key}: {match}

                    </>
                  )
                  :
                  (
                    <>
                      {previousKey != "altSpellings"
                        ?
                        (
                          <>
                            {key} {previousKey}: {match}
                          </>
                        )
                        :
                        (<>
                          alternative name: {match}
                        </>)
                      }
                    </>
                  )}
                <br></br>
              </>
            ) : null}

          {isMain ? (null)
            : (
              <>
                <button onClick={() => toggleView()}>Hide</button>
                <br></br>
              </>
            )}

          capital {country.capital}
          <br />
          area {country.area}
          <br />
          <br />
          Languages:
          <ul>
            {Object.values(country.languages).map(langauge => (
              <li key={langauge}>{langauge}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt="flag" style={imgStyle} />
          {weather
            ?
            (
              <>
                <h4>Waether in {country.capital}</h4>
                temperature {weather['current']['temp']}
                <img src={`https://openweathermap.org/img/wn/{weather['current']['weather']['id']}d@2x.png`}></img>
                {weather['current']['wind_speed']}

              </>
            )
            :
            null
          }


        </div>
        : (
          <div>
            {match}
            <button onClick={() => toggleView()}>Show</button>
          </div>)
      }
    </>
  )
}

const Countries = ({ arrayCountries }) => {
  //console.log(Object.values(arrayCountries)['match'])
  if (arrayCountries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  else if (arrayCountries.length == 1) {
    return (
      <CountryView countryMatchTriple={arrayCountries[0]} isMain={true} />
    )
  }
  else {
    const ulStyle = {
      listStyleType: "none",
      padding: 0,
      margin: 0
    }
    return (
      <ul style={ulStyle}>
        {
          arrayCountries.map(countryMatchTriple => (
            <CountryView key={countryMatchTriple.match} countryMatchTriple={countryMatchTriple} isMain={false} />
          ))
        }
      </ul >
    )
  }
}



const App = () => {
  const [country, setCountry] = useState(null)
  //const [search, setSearch] = useState(null)
  const [value, setValue] = useState(``)
  const [apiData, setApiData] = useState(null)


  useEffect(() => {

    console.log(`requesting api`)
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(result => {
        setApiData(result.data)
      })
      .catch((error) => {
        console.log(`Error fetching data: ${error.message}`)
        setCountry('no results')
      })
      .finally(() => {
        console.log(`ended fetching api data`)
      });





  }, [])

  function findMatchesInArrayOfObjects(arrayOfObjects, searchString) {
    searchString = searchString.toLowerCase()
    const goodKeys = ['name', 'altSpellings', 'translations']
    function searchInObject(obj, parentObj, previousKey) {
      for (const [key, value] of Object.entries(obj)) {
        if (obj === parentObj) {
          if (!goodKeys.find(entry => entry == key)) {
            continue
          }
        }
        if (typeof value === 'string') {
          const value2 = value.toLowerCase()
          if (value2.includes(searchString))
            return { originalObject: parentObj, match: value, previousKey: previousKey, key: key };
        } else if (typeof value === 'object') {
          const result = searchInObject(value, parentObj, key);
          if (result) return result;
        }
      }
      return null;
    }
    return arrayOfObjects.reduce((acc, obj) => {
      const result = searchInObject(obj, obj);
      if (result) acc.push(result);
      return acc;
    }, []);
  }




  const handleChange = (event) => {
    const val = event.target.value
    const matches = findMatchesInArrayOfObjects(apiData, val)
    setValue(val)
    setCountry(matches)
    console.log(matches)
  }

  return (
    <div>
      <input value={value} onChange={handleChange}></input>
      <div>

        {country
          ? <Countries arrayCountries={country} />
          : 'search for countries'}
      </div>
    </div>
  )
}

export default App
