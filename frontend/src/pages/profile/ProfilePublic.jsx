import React from 'react';
import { useBadges } from '../../context/BadgeContext';
import Navbar from '../../components/layout/Navbar';
import { getCategoryColor } from '../../utils/badgeUtils';

export default function ProfilePublic() {
  const { profile, acceptedBadges } = useBadges();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
              {profile?.avatarUrl && (
                <img src={profile.avatarUrl} alt={profile?.name || 'User'} className="h-16 w-16 object-cover" />
              )}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{profile?.name || 'User'}</h1>
              <p className="text-gray-600">{[profile?.role, profile?.organization].filter(Boolean).join(' @ ')}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Badges</h2>
          {acceptedBadges.length === 0 ? (
            <p className="text-gray-500">No badges to display yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptedBadges.map((badge) => (
                <div key={badge.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{badge.title}</h3>
                    {badge.category && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(badge.category)}`}>
                        {badge.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{badge.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                    <span>by {badge.organization || badge.issuer}</span>
                    <span>{badge.dateAccepted}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
