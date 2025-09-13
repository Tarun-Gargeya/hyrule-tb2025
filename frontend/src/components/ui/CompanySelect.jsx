import React, { useState, useEffect, useRef } from 'react';
import { FaBuilding, FaSearch } from 'react-icons/fa';
import { supabase } from '../../utils/supabase';

export default function CompanySelect({ value, onChange, placeholder = "Select company...", className = "" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim().length < 1) {
      setOptions([]);
      setShowOptions(false);
      return;
    }
    const fetchCompanies = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('companies')
        .select('id, c_name, domain')
        .ilike('c_name', `%${searchTerm}%`)
        .limit(10);
      setIsLoading(false);
      if (error) {
        setOptions([]);
        return;
      }
      setOptions(data || []);
      setShowOptions((data || []).length > 0);
    };
    const timeout = setTimeout(fetchCompanies, 250);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target) &&
        resultsRef.current && !resultsRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (company) => {
    onChange(company.c_name);
    setSearchTerm(company.c_name);
    setShowOptions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative" ref={inputRef}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm || value || ''}
          onChange={e => setSearchTerm(e.target.value)}
          onFocus={() => setShowOptions(options.length > 0)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
      {showOptions && (
        <div ref={resultsRef} className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            <div className="py-1">
              {options.map(company => (
                <button
                  key={company.id}
                  onClick={() => handleSelect(company)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <div className="flex items-center space-x-3">
                    <FaBuilding className="h-5 w-5 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{company.c_name}</p>
                      <p className="text-xs text-gray-500 truncate">{company.domain}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">No companies found</div>
          )}
        </div>
      )}
    </div>
  );
}
