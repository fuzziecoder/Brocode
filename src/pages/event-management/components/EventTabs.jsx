import React from 'react';
import Icon from '../../../components/AppIcon';

const EventTabs = ({ activeTab, onTabChange, eventCounts }) => {
  const tabs = [
    {
      id: 'discover',
      label: 'Discover',
      icon: 'Search',
      count: eventCounts.discover
    },
    {
      id: 'my-events',
      label: 'My Events',
      icon: 'Calendar',
      count: eventCounts.myEvents
    },
    {
      id: 'hosting',
      label: 'Hosting',
      icon: 'Users',
      count: eventCounts.hosting
    }
  ];

  return (
    <div className="sticky top-16 z-40 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-standard border-b-2 ${
                activeTab === tab.id
                  ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventTabs;