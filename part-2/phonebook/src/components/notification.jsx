const Notification = ({ msg }) => {
  const notifyStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  if (msg === null) {
    return null
  }
  return (
    <div style={notifyStyle}>
      <p>{msg}</p>
    </div>
  )
}

export default Notification