import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import LoginForm from './components/LoginForm';
import CommunityStats from './components/CommunityStats';
import RecentActivity from './components/RecentActivity';
import Testimonials from './components/Testimonials';
import SecurityBadges from './components/SecurityBadges';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard-home');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Community Info (Hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              <CommunityStats />
              <SecurityBadges />
            </div>

            {/* Center Column - Login Form */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <LoginForm />
            </div>

            {/* Right Column - Activity & Testimonials (Hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              <RecentActivity />
              <Testimonials />
            </div>
          </div>

          {/* Mobile-only sections */}
          <div className="lg:hidden mt-8 space-y-6">
            <CommunityStats />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentActivity />
              <Testimonials />
            </div>
            <SecurityBadges />
          </div>
        </div>
      </main>

      {/* Help Section */}
      <div className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-40">
        <button
          onClick={() => alert('Help center would open here')}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-elevation-2 hover:shadow-elevation-3 transition-standard flex items-center space-x-2"
        >
          <span className="text-sm font-medium">Need Help?</span>
        </button>
      </div>
    </div>
  );
};

export default UserLogin;