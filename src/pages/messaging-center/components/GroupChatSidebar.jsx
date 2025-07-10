import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GroupChatSidebar = ({ conversation, isOpen, onClose, onAddMember, onRemoveMember, currentUser }) => {
  const [showAddMember, setShowAddMember] = useState(false);

  if (!isOpen || !conversation?.isGroup) return null;

  const members = conversation.members || [];
  const isAdmin = conversation.adminId === currentUser.id;

  const handleMemberAction = (member, action) => {
    if (action === 'remove' && isAdmin) {
      onRemoveMember(member.id);
    }
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Group Info</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      {/* Group Details */}
      <div className="p-4 border-b border-border">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Users" size={32} color="white" />
          </div>
          <h4 className="font-medium text-foreground mb-1">{conversation.name}</h4>
          <p className="text-sm text-muted-foreground">{members.length} members</p>
        </div>
      </div>

      {/* Members */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium text-foreground">Members</h5>
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddMember(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Add
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h6 className="font-medium text-foreground">{member.name}</h6>
                    {member.id === conversation.adminId && (
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                    {member.id === currentUser.id && (
                      <span className="text-xs text-muted-foreground">(You)</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>

                {isAdmin && member.id !== currentUser.id && member.id !== conversation.adminId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMemberAction(member, 'remove')}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon name="UserMinus" size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Group Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="outline" className="w-full" iconName="Settings" iconPosition="left">
          Group Settings
        </Button>
        <Button variant="outline" className="w-full" iconName="Image" iconPosition="left">
          Shared Media
        </Button>
        {isAdmin ? (
          <Button variant="destructive" className="w-full" iconName="Trash2" iconPosition="left">
            Delete Group
          </Button>
        ) : (
          <Button variant="destructive" className="w-full" iconName="LogOut" iconPosition="left">
            Leave Group
          </Button>
        )}
      </div>
    </div>
  );
};

export default GroupChatSidebar;