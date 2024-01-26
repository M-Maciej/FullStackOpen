const Notification = ({ msg }) => {
  const notifyStyle = {
    color: '#daf7a6',
    background: 'linear-gradient(145deg, #1a1a1a, #2b2b2b)',
    border: '1px solid #005f00',
    borderRadius: '15px',
    padding: '15px 30px',
    margin: '10px auto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '17px',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    boxShadow: '0 4px 8px 0 rgba(0, 95, 0, 0.6)',
    transition: 'all 0.3s ease-in-out',
    maxWidth: '500px',
    backdropFilter: 'blur(2px)',
    textShadow: '0px 0px 8px #76ff03',
  };

  const iconStyle = {
    marginRight: '15px',
    fontSize: '24px',
    color: '#76ff03',
  };

  if (msg === null) {
    return null;
  }

  return (
    <div style={notifyStyle}>
      <span style={iconStyle}>🔔</span>
      <p>{msg}</p>
    </div>
  );
};

export default Notification;
