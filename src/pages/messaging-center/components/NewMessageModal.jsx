import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewMessageModal = ({ isOpen, onClose, onStartConversation, friends }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFriendSelect = (friend) => {
    if (selectedFriends.find(f => f.id === friend.id)) {
      setSelectedFriends(selectedFriends.filter(f => f.id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleStartConversation = () => {
    if (selectedFriends.length > 0) {
      onStartConversation(selectedFriends);
      setSelectedFriends([]);
      setSearchQuery('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedFriends([]);
    setSearchQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">New Message</h2>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          {/* Search */}
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Selected Friends */}
          {selectedFriends.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Selected ({selectedFriends.length}):</p>
              <div className="flex flex-wrap gap-2">
                {selectedFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <Image
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span>{friend.name}</span>
                    <button
                      onClick={() => handleFriendSelect(friend)}
                      className="text-primary hover:text-primary/80 transition-standard"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Friends List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No friends found' : 'No friends available'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFriends.map((friend) => {
                const isSelected = selectedFriends.find(f => f.id === friend.id);
                return (
                  <div
                    key={friend.id}
                    onClick={() => handleFriendSelect(friend)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-standard ${
                      isSelected 
                        ? 'bg-primary/10 border border-primary' :'hover:bg-muted'
                    }`}
                  >
                    <div className="relative">
                      <Image
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {friend.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{friend.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {friend.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                    
                    {isSelected && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleStartConversation}
              disabled={selectedFriends.length === 0}
              className="flex-1"
            >
              Start Chat ({selectedFriends.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMessageModal;