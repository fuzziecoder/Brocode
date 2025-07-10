import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeedItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'friend_request':
        return 'UserPlus';
      case 'event_created':
        return 'Calendar';
      case 'post':
        return 'MessageSquare';
      case 'photo':
        return 'Camera';
      default:
        return 'Activity';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <Image
          src={activity.user.avatar}
          alt={activity.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold text-foreground">{activity.user.name}</span>
            <Icon name={getActivityIcon(activity.type)} size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{getTimeAgo(activity.timestamp)}</span>
          </div>
          
          <p className="text-foreground mb-3">{activity.content}</p>
          
          {activity.image && (
            <div className="mb-3 rounded-lg overflow-hidden">
              <Image
                src={activity.image}
                alt="Activity image"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Icon name="Heart" size={16} className="mr-1" />
              {activity.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MessageCircle" size={16} className="mr-1" />
              {activity.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Share" size={16} className="mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedItem;