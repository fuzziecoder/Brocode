import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'UserCheck',
      title: 'Verified Profiles',
      description: 'All members go through identity verification'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'Complete control over your profile visibility'
    },
    {
      icon: 'AlertTriangle',
      title: 'Safe Reporting',
      description: '24/7 moderation and community safety tools'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-3">
          <Icon name="ShieldCheck" size={24} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Your Safety Matters</h3>
        <p className="text-sm text-muted-foreground">
          We're committed to creating a safe space for authentic male friendships
        </p>
      </div>

      <div className="space-y-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-success rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="Check" size={14} className="text-white" />
            </div>
            <div className="w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="Shield" size={14} className="text-white" />
            </div>
            <div className="w-8 h-8 bg-accent rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="Star" size={14} className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Trusted by 25,000+ Bros</p>
            <p className="text-xs text-muted-foreground">Join our verified community today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;