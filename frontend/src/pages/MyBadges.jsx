import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";
import { 
  FaBook, 
  FaBolt, 
  FaCrown, 
  FaBullseye, 
  FaLightbulb, 
  FaHandshake,
  FaTrophy,
  FaSearch,
  FaChartLine,
  FaCalendarAlt,
  FaBrain,
  FaUsers
} from "react-icons/fa";
import { useBadges } from "../context/BadgeContext";

export default function MyBadges() {
  const { acceptedBadges: badges } = useBadges();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Only use categories from real badges (no hardcoded defaults)
  const categories = useMemo(() => ["All", ...new Set((badges || []).map(badge => badge.category).filter(Boolean))], [badges]);

  const filteredBadges = useMemo(() => (badges || []).filter(badge => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = (badge.title || "").toLowerCase().includes(search) ||
                         (badge.description || "").toLowerCase().includes(search) ||
                         (badge.skills || []).some(skill => (skill || "").toLowerCase().includes(search)) ||
                         (badge.organization || "").toLowerCase().includes(search) ||
                         (badge.issuer || "").toLowerCase().includes(search);
    const matchesCategory = selectedCategory === "All" || badge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [badges, searchTerm, selectedCategory]);

  const getBadgeIcon = (category) => {
    const icons = {
      "Learning": FaBook,
      "Technical Excellence": FaBolt,
      "Leadership": FaCrown,
      "Customer Service": FaBullseye,
      "Innovation": FaLightbulb,
      "Collaboration": FaHandshake
    };
    return icons[category] || FaTrophy;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Learning": "bg-blue-100 text-blue-800",
      "Technical Excellence": "bg-purple-100 text-purple-800",
      "Leadership": "bg-yellow-100 text-yellow-800",
      "Customer Service": "bg-green-100 text-green-800",
      "Innovation": "bg-pink-100 text-pink-800",
      "Collaboration": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
  {/* <Navbar /> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">My Badges</h2>
          <p className="text-gray-600 mt-1">View and manage all your earned achievements</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaTrophy className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Badges</p>
                <p className="text-2xl font-bold text-gray-900">{(badges || []).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaChartLine className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{Math.max(categories.length - 1, 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaBrain className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Skills Earned</p>
                <p className="text-2xl font-bold text-gray-900">{new Set((badges || []).flatMap(b => b.skills || [])).size}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FaCalendarAlt className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <label htmlFor="search" className="sr-only">Search badges</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search badges, skills, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map(badge => (
            <div key={badge.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Badge Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">
                    {React.createElement(getBadgeIcon(badge.category), { className: "w-8 h-8" })}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(badge.category)} bg-white`}>
                    {badge.category || 'General'}
                  </span>
                </div>
                <h3 className="text-lg font-bold mt-2">{badge.title}</h3>
              </div>

              {/* Badge Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">{badge.description}</p>
                
                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {(badge.skills || []).map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badge Footer */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Issued by {badge.organization || badge.issuer}</span>
                    <span>{badge.dateAccepted}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredBadges.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No badges found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}