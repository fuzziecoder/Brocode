import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = ({ currentStep, totalSteps }) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">BroCode</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;