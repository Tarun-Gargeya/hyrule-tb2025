import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'auth':
        return <Auth onLogin={handleLogin} onSignup={handleSignup} />;
      case 'features':
      case 'about':
      case 'contact':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
                {currentPage} Page
              </h1>
              <p className="text-gray-600 mb-8">This page is coming soon!</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </div>
  );
}

export default App;