import React from 'react';
import Auth from './Auth';

const AuthExample = () => {
  const handleLogin = (data) => {
    console.log('Login data:', data);
    // Here you would typically call your API
    // Example: await loginUser(data);
    alert('Login form submitted! Check console for data.');
  };

  const handleSignup = (data) => {
    console.log('Signup data:', data);
    // Here you would typically call your API
    // Example: await registerUser(data);
    alert('Signup form submitted! Check console for data.');
  };

  return (
    <Auth
      onLogin={handleLogin}
      onSignup={handleSignup}
    />
  );
};

export default AuthExample;