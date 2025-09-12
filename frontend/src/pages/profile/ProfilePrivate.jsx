import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import { FaSave, FaUserCircle, FaBuilding, FaEnvelope, FaBriefcase, FaImage } from 'react-icons/fa';

export default function ProfilePrivate({ profileData }) {
  const { profile, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', role: '', organization: '', avatarUrl: '' });
  
  // Use profileData prop if provided, otherwise fall back to auth context
  const displayProfile = profileData || profile;

  useEffect(() => {
    if (displayProfile) {
      setForm({
        name: displayProfile.name || '',
        email: displayProfile.email || '',
        role: displayProfile.role || '',
        organization: displayProfile.organization || displayProfile.domain || '',
        avatarUrl: displayProfile.avatarUrl || '',
      });
    }
  }, [displayProfile]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center space-x-4">
                {form.avatarUrl ? (
                  <img src={form.avatarUrl} alt={form.name || 'Avatar'} className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-500" />
                ) : (
                  <FaUserCircle className="h-16 w-16 text-gray-300" />
                )}
                <div>
                  <p className="text-lg font-semibold text-gray-900">{form.name || 'Your Name'}</p>
                  <p className="text-sm text-gray-500">{form.role || 'Your Role'} {form.organization ? `@ ${form.organization}` : ''}</p>
                </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                <input name="name" value={form.name} onChange={onChange} placeholder="John Doe" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input type="email" name="email" value={form.email} onChange={onChange} placeholder="john.doe@example.com" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <input name="role" value={form.role} onChange={onChange} placeholder="Software Engineer" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <div className="relative">
                <input name="organization" value={form.organization} onChange={onChange} placeholder="Engineering" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
              <div className="relative">
                <input name="avatarUrl" value={form.avatarUrl} onChange={onChange} placeholder="https://..." className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <FaSave className="mr-2" /> Save (placeholder)
            </button>
          </div>
        </form>
      </div>
        </div>
      </div>
    </div>
  );
}
