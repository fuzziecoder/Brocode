import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FriendSuggestionCard = ({ friend }) => {
  const handleSendRequest = () => {
    console.log('Friend request sent to:', friend.name);
  };

  const handleViewProfile = () => {
    console.log('Viewing profile of:', friend.name);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-standard">
      <div className="text-center">
        <Image
          src={friend.avatar}
          alt={friend.name}
          className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
        />
        <h3 className="font-semibold text-foreground mb-1">{friend.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{friend.location}</p>
        
        <div className="flex items-center justify-center space-x-1 mb-3">
          <Icon name="Users" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{friend.mutualFriends} mutual friends</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {friend.interests.slice(0, 2).map((interest, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="default" size="sm" onClick={handleSendRequest} className="flex-1">
            <Icon name="UserPlus" size={14} className="mr-1" />
            Add
          </Button>
          <Button variant="outline" size="sm" onClick={handleViewProfile}>
            <Icon name="Eye" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendSuggestionCard;