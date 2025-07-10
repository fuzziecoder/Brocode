import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatArea = ({ conversation, messages, onSendMessage, currentUser }) => {
  const [messageText, setMessageText] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '😎', '🤝'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage({
        id: Date.now(),
        text: messageText,
        sender: currentUser.name,
        senderId: currentUser.id,
        timestamp: new Date(),
        type: 'text',
        status: 'sent'
      });
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessageText(prev => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mock file upload
      onSendMessage({
        id: Date.now(),
        text: `Shared a ${file.type.startsWith('image/') ? 'photo' : 'file'}: ${file.name}`,
        sender: currentUser.name,
        senderId: currentUser.id,
        timestamp: new Date(),
        type: 'file',
        status: 'sent',
        file: {
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file)
        }
      });
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Icon name="Check" size={14} className="text-muted-foreground" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={14} className="text-muted-foreground" />;
      case 'read':
        return <Icon name="CheckCheck" size={14} className="text-primary" />;
      default:
        return null;
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={conversation.avatar}
                alt={conversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-foreground">{conversation.name}</h3>
              <p className="text-sm text-muted-foreground">
                {conversation.isOnline ? 'Online' : `Last seen ${formatMessageTime(conversation.lastSeen)}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${message.senderId === currentUser.id ? 'order-2' : 'order-1'}`}>
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.senderId === currentUser.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {message.type === 'file' && message.file ? (
                  <div className="space-y-2">
                    {message.file.type.startsWith('image/') ? (
                      <Image
                        src={message.file.url}
                        alt={message.file.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-background/20 rounded-lg">
                        <Icon name="File" size={20} />
                        <span className="text-sm">{message.file.name}</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
              
              <div className={`flex items-center mt-1 space-x-1 ${
                message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
              }`}>
                <span className="text-xs text-muted-foreground">
                  {formatMessageTime(message.timestamp)}
                </span>
                {message.senderId === currentUser.id && getMessageStatusIcon(message.status)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-standard"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            
            {/* Emoji Picker Button */}
            <button
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-standard"
            >
              <Icon name="Smile" size={20} />
            </button>
            
            {/* Emoji Picker */}
            {isEmojiPickerOpen && (
              <div className="absolute bottom-12 right-0 bg-popover border border-border rounded-lg shadow-elevation-3 p-2 grid grid-cols-6 gap-1 z-50">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="p-2 hover:bg-muted rounded text-lg transition-standard"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* File Upload */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,*"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="Paperclip" size={20} />
          </Button>
          
          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="rounded-full"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>

      {/* Click outside to close emoji picker */}
      {isEmojiPickerOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsEmojiPickerOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatArea;