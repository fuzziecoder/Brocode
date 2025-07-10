import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const ConversationList = ({ conversations, activeConversationId, onConversationSelect, onNewMessage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffInHours < 168) {
      return messageTime.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Messages</h2>
          <button
            onClick={onNewMessage}
            className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-standard"
          >
            <Icon name="Plus" size={20} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-standard"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onConversationSelect(conversation)}
            className={`p-4 border-b border-border cursor-pointer hover:bg-muted transition-standard ${
              activeConversationId === conversation.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Image
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground truncate">{conversation.name}</h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTime(conversation.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1">
                    {conversation.isTyping ? (
                      <span className="text-primary italic">typing...</span>
                    ) : (
                      <>
                        {conversation.lastMessageSender === 'You' && (
                          <span className="text-foreground">You: </span>
                        )}
                        {conversation.lastMessage}
                      </>
                    )}
                  </p>
                  
                  {/* Unread Badge */}
                  {conversation.unreadCount > 0 && (
                    <div className="ml-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium flex-shrink-0">
                      {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>

              {/* Pinned Indicator */}
              {conversation.isPinned && (
                <Icon name="Pin" size={14} className="text-muted-foreground flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;