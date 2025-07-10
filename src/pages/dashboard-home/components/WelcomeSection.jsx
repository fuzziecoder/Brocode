import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user, stats }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome back, {user.name}!</h1>
          <p className="text-primary-foreground/80">Ready to connect with your brotherhood today?</p>
        </div>
        <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <Icon name="Users" size={32} className="text-primary-foreground" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.friendCount}</div>
          <div className="text-sm text-primary-foreground/80">Friends</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
          <div className="text-sm text-primary-foreground/80">Events</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.unreadMessages}</div>
          <div className="text-sm text-primary-foreground/80">Messages</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;