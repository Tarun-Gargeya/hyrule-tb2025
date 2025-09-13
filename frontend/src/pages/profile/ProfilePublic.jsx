
import React, { useEffect, useState } from 'react';
import { Clipboard, Check } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { getCategoryColor } from '../../utils/badgeUtils';

export default function ProfilePublic({ profileData }) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use profileData prop for the public view
  const profile = profileData;

  useEffect(() => {
    const fetchBadges = async () => {
      setLoading(true);
      if (!profile?.id) {
        setBadges([]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .eq('user_id', profile.id)
        .order('issued_at', { ascending: false });
      if (error) {
        setBadges([]);
      } else {
        setBadges(data || []);
      }
      setLoading(false);
    };
    fetchBadges();
  }, [profile?.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile?.name || 'User'} className="h-16 w-16 object-cover" />
              ) : (
                <span className="h-16 w-16 flex items-center justify-center text-3xl text-gray-400">👤</span>
              )}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{profile?.name || 'User'}</h1>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-blue-700 mb-1">Info</h2>
            {profile?.role || profile?.organization ? (
              <>
                {profile?.role && (
                  <p className="text-gray-700">{profile.role}{profile.organization ? ` @ ${profile.organization}` : ''}</p>
                )}
                {!profile?.role && profile?.organization && (
                  <p className="text-gray-700">{profile.organization}</p>
                )}
              </>
            ) : (
              <p className="text-gray-400 italic">This user is a mystery wrapped in an enigma. (No info provided!)</p>
            )}
          </div>

          {/* Description Box */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-indigo-700 mb-1">About</h2>
            {profile?.description ? (
              <p className="text-gray-700 whitespace-pre-line">{profile.description}</p>
            ) : (
              <p className="text-gray-400 italic">Nothing to see here... yet. (No description provided!)</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Badges</h2>
          {loading ? (
            <p className="text-gray-500">Loading badges...</p>
          ) : badges.length === 0 ? (
            <div className="text-gray-500 flex flex-col items-center">
              <span>No badges to display yet.</span>
              <span className="text-3xl mt-2">🏷️</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <BadgeWithLink key={badge.id} badge={badge} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

// BadgeWithLink component for deep-linking and copy-to-clipboard
function BadgeWithLink({ badge }) {
  const [copied, setCopied] = React.useState(false);
  const badgeUrl = `${window.location.origin}/badge/${badge.id}`;

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(badgeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <a
      href={badgeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-lg shadow p-4 block relative transition hover:ring-2 hover:ring-blue-400"
      title="View this badge"
    >
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
        <span>{badge.issued_at ? badge.issued_at.slice(0, 10) : ''}</span>
      </div>
      {/* Copy link button on hover */}
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full p-1.5 flex items-center"
        title="Copy badge link"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4 text-blue-500" />}
      </button>
    </a>
  );
}
}
