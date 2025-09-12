import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'user' or 'company'
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing auth data in localStorage on app load
  useEffect(() => {
    const checkStoredAuth = async () => {
      try {
        console.log('🚀 Checking stored auth on app load...');
        const storedUser = localStorage.getItem('auth_user');
        const storedUserType = localStorage.getItem('auth_user_type');
        const storedProfile = localStorage.getItem('auth_profile');

        console.log('💾 Stored data:', { 
          hasUser: !!storedUser, 
          hasUserType: !!storedUserType, 
          hasProfile: !!storedProfile 
        });

        if (storedUser && storedUserType && storedProfile) {
          console.log('✅ Restoring auth from localStorage');
          setUser(JSON.parse(storedUser));
          setUserType(storedUserType);
          setProfile(JSON.parse(storedProfile));
        }

        // Also check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        console.log('🔐 Supabase session check:', !!session?.user);
        
        if (session?.user) {
          // If we have a session but no stored data, fetch profile
          if (!storedUser) {
            console.log('🔄 Have session but no stored data, fetching profile...');
            await fetchUserProfile(session.user);
          }
        }
      } catch (error) {
        console.error('💥 Error checking stored auth:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    checkStoredAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          clearAuthData();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser) => {
    try {
      console.log('🔍 Fetching profile for user:', authUser.id);
      const userId = authUser.id;

      // Try to find user in companies table first
      const { data: companyProfile, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      console.log('👔 Company profile check:', { companyProfile, companyError });

      if (companyProfile) {
        const profileData = {
          id: companyProfile.id,
          name: companyProfile.c_name,
          email: companyProfile.email_id,
          website: companyProfile.website,
          domain: companyProfile.domain,
          cin: companyProfile.cin,
        };
        
        console.log('✅ Company profile found:', profileData);
        
        setUser(authUser);
        setUserType('company');
        setProfile(profileData);
        
        // Store in localStorage
        localStorage.setItem('auth_user', JSON.stringify(authUser));
        localStorage.setItem('auth_user_type', 'company');
        localStorage.setItem('auth_profile', JSON.stringify(profileData));
        
        return { userType: 'company', profile: profileData };
      } else {
        // Try users table
        const { data: userProfile, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        console.log('👤 User profile check:', { userProfile, userError });

        if (userError || !userProfile) {
          console.error('❌ Profile not found in either table, using fallback');
          // Instead of throwing error, create a fallback profile
          const fallbackProfile = {
            id: authUser.id,
            name: authUser.email?.split('@')[0] || 'User',
            email: authUser.email,
          };
          
          console.log('🔄 Using fallback profile:', fallbackProfile);
          
          setUser(authUser);
          setUserType('user');
          setProfile(fallbackProfile);
          
          // Store in localStorage
          localStorage.setItem('auth_user', JSON.stringify(authUser));
          localStorage.setItem('auth_user_type', 'user');
          localStorage.setItem('auth_profile', JSON.stringify(fallbackProfile));
          
          return { userType: 'user', profile: fallbackProfile };
        }

        const profileData = {
          id: userProfile.id,
          name: userProfile.full_name,
          email: userProfile.email_id,
        };
        
        console.log('✅ User profile found:', profileData);
        
        setUser(authUser);
        setUserType('user');
        setProfile(profileData);
        
        // Store in localStorage
        localStorage.setItem('auth_user', JSON.stringify(authUser));
        localStorage.setItem('auth_user_type', 'user');
        localStorage.setItem('auth_profile', JSON.stringify(profileData));
        
        return { userType: 'user', profile: profileData };
      }
    } catch (error) {
      console.error('💥 Error fetching user profile:', error);
      setError(error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email);
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('🔑 Supabase auth result:', { data, error });

      if (error) throw error;

      const result = await fetchUserProfile(data.user);
      console.log('📋 Login complete with profile:', result);
      return result;
    } catch (error) {
      console.error('❌ Login error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (signupData, selectedUserType) => {
    try {
      setLoading(true);
      setError(null);

      // Check if email already exists in the appropriate table
      const tableName = selectedUserType === 'company' ? 'companies' : 'users';
      let { data: existingUser, error } = await supabase
        .from(tableName)
        .select('id')
        .eq('email_id', signupData.email)
        .maybeSingle();

      if (error) throw error;
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Create account in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
      });

      if (authError) throw authError;

      const userId = authData.user.id;

      // Insert into correct table based on selected type
      const { error: insertError } =
        selectedUserType === 'company'
          ? await supabase.from('companies').insert([
              {
                id: userId,
                c_name: signupData.companyName,
                email_id: signupData.email,
                domain: signupData.industry || null,
                website: signupData.website || null,
                cin: signupData.cin,
              },
            ])
          : await supabase.from('users').insert([
              {
                id: userId,
                full_name: signupData.fullName,
                email_id: signupData.email,
              },
            ]);

      if (insertError) throw insertError;

      const result = await fetchUserProfile(authData.user);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out user...');
      await supabase.auth.signOut();
      clearAuthData();
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Error signing out:', error);
      // Even if Supabase logout fails, clear local data
      clearAuthData();
    }
  };

  const clearAuthData = () => {
    console.log('🧹 Clearing auth data from localStorage...');
    setUser(null);
    setUserType(null);
    setProfile(null);
    setError(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_user_type');
    localStorage.removeItem('auth_profile');
    console.log('✅ Auth data cleared');
  };

  const isAuthenticated = () => {
    return !!user && !!userType && !!profile;
  };

  const getProfileUrl = () => {
    return user ? `/profile/${user.id}` : null;
  };

  const value = {
    user,
    userType,
    profile,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated,
    getProfileUrl,
    clearAuthData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};