
import React, { useState } from "react";
import RegistrationForm from './registrationform';
import LoginForm from './LoginForm';

function App() {
  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "register" ? <RegistrationForm onFormSwitch={toggleForm} /> : < LoginForm onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;