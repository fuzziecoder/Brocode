import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'event',
      user: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      action: 'created a new basketball meetup',
      location: 'Central Park, NYC',
      time: '2 hours ago',
      icon: 'Calendar'
    },
    {
      id: 2,
      type: 'join',
      user: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      action: 'joined the brotherhood',
      location: 'Los Angeles, CA',
      time: '4 hours ago',
      icon: 'UserPlus'
    },
    {
      id: 3,
      type: 'group',
      user: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      action: 'started a hiking group',
      location: 'San Francisco, CA',
      time: '6 hours ago',
      icon: 'Mountain'
    },
    {
      id: 4,
      type: 'achievement',
      user: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
      action: 'earned "Event Organizer" badge',
      location: 'Chicago, IL',
      time: '8 hours ago',
      icon: 'Award'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-standard">
            <div className="relative">
              <Image
                src={activity.avatar}
                alt={activity.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center border-2 border-background">
                <Icon name={activity.icon} size={12} className="text-primary" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-foreground text-sm">{activity.user}</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{activity.action}</p>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{activity.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-standard">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;