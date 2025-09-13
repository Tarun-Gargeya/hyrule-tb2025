
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';
import { useBadges } from '../../context/BadgeContext';
import { FaUserCircle, FaSave } from 'react-icons/fa';

export default function ProfilePrivate({ profileData }) {
  const { profile, loading, userType } = useAuth();
  const { acceptedBadges } = useBadges();
  const [form, setForm] = useState({ name: '', email: '', role: '', organization: '', avatarUrl: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Use profileData prop if provided, otherwise fall back to auth context
  const displayProfile = profileData || profile;

  // Fetch latest profile data from Supabase on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let table = 'users';
        let idField = 'id';
        if (userType === 'company' || displayProfile?.userType === 'company') {
          table = 'companies';
        }
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq(idField, displayProfile.id)
          .maybeSingle();
        if (error) throw error;
        let currentRole = '';
        let currentOrg = '';
        if (acceptedBadges && acceptedBadges.length > 0) {
          const current = acceptedBadges.find(b => !b.endDate || b.endDate === null || b.endDate === 'yet to finish' || b.endDate === '');
          if (current) {
            currentRole = current.title || '';
            currentOrg = current.organization || '';
          }
        }
        setForm({
          name: data?.full_name || data?.c_name || '',
          email: data?.email_id || '',
          role: data?.role || currentRole || '',
          organization: data?.organization || data?.domain || currentOrg || '',
          avatarUrl: data?.avatarUrl || '',
          description: data?.description || '',
        });
      } catch (err) {
        // fallback to displayProfile if fetch fails
        let currentRole = '';
        let currentOrg = '';
        if (acceptedBadges && acceptedBadges.length > 0) {
          const current = acceptedBadges.find(b => !b.endDate || b.endDate === null || b.endDate === 'yet to finish' || b.endDate === '');
          if (current) {
            currentRole = current.title || '';
            currentOrg = current.organization || '';
          }
        }
        setForm({
          name: displayProfile?.name || '',
          email: displayProfile?.email || '',
          role: displayProfile?.role || currentRole || '',
          organization: displayProfile?.organization || displayProfile?.domain || currentOrg || '',
          avatarUrl: displayProfile?.avatarUrl || '',
          description: displayProfile?.description || '',
        });
      }
    };
    if (displayProfile && displayProfile.id) {
      fetchProfile();
    }
  }, [displayProfile, acceptedBadges, userType]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    setSuccess(null);
    setError(null);
    try {
      // Update correct table
      let updateObj = {
        full_name: form.name,
        description: form.description,
        avatarUrl: form.avatarUrl,
        role: form.role,
        organization: form.organization,
      };
      let table = 'users';
      let idField = 'id';
      if (userType === 'company' || displayProfile?.userType === 'company') {
        table = 'companies';
        updateObj = {
          c_name: form.name,
          description: form.description,
          avatarUrl: form.avatarUrl,
          domain: form.organization,
        };
      }
      const { error: updateError } = await supabase
        .from(table)
        .update(updateObj)
        .eq(idField, displayProfile.id)
        .select();
      if (updateError) throw updateError;
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-br from-blue-300 via-blue-200 to-indigo-200 opacity-40 rounded-full blur-3xl animate-blob1" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[300px] h-[300px] bg-gradient-to-tr from-indigo-300 via-blue-200 to-pink-200 opacity-30 rounded-full blur-3xl animate-blob2" />
        <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] bg-gradient-to-br from-pink-200 via-blue-100 to-indigo-100 opacity-20 rounded-full blur-2xl animate-blob3" />
        {/* Subtle floating shapes */}
        <div className="absolute top-20 right-32 w-16 h-16 bg-blue-100 opacity-40 rounded-full blur-xl animate-float1" />
        <div className="absolute bottom-24 left-24 w-10 h-10 bg-indigo-100 opacity-30 rounded-full blur-lg animate-float2" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="bg-white/80 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Profile Card */}
          <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-6">
            <div className="relative">
              {form.avatarUrl ? (
                <img src={form.avatarUrl} alt={form.name || 'Avatar'} className="h-32 w-32 rounded-full object-cover ring-4 ring-blue-400 shadow-lg" />
              ) : (
                <div className="h-32 w-32 flex items-center justify-center rounded-full bg-gray-200 ring-4 ring-blue-200 shadow-lg">
                  <FaUserCircle className="h-24 w-24 text-gray-300" />
                </div>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{form.name || 'Your Name'}</p>
              <p className="text-base text-gray-500 mt-1">{form.role || 'Your Role'}{form.organization ? ` @ ${form.organization}` : ''}</p>
            </div>
            {/* Free Tier Card */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-xl p-4 flex flex-col items-center text-center shadow">
              <div className="text-lg font-bold text-blue-700 mb-1">Free Tier</div>
              <ul className="text-xs text-gray-500 mb-2 list-disc list-inside">
                <li>Unlimited badge verification</li>
                <li>Access to all core features</li>
                <li>Community support</li>
              </ul>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Current Plan</span>
            </div>
          </div>

          {/* Edit Form */}
          <div className="w-full md:w-2/3 bg-white/90 rounded-2xl shadow p-6">
            <form className="space-y-8" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  <input name="name" value={form.name} onChange={onChange} placeholder="John Doe" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={form.email} disabled className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed text-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Role</label>
                  <input name="role" value={form.role} onChange={onChange} placeholder="Software Engineer" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Organization</label>
                  <input name="organization" value={form.organization} onChange={onChange} placeholder="Engineering" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea name="description" value={form.description} onChange={onChange} placeholder="Tell us about yourself..." className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" rows={3} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar URL</label>
                  <input name="avatarUrl" value={form.avatarUrl} onChange={onChange} placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" />
                </div>
              </div>

              {success && <div className="text-green-600 text-sm text-center font-medium">{success}</div>}
              {error && <div className="text-red-600 text-sm text-center font-medium">{error}</div>}

              <div className="flex justify-end">
                <button type="submit" disabled={saving} className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 font-semibold text-base">
                  <FaSave className="mr-2" /> {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

/* Tailwind CSS keyframes (add to your global styles if not present):
@layer utilities {
  @keyframes blob1 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(30px) scale(1.1);} }
  @keyframes blob2 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-20px) scale(1.07);} }
  @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-20px,20px) scale(1.13);} }
  @keyframes float1 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-18px);} }
  @keyframes float2 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(14px);} }
  .animate-blob1 { animation: blob1 8s ease-in-out infinite; }
  .animate-blob2 { animation: blob2 10s ease-in-out infinite; }
  .animate-blob3 { animation: blob3 12s ease-in-out infinite; }
  .animate-float1 { animation: float1 7s ease-in-out infinite; }
  .animate-float2 { animation: float2 9s ease-in-out infinite; }
}
*/
}
