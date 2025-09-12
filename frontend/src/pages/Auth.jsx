import React, { useState } from 'react';
import { Eye, EyeOff, User, Building2, Mail, Lock, Globe, Briefcase, Upload, Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from "react-router-dom";
const Auth = ({ onLogin, onSignup }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    industry: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === 'login') {
      if (!loginData.email) newErrors.email = 'Email is required';
      else if (!validateEmail(loginData.email)) newErrors.email = 'Please enter a valid email';
      
      if (!loginData.password) newErrors.password = 'Password is required';
    } else {
      // Signup validation
      if (!signupData.email) newErrors.email = 'Email is required';
      else if (!validateEmail(signupData.email)) newErrors.email = 'Please enter a valid email';
      
      if (!signupData.password) newErrors.password = 'Password is required';
      else if (signupData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      
      if (!signupData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (signupData.password !== signupData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (userType === 'user') {
        if (!signupData.fullName) newErrors.fullName = 'Full name is required';
      } else {
        if (!signupData.companyName) newErrors.companyName = 'Company name is required';
        if (!signupData.industry) newErrors.industry = 'Industry/Domain is required';
        if (signupData.website && !signupData.website.startsWith('http')) {
          newErrors.website = 'Website must start with http:// or https://';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);

  try {
    if (activeTab === 'login') {
      // 🔑 LOGIN FLOW
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      if (error) throw error;

      const userId = data.user.id;

      // Fetch user profile from 'users' table
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError || !profile) throw new Error('Profile not found');

      // Navigate to profile page
      navigate('/profile', { state: { profile } });

    } else {
      // 📝 SIGNUP FLOW

      // Check if email already exists in 'users' table
      let { data: existingUser, error } = await supabase
        .from('users')
        .select('id')
        .eq('email_id', signupData.email)
        .maybeSingle(); // <-- avoids 406 if no row exists

      if (error) throw error; // real errors like network/auth
      if (existingUser) {
        setErrors({ email: 'Email already exists' });
        setLoading(false);
        return;
      }

      // Create account in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
      });
      if (authError) throw authError;

      const userId = authData.user.id;

      // Insert new user into 'users' table
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: userId,
          full_name: signupData.fullName,
          email_id: signupData.email
        }
      ]);
      if (insertError) throw insertError;

      // Navigate to profile page
      navigate('/profile', { state: { profile: { ...signupData, id: userId } } });
    }
  } catch (err) {
    console.error(err);
    alert(err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};


  const resetForm = () => {
    setLoginData({ email: '', password: '' });
    setSignupData({
      fullName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      website: '',
      industry: ''
    });
    setErrors({});
    setProfilePicture(null);
    setProfilePreview('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h2 className="text-2xl font-bold text-center">Welcome</h2>
            <p className="text-blue-100 text-center mt-1">
              {activeTab === 'login' ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => switchTab('login')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === 'login'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab('signup')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === 'signup'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('user')}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    userType === 'user'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <User size={18} className="mr-2" />
                  <span className="text-sm font-medium">User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('company')}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    userType === 'company'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <Building2 size={18} className="mr-2" />
                  <span className="text-sm font-medium">Company</span>
                </button>
              </div>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <>
                <div className="space-y-1">
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <>
                {/* Profile Picture (User only) */}
                {userType === 'user' && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Profile Picture (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                        {profilePreview ? (
                          <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="text-gray-400" size={20} />
                        )}
                      </div>
                      <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Upload size={16} className="inline mr-2" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Name Field */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {userType === 'user' ? 'Full Name' : 'Company Name'}
                  </label>
                  <div className="relative">
                    {userType === 'user' ? (
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    ) : (
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    )}
                    <input
                      id="name"
                      type="text"
                      value={userType === 'user' ? signupData.fullName : signupData.companyName}
                      onChange={(e) => setSignupData(prev => ({ 
                        ...prev, 
                        [userType === 'user' ? 'fullName' : 'companyName']: e.target.value 
                      }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        (userType === 'user' ? errors.fullName : errors.companyName) ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={userType === 'user' ? 'Enter your full name' : 'Enter company name'}
                    />
                  </div>
                  {(userType === 'user' ? errors.fullName : errors.companyName) && (
                    <p className="text-red-500 text-xs mt-1">
                      {userType === 'user' ? errors.fullName : errors.companyName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Company-specific fields */}
                {userType === 'company' && (
                  <>
                    <div className="space-y-1">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website (Optional)
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          id="website"
                          type="url"
                          value={signupData.website}
                          onChange={(e) => setSignupData(prev => ({ ...prev, website: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.website ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="https://www.example.com"
                        />
                      </div>
                      {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                        Industry/Domain
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          id="industry"
                          type="text"
                          value={signupData.industry}
                          onChange={(e) => setSignupData(prev => ({ ...prev, industry: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.industry ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Technology, Healthcare, Finance"
                        />
                      </div>
                      {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                    </div>
                  </>
                )}

                {/* Password */}
                <div className="space-y-1">
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={signupData.password}
                      onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Create a password (min. 8 characters)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                activeTab === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => switchTab(activeTab === 'login' ? 'signup' : 'login')}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                {activeTab === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;