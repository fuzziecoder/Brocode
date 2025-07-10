import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const recentJoins = [
    { name: "Alex M.", location: "San Francisco", time: "2 min ago" },
    { name: "Mike R.", location: "New York", time: "5 min ago" },
    { name: "David L.", location: "Chicago", time: "8 min ago" }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Users" size={24} className="text-primary" />
          <span className="text-2xl font-bold text-foreground">12,847</span>
        </div>
        <p className="text-muted-foreground">Brothers already connected</p>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground text-sm">Recent joins:</h4>
        {recentJoins.map((member, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.location} • {member.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Verified community with safety guidelines</span>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;