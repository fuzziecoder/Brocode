import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = () => {
  const stats = [
    {
      icon: 'Users',
      value: '25,000+',
      label: 'Active Bros',
      color: 'text-primary'
    },
    {
      icon: 'Calendar',
      value: '500+',
      label: 'Events This Month',
      color: 'text-accent'
    },
    {
      icon: 'MessageCircle',
      value: '1M+',
      label: 'Messages Sent',
      color: 'text-success'
    },
    {
      icon: 'MapPin',
      value: '150+',
      label: 'Cities Connected',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Join the Brotherhood</h3>
        <p className="text-sm text-muted-foreground">
          Thousands of men building genuine friendships every day
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-background mb-2 ${stat.color}`}>
              <Icon name={stat.icon} size={20} />
            </div>
            <div className="text-lg font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Icon name="Shield" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Safe & Verified</h4>
            <p className="text-xs text-muted-foreground">
              All members go through our verification process to ensure authentic connections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;