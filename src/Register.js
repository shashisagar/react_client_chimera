import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const phone = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleRegister = () => {
    console.log(email.value);
    console.log(password.value);
    setError(null);
    setLoading(true);
    axios.post('http://127.0.0.1:8080/user', { email: email.value, password: password.value,
    firstName: firstName.value, lastName: lastName.value,phone: phone.value}).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/register');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      SignUP<br /><br />
      <div>
        Email<br />
        <input type="email" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      <div>
      FirstName<br />
        <input type="text" {...firstName} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
       LastName<br />
        <input type="text" {...lastName} autoComplete="new-password" />
      </div>
      <div>
        Phone<br />
        <input type="text" {...phone} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleRegister} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;