import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [country, setCountry] = useState(null)
  const [search, setSearch] = useState(null)
  const [value, setValue] = useState(``)


  useEffect(() => {

    if (search) {
      console.log(`requesting api for ${search}`)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(result => {
          setCountry(result.data)
          //console.log(Object.values(result.data))
          console.log(findMatchesInArrayOfObjects(result.data, search))
        })
        .catch((error) => {
          console.log(`Error fetching data: ${error.message}`)
          setCountry('no results')
        })
        .finally(() => {
          console.log(`ended fetching api data`)
        });
    }





  }, [search])

  function findMatchesInArrayOfObjects(arrayOfObjects, searchString) {
    searchString = searchString.toLowerCase()
    function searchInObject(obj, parentObj) {
      for (const [key, value] of Object.entries(obj)) {

        if (typeof value === 'string') {
          const value2 = value.toLowerCase()
          if (value2.includes(searchString))
            return { originalObject: parentObj, match: { [key]: value } };
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
    setSearch(value)

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange}></input>
        <button type='submit'>Search</button>
      </form>
      <p>
        {country ? JSON.stringify(country, null, 2) : 'search for countries'}
      </p>
    </div>
  )
}

export default App
