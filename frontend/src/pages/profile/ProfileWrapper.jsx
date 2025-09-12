import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';
import ProfilePrivate from './ProfilePrivate';
import ProfilePublic from './ProfilePublic';
// import Navbar from '../../components/layout/Navbar';

export default function ProfileWrapper() {
  const { userId } = useParams();
  const { user, profile: currentUserProfile, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!userId) {
          setError('User ID is required');
          return;
        }

        // Check if this is the current user's own profile
        const isOwner = isAuthenticated() && user?.id === userId;
        setIsOwnProfile(isOwner);

        if (isOwner && currentUserProfile) {
          // If it's the user's own profile and we have the data, use it
          setProfileData(currentUserProfile);
        } else {
          // Fetch the profile data for the specified userId
          await fetchUserProfile(userId);
        }
      } catch (err) {
        console.error('Error in ProfileWrapper:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, user, currentUserProfile, isAuthenticated]);

  const fetchUserProfile = async (targetUserId) => {
    try {
      console.log('🔍 Fetching profile for user ID:', targetUserId);

      // Try to find user in companies table first
      const { data: companyProfile, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', targetUserId)
        .maybeSingle();

      if (companyProfile) {
        const profileData = {
          id: companyProfile.id,
          name: companyProfile.c_name,
          email: companyProfile.email_id,
          website: companyProfile.website,
          domain: companyProfile.domain,
          cin: companyProfile.cin,
          userType: 'company'
        };
        setProfileData(profileData);
        return;
      }

      // Try users table
      const { data: userProfile, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', targetUserId)
        .maybeSingle();

      if (userProfile) {
        const profileData = {
          id: userProfile.id,
          name: userProfile.full_name,
          email: userProfile.email_id,
          userType: 'user'
        };
        setProfileData(profileData);
      } else {
        throw new Error('Profile not found');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Profile not found or access denied');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
  {/* <Navbar /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
  {/* <Navbar /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Pass the profile data and ownership info to the appropriate component
  if (isOwnProfile) {
    return <ProfilePrivate profileData={profileData} />;
  } else {
    return <ProfilePublic profileData={profileData} />;
  }
}