import { useState } from 'react';

export default function SignUpForm() {
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    //console.log("hello");

    if (username.length < 8) {
      setError("Username must be at least 8 characters long.");
      return;
    }
    if(password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({ username, password }),
      }); 
      if (response.ok) {
        console.log('User signed up successfully!');
        const result = await response.json();
        console.log(result);
        setToken(result.token);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
      

    } catch(error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Sign up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit = {handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'> Username:</label> 
          <input type='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />  
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label> 
          <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} /> 
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}