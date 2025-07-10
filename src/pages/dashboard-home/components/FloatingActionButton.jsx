import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: 'MessageSquare', label: 'Create Post', action: () => console.log('Create post') },
    { icon: 'Calendar', label: 'Create Event', action: () => console.log('Create event') },
    { icon: 'Camera', label: 'Share Photo', action: () => console.log('Share photo') },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40">
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-2">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="bg-card border border-border px-3 py-1 rounded-lg text-sm font-medium text-foreground shadow-elevation-2">
                {action.label}
              </span>
              <Button
                variant="default"
                size="icon"
                onClick={action.action}
                className="w-12 h-12 rounded-full shadow-elevation-2"
              >
                <Icon name={action.icon} size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        variant="default"
        size="icon"
        onClick={toggleMenu}
        className="w-14 h-14 rounded-full shadow-elevation-3 hover:shadow-elevation-3"
      >
        <Icon name={isOpen ? 'X' : 'Plus'} size={24} />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;