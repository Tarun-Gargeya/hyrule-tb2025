import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import UserSearch from "../ui/UserSearch";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, logout, isAuthenticated, userType, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => {
    const p = location.pathname || '';
    return p === path || p.startsWith(path + '/');
  };

  const handleLogout = async () => {
    try {
      setShowDropdown(false); // Close dropdown first
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate to auth page even if logout fails
      navigate('/auth');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
  <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Always visible, links to home */}
          <div className="flex items-center">
            <Link 
              to={isAuthenticated() 
                ? (userType === 'company' ? '/company-dashboard' : '/user-dashboard')
                : '/landing'
              }
              className="text-xl font-bold text-gray-900 hover:text-blue-600"
              style={{ letterSpacing: '1px' }}
            >
              OfferCred
            </Link>
          </div>

          {/* Navigation Links and Search */}
          <div className="flex items-center space-x-8">
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
              {isAuthenticated() && (
                <>
                  <Link 
                    to={userType === 'company' ? '/company-dashboard' : '/user-dashboard'} 
                    className={`px-3 py-2 text-sm font-medium ${
                      isActive(userType === 'company' ? '/company-dashboard' : '/user-dashboard') 
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
                    to={`/profile/${user?.id}`} 
                    className={`px-3 py-2 text-sm font-medium ${
                      isActive(`/profile/${user?.id}`) 
                        ? "text-gray-700 border-b-2 border-blue-500" 
                        : "text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    Profile
                  </Link>
                </>
              )}
              {/* Show Sign In only if not authenticated */}
              {!isAuthenticated() && (
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
              )}
            </div>

            {/* Search Bar - Only show when authenticated */}
            {isAuthenticated() && (
              <div className="hidden lg:block w-80">
                <UserSearch placeholder="Search users and companies..." />
              </div>
            )}
          </div>

          {/* Profile Section */}
          {isAuthenticated() && (
            <div className="flex items-center space-x-4">
              <Link to={`/profile/${user?.id}`} className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{profile?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{profile?.email || '—'}</p>
                </div>
                <FaUser className="h-8 w-8 text-gray-400 p-1 rounded-full ring-2 ring-blue-500" />
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-400 hover:text-gray-600" 
                  aria-label="Profile menu"
                >
                  <FaChevronDown className="h-4 w-4" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-3 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}