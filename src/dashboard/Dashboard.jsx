import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URLS from '../api/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      // 1. Check if token exists
      if (!token) {
        toast.error('Session expired. Please login.');
        navigate('/login');
        return;
      }

      try {
        // 2. Fetch User Data
        // We pass the token in the Authorization header
        const res = await axios.get(API_URLS.Auth.userProfile, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        // 3. Set real user data
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load user data');
        localStorage.removeItem('token'); // Invalid token? Clear it.
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  // Loading State UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // If no user (error state), don't render dashboard
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-800">TexorLab</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</span>
                <span className="text-xs text-gray-500 uppercase">{user.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-150"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-lg overflow-hidden mb-10 text-white relative">
          <div className="px-8 py-10 relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-indigo-100 text-lg">
              Account Status: 
              <span className={`ml-2 font-bold px-2 py-0.5 rounded ${user.isVerified ? 'bg-green-400/20 text-green-100' : 'bg-yellow-400/20 text-yellow-100'}`}>
                {user.isVerified ? 'Verified Account' : 'Pending Verification'}
              </span>
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </div>

        {/* DATA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* PROFILE CARD */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Profile Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Full Name</p>
                <p className="text-gray-800">{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">username</p>
                <p className="text-green-900 ">{user.username}</p>
              </div>
            </div>
          </div>

          {/* SYSTEM INFO CARD */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Account Health
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-gray-600">Verification</span>
                {user.isVerified ? (
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">Active</span>
                ) : (
                  <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-xs font-bold">Pending</span>
                )}
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-gray-600">Role</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded text-xs font-bold uppercase">{user.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member Since</span>
                <span className="text-gray-800 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;