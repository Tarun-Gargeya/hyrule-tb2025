import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { FaIdBadge, FaUserEdit } from 'react-icons/fa';

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <p className="text-gray-600 mt-1">Manage your profile or share your public page</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 pt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <NavLink
                to="."
                end
                className={({ isActive }) => `inline-flex items-center border-b-2 px-1 pb-3 text-sm font-medium ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <FaUserEdit className="mr-2" /> Private
              </NavLink>
              <NavLink
                to="public"
                className={({ isActive }) => `inline-flex items-center border-b-2 px-1 pb-3 text-sm font-medium ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <FaIdBadge className="mr-2" /> Public
              </NavLink>
            </nav>
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
