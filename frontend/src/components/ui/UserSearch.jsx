import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaBuilding } from 'react-icons/fa';
import { supabase } from '../../utils/supabase';

export default function UserSearch({ placeholder = "Search users...", className = "" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Debounced search effect
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        performSearch(searchTerm.trim());
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (query) => {
    try {
      setIsLoading(true);
      console.log('🔍 Searching for users with query:', query);

      // Search in both users and companies tables
      const [usersResponse, companiesResponse] = await Promise.all([
        supabase
          .from('users')
          .select('id, full_name, email_id')
          .ilike('full_name', `%${query}%`)
          .limit(10),
        supabase
          .from('companies')
          .select('id, c_name, email_id, domain')
          .ilike('c_name', `%${query}%`)
          .limit(10)
      ]);

      const users = (usersResponse.data || []).map(user => ({
        id: user.id,
        name: user.full_name,
        email: user.email_id,
        type: 'user'
      }));

      const companies = (companiesResponse.data || []).map(company => ({
        id: company.id,
        name: company.c_name,
        email: company.email_id,
        domain: company.domain,
        type: 'company'
      }));

      const allResults = [...users, ...companies];
      console.log('📊 Search results:', allResults);

      setSearchResults(allResults);
      setShowResults(allResults.length > 0);
    } catch (error) {
      console.error('❌ Search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (user) => {
    navigate(`/profile/${user.id}`);
    setSearchTerm('');
    setShowResults(false);
  };

  const handleSearchFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative" ref={searchRef}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div 
          ref={resultsRef}
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {searchResults.length > 0 ? (
            <div className="py-1">
              {searchResults.map((user) => (
                <button
                  key={`${user.type}-${user.id}`}
                  onClick={() => handleResultClick(user)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {user.type === 'company' ? (
                        <FaBuilding className="h-5 w-5 text-blue-500" />
                      ) : (
                        <FaUser className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                        {user.domain && ` • ${user.domain}`}
                        {user.type === 'company' && ' • Company'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No users found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}