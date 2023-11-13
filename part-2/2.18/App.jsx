import { useState, useEffect } from 'react'
import axios from 'axios'

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
    const country = arrayCountries[0].originalObject
    const imgStyle = {
      maxHeight: "100px",
      height: "auto"
    };
    return (
      <div>
        <h1>{country.name.common}</h1>
        {country.name.common !== arrayCountries[0].match ? (
          <h6>{arrayCountries[0].match}</h6>
        ) : null}

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
      </div>
    )
  }
  else {
    const names = arrayCountries.map(obj => obj.match)
    console.log(names)
    const ulStyle = {
      listStyleType: "none",
      padding: 0,
      margin: 0
    }

    return (
      <ul style={ulStyle}>
        {
          names.map(name => (
            <li key={name}>{name}
            </li>

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
    function searchInObject(obj, parentObj) {
      for (const [key, value] of Object.entries(obj)) {
        if (obj === parentObj) {
          if (!goodKeys.find(entry => entry == key)) {
            continue
          }
        }
        if (typeof value === 'string') {
          const value2 = value.toLowerCase()
          if (value2.includes(searchString))
            return { originalObject: parentObj, match: value };
        } else if (typeof value === 'object') {
          const result = searchInObject(value, parentObj);
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
    setValue(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    //setSearch(value)
    const matches = findMatchesInArrayOfObjects(apiData, value)
    setCountry(matches)
    //console.log(Object.values(result.data))
    console.log(matches)

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange}></input>
        <button type='submit'>Search</button>
      </form>
      <div>

        {country
          ? <Countries arrayCountries={country} />
          : 'search for countries'}
      </div>
    </div>
  )
}

export default App
