import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { 
  FaTrophy, 
  FaCheckCircle,
  FaUser 
} from "react-icons/fa";
import { useBadges } from "../context/BadgeContext";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard() {
  const { acceptedBadges, fetchExistingBadges } = useBadges();
  const { profile, userType, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    organization: '',
    role: '',
    full_name: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show alert with the entered data
    alert(`Student Entry Submitted!\nEmail: ${formData.email}\nOrganization: ${formData.organization}\nRole: ${formData.role}\nFull Name: ${formData.full_name || 'Not provided'}`);
  };

  useEffect(() => {
    // Fetch only if context is empty; provider already auto-fetches
    if (acceptedBadges.length === 0) {
      fetchExistingBadges();
    }
  }, [fetchExistingBadges, acceptedBadges.length]);

  // Profile is now provided by context

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header + Profile */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage your badges and track your achievements</p>

          <div className="mt-4 bg-white rounded-lg shadow p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
              <FaUser className="h-6 w-6 text-gray-500 m-3" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                Welcome{profile?.name ? `, ${profile.name}` : ' to the Dashboard'}
              </p>
              <p className="text-base font-medium text-gray-900">
                {userType === 'user' ? 'Individual User' : userType === 'company' ? 'Company User' : 'User'}
              </p>
              {profile?.email && (
                <p className="text-xs text-gray-500">{profile.email}</p>
              )}
              {!profile && (
                <p className="text-xs text-red-500">Profile data loading...</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaTrophy className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Badges</p>
                <p className="text-2xl font-bold text-gray-900">{acceptedBadges.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Entry Form */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Add Student Entry
              </h3>
              <p className="text-sm text-gray-500">Enter student information</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Associated Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="alice@uni.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization *
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Y"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Software Engineer Intern"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name (optional)
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Alice"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Accepted Badges Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                My Badges ({acceptedBadges.length})
              </h3>
              <p className="text-sm text-gray-500">Your earned achievements</p>
            </div>
            <div className="p-6">
              {acceptedBadges.length === 0 ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No badges earned yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {acceptedBadges.map(badge => (
                    <div key={badge.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{badge.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>by {badge.organization || badge.issuer}</span>
                        <span>Earned: {badge.dateAccepted}</span>
                      </div>
                      <div className="mt-2">
                        {badge.category && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                            {badge.category}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
