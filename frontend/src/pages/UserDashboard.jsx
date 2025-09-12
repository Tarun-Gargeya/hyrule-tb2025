import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  FaTrophy, 
  FaClock, 
  FaInbox, 
  FaCheckCircle,
  FaUser 
} from "react-icons/fa";
import { useBadges } from "../components/BadgeContext";

export default function UserDashboard() {
  const { incomingBadges, acceptedBadges, handleAcceptBadge, handleRejectBadge, fetchExistingBadges, profile, profileLoading, profileError } = useBadges();

  useEffect(() => {
    // Fetch only if context is empty; provider already auto-fetches
    if (incomingBadges.length === 0 && acceptedBadges.length === 0) {
      fetchExistingBadges();
    }
  }, [fetchExistingBadges, incomingBadges.length, acceptedBadges.length]);

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
              {profile?.avatarUrl && (
                <img src={profile.avatarUrl} alt={profile?.name || "User"} className="h-12 w-12 object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Welcome{profile?.name ? `, ${profile.name}` : ''}</p>
              <p className="text-base font-medium text-gray-900">
                {profileLoading ? 'Loading profile…' : profileError ? `Profile: ${profileError}` : `${profile?.role || ''}${profile?.organization ? ` @ ${profile.organization}` : ''}`}
              </p>
              {profile?.email && (
                <p className="text-xs text-gray-500">{profile.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FaClock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{incomingBadges.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Incoming Badges Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Incoming Badges ({incomingBadges.length})
              </h3>
              <p className="text-sm text-gray-500">Badges waiting for your approval</p>
            </div>
            <div className="p-6">
              {incomingBadges.length === 0 ? (
                <div className="text-center py-8">
                  <FaInbox className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No incoming badges</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incomingBadges.map(badge => (
                    <div key={badge.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <FaUser/>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{badge.title}</h4>
                              <p className="text-xs text-gray-500">by {badge.organization || badge.issuer}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {badge.category && <span>Category: {badge.category}</span>}
                            {badge.date && <span>Date: {badge.date}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => handleAcceptBadge(badge.id)}
                          className="flex-1 bg-green-600 text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectBadge(badge.id)}
                          className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-400 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
