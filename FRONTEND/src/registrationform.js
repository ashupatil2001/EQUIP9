import React, { useState } from 'react';
import './registrationform.css';


function RegistrationForm(props)
{
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // Handle form submission, API call, and any additional logic
    console.log('Form submitted!');
  };

  return (
    <form onSubmit={handleRegistration} className="registration-form">
      <h1>Registration</h1>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNo">Mobile No:</label>
        <input
          type="text"
          id="mobileNo"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" />
      </div>
      <button type="submit">Register</button>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </form>
  );
}

export default RegistrationForm;