import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { 
  FaTrophy, 
  FaClock, 
  FaInbox, 
  FaCheckCircle,
  FaUser 
} from "react-icons/fa";

export default function UserDashboard() {
  // Placeholder data for incoming badges
  const [incomingBadges, setIncomingBadges] = useState([
    {
      id: 1,
      title: "Problem Solver",
      description: "Successfully resolved a critical system issue",
      issuer: "Tech Team Lead",
      issuerAvatar: "https://via.placeholder.com/40",
      category: "Technical Excellence",
      date: "2025-09-10"
    },
    {
      id: 2,
      title: "Team Collaborator",
      description: "Excellent teamwork on the Q3 project",
      issuer: "Project Manager",
      issuerAvatar: "https://via.placeholder.com/40",
      category: "Collaboration",
      date: "2025-09-09"
    },
    {
      id: 3,
      title: "Innovation Champion",
      description: "Proposed and implemented innovative solution",
      issuer: "Innovation Team",
      issuerAvatar: "https://via.placeholder.com/40",
      category: "Innovation",
      date: "2025-09-08"
    }
  ]);

  // Placeholder data for accepted badges
  const [acceptedBadges, setAcceptedBadges] = useState([
    {
      id: 101,
      title: "Quick Learner",
      description: "Mastered new technology in record time",
      issuer: "Senior Developer",
      category: "Learning",
      dateAccepted: "2025-09-05"
    },
    {
      id: 102,
      title: "Code Quality Expert",
      description: "Consistently delivers high-quality code",
      issuer: "Tech Lead",
      category: "Technical Excellence",
      dateAccepted: "2025-09-01"
    },
    {
      id: 103,
      title: "Mentor",
      description: "Outstanding mentorship to junior developers",
      issuer: "HR Team",
      category: "Leadership",
      dateAccepted: "2025-08-28"
    },
    {
      id: 104,
      title: "Customer Focus",
      description: "Exceptional customer service and support",
      issuer: "Customer Success",
      category: "Customer Service",
      dateAccepted: "2025-08-25"
    }
  ]);

  const handleAcceptBadge = (badgeId) => {
    const badge = incomingBadges.find(b => b.id === badgeId);
    if (badge) {
      // Add to accepted badges
      setAcceptedBadges(prev => [...prev, {
        ...badge,
        id: badge.id + 1000, // Ensure unique ID
        dateAccepted: new Date().toISOString().split('T')[0]
      }]);
      
      // Remove from incoming badges
      setIncomingBadges(prev => prev.filter(b => b.id !== badgeId));
    }
  };

  const handleRejectBadge = (badgeId) => {
    setIncomingBadges(prev => prev.filter(b => b.id !== badgeId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage your badges and track your achievements</p>
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
                            <img src={badge.issuerAvatar} alt={badge.issuer} className="h-8 w-8 rounded-full" />
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{badge.title}</h4>
                              <p className="text-xs text-gray-500">by {badge.issuer}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Category: {badge.category}</span>
                            <span>Date: {badge.date}</span>
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
                        <span>by {badge.issuer}</span>
                        <span>Earned: {badge.dateAccepted}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                          {badge.category}
                        </span>
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
