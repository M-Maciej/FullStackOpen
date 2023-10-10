const NameAndNumber = ({ name, number }) => {
  return (
    <li>{`${name}`}&nbsp;{`${number}`}</li>
  )
}

export const PersonDisplay = ({ persons }) => {
  return (
    <ul>
      {persons.map((registry) => <NameAndNumber key={registry.id} name={registry.name} number={registry.number} />)}
    </ul>
  )
}
export const PersonFilter = ({ persons, handleSearch, search }) => {
  const nameSearch = (registry) => {
    const name = registry.name
    if (name.length < search.length) {
      return false
    }
    else {
      /*
      for (let i = 0; i < search.length; i++) {
        //console.log(name[i].toLowerCase())
        if (search[i].toLowerCase() !== name[i].toLowerCase()) {
          return false
        }
      }
      */
      for (const [i, char] of Array.from(search).entries()) {
        if (char.toLowerCase() !== name[i].toLowerCase()) {
          return false;
        }
      }

    }
    return true

  }
  return (
    <div>
      filter shown with <input value={search} onChange={handleSearch} />
      <PersonDisplay persons={persons.filter(nameSearch)} />
    </div>
  )
}
