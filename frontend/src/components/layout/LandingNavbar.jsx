import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function LandingNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => (location.pathname === path);

  return (
    <nav className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900"><span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              OfferCred
            </span>  </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm ${isActive('/') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link>
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
          {/* Pricing button always last */}
          <Link to="/pricing" className="text-sm text-blue-600 border border-blue-100 rounded px-3 py-1.5 hover:bg-blue-50 transition">Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/auth')} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
