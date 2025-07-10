import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'interests', label: 'Interests', icon: 'Heart' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-standard border-b-2 ${
              activeTab === tab.id
                ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;