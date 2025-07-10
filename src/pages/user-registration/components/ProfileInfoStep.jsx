import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const ProfileInfoStep = ({ 
  formData, 
  setFormData, 
  errors, 
  onNext, 
  onBack, 
  isLoading 
}) => {
  const [locationLoading, setLocationLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationDetection = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock reverse geocoding
          const mockLocation = "San Francisco, CA";
          setFormData(prev => ({ ...prev, location: mockLocation }));
          setLocationLoading(false);
        },
        (error) => {
          console.error('Location detection failed:', error);
          setLocationLoading(false);
        }
      );
    } else {
      setLocationLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Tell Us About Yourself</h2>
        <p className="text-muted-foreground">Help us connect you with the right brothers</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Display Name"
          type="text"
          placeholder="How should we call you?"
          value={formData.displayName}
          onChange={(e) => handleInputChange('displayName', e.target.value)}
          error={errors.displayName}
          description="This will be visible to other members"
          required
        />

        <Input
          label="Age"
          type="number"
          placeholder="Enter your age"
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          error={errors.age}
          min="18"
          max="100"
          required
        />

        <div className="space-y-2">
          <Input
            label="Location"
            type="text"
            placeholder="Enter your city and state"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            error={errors.location}
            description="Used to find local friends and events"
            required
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLocationDetection}
            loading={locationLoading}
            iconName="MapPin"
            iconPosition="left"
            className="w-full"
          >
            Use Current Location
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          variant="default"
          onClick={onNext}
          loading={isLoading}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfoStep;