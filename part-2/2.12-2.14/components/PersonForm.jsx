const PersonForm = ({ newRegistration, handleSubmit, handleInputName, handleInputNumber }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newRegistration.name} onChange={handleInputName} />
      </div>
      <div>
        number: <input value={newRegistration.number} onChange={handleInputNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm