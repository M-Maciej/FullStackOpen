const NameAndNumber = ({ person, handleDelete }) => {
  return (
    <span>
      <li>{`${person.name}`}&nbsp;{`${person.number}`}</li>
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </span>
  )
}

export const PersonDisplay = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((registry) => <NameAndNumber key={registry.id} person={registry} handleDelete={handleDelete} />)}
    </ul>
  )
}
export const PersonFilter = ({ persons, handleSearch, search, handleDelete }) => {
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
      <PersonDisplay persons={persons.filter(nameSearch)} handleDelete={handleDelete} />
    </div>
  )
}
