import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LiveChatPreview = ({ conversations }) => {
  const navigate = useNavigate();

  const handleViewAllChats = () => {
    navigate('/messaging-center');
  };

  const handleChatClick = (conversationId) => {
    navigate('/messaging-center');
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Recent Chats</h3>
        <Button variant="ghost" size="sm" onClick={handleViewAllChats}>
          <Icon name="MessageCircle" size={16} className="mr-1" />
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {conversations.slice(0, 4).map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleChatClick(conversation.id)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-standard"
          >
            <div className="relative">
              <Image
                src={conversation.avatar}
                alt={conversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground truncate">{conversation.name}</span>
                <span className="text-xs text-muted-foreground">{getTimeAgo(conversation.lastMessage.timestamp)}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.content}</p>
            </div>
            
            {conversation.unreadCount > 0 && (
              <div className="w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                {conversation.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>

      {conversations.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No recent conversations</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={handleViewAllChats}>
            Start Chatting
          </Button>
        </div>
      )}
    </div>
  );
};

export default LiveChatPreview;