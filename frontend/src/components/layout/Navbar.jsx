import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { useBadges } from "../../context/BadgeContext";

export default function Navbar() {
  const location = useLocation();
  const { profile } = useBadges();

  const isActive = (path) => {
    const p = location.pathname || '';
    return p === path || p.startsWith(path + '/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/user-dashboard" className="text-xl font-bold text-gray-900 hover:text-blue-600">
              BadgeHub
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/landing" 
              className={`px-3 py-2 text-sm font-medium ${
                isActive("/landing") 
                  ? "text-gray-700 border-b-2 border-blue-500" 
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/user-dashboard" 
              className={`px-3 py-2 text-sm font-medium ${
                isActive("/user-dashboard") 
                  ? "text-gray-700 border-b-2 border-blue-500" 
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/my-badges" 
              className={`px-3 py-2 text-sm font-medium ${
                isActive("/my-badges") 
                  ? "text-gray-700 border-b-2 border-blue-500" 
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              My Badges
            </Link>
            <Link 
              to="/profile" 
              className={`px-3 py-2 text-sm font-medium ${
                isActive("/profile") 
                  ? "text-gray-700 border-b-2 border-blue-500" 
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Profile
            </Link>
            <Link 
              to="/auth" 
              className={`px-3 py-2 text-sm font-medium ${
                isActive("/auth") 
                  ? "text-gray-700 border-b-2 border-blue-500" 
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Sign In
            </Link>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{profile?.role || '—'}</p>
              </div>
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile?.name || 'User'} className="h-8 w-8 rounded-full ring-2 ring-blue-500 object-cover" />
              ) : (
                <FaUser className="h-8 w-8 text-gray-400 p-1 rounded-full ring-2 ring-blue-500" />
              )}
            </Link>
            <div className="relative">
              <button className="text-gray-400 hover:text-gray-600" aria-label="Profile menu">
                <FaChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}