import React from 'react';

import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear session data (e.g., access token)
    localStorage.removeItem('accessToken');

    // Redirect to login page
    history.push('/Login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;

