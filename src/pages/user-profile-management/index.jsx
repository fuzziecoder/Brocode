import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import AboutSection from './components/AboutSection';
import InterestsSection from './components/InterestsSection';
import PhotoGallery from './components/PhotoGallery';
import PrivacySection from './components/PrivacySection';
import SettingsSection from './components/SettingsSection';

const UserProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('about');

  // Mock user profile data
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    age: 28,
    location: "San Francisco, CA, USA",
    city: "San Francisco",
    bio: `Software engineer passionate about technology, outdoor adventures, and building meaningful connections. I love hiking on weekends, playing basketball with friends, and exploring new restaurants in the city.\n\nLooking to connect with like-minded individuals who share similar interests and values. Always up for a good conversation about tech, sports, or life in general.`,
    occupation: "Software Engineer",
    education: "Computer Science, Stanford University",
    email: "alex.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinDate: "March 2023",
    friendsCount: 127,
    isVerified: true,
    status: "online"
  });

  const [interests, setInterests] = useState([
    'Technology', 'Hiking', 'Basketball', 'Photography', 'Cooking', 
    'Travel', 'Music', 'Gaming', 'Fitness', 'Reading'
  ]);

  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      caption: "Profile photo"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      caption: "Hiking adventure"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
      caption: "Basketball game"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=400&fit=crop",
      caption: "City exploration"
    }
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    locationSharing: 'city',
    contactPreferences: 'friends',
    showOnlineStatus: true,
    allowFriendRequests: true,
    showInSearch: true,
    emailNotifications: true,
    pushNotifications: true,
    eventInvitations: true
  });

  const [settings, setSettings] = useState({
    email: "alex.johnson@email.com",
    notifyFriendRequests: true,
    notifyMessages: true,
    notifyEvents: true,
    weeklyDigest: false,
    autoAway: true,
    autoAwayTimeout: 15,
    readReceipts: true,
    isVerified: true
  });

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  const handlePhotoUpdate = (newAvatar) => {
    setProfile(prev => ({ ...prev, avatar: newAvatar }));
  };

  const handleStatusChange = (newStatus) => {
    setProfile(prev => ({ ...prev, status: newStatus }));
  };

  const handleInterestsUpdate = (updatedInterests) => {
    setInterests(updatedInterests);
  };

  const handlePhotosUpdate = (updatedPhotos) => {
    setPhotos(updatedPhotos);
  };

  const handlePrivacyUpdate = (updatedSettings) => {
    setPrivacySettings(updatedSettings);
  };

  const handleSettingsUpdate = (updatedSettings) => {
    setSettings(updatedSettings);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <AboutSection
            profile={profile}
            onUpdate={handleProfileUpdate}
          />
        );
      case 'interests':
        return (
          <div className="space-y-6">
            <InterestsSection
              interests={interests}
              onUpdate={handleInterestsUpdate}
            />
            <PhotoGallery
              photos={photos}
              onUpdate={handlePhotosUpdate}
            />
          </div>
        );
      case 'privacy':
        return (
          <PrivacySection
            privacySettings={privacySettings}
            onUpdate={handlePrivacyUpdate}
          />
        );
      case 'settings':
        return (
          <SettingsSection
            settings={settings}
            onUpdate={handleSettingsUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <ProfileHeader
            profile={profile}
            onPhotoUpdate={handlePhotoUpdate}
            onStatusChange={handleStatusChange}
          />
          
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default UserProfileManagement;