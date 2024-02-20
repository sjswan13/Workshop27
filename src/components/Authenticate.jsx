import { useState, useEffect } from 'react';

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      handleClick();
    }
  }, [token]);

  async function handleClick() {
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer${token}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        setUsername(result.data.username);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
      
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <div>
      <h2>Authenticate!</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}