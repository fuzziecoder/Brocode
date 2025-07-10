import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const InterestsStep = ({ 
  formData, 
  setFormData, 
  errors, 
  onNext, 
  onBack, 
  isLoading 
}) => {
  const popularInterests = [
    "Sports", "Gaming", "Fitness", "Technology", "Music", "Movies",
    "Cooking", "Travel", "Photography", "Reading", "Hiking", "Basketball",
    "Football", "Golf", "Fishing", "Cars", "Motorcycles", "Art",
    "Business", "Investing", "Coding", "Entrepreneurship", "Podcasts", "Comedy"
  ];

  const handleInterestToggle = (interest) => {
    const currentInterests = formData.interests || [];
    const isSelected = currentInterests.includes(interest);
    
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        interests: currentInterests.filter(i => i !== interest)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: [...currentInterests, interest]
      }));
    }
  };

  const handleCustomInterest = (value) => {
    if (value && !formData.interests?.includes(value)) {
      setFormData(prev => ({
        ...prev,
        interests: [...(prev.interests || []), value],
        customInterest: ''
      }));
    }
  };

  const removeInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">What Are You Into?</h2>
        <p className="text-muted-foreground">Select your interests to find brothers with similar hobbies</p>
      </div>

      {/* Selected Interests */}
      {formData.interests && formData.interests.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Selected Interests:</label>
          <div className="flex flex-wrap gap-2">
            {formData.interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
              >
                <span>{interest}</span>
                <button
                  onClick={() => removeInterest(interest)}
                  className="hover:bg-primary/80 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Interests */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Popular Interests:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {popularInterests.map((interest) => {
            const isSelected = formData.interests?.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-standard ${
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Interest Input */}
      <div className="space-y-2">
        <Input
          label="Add Custom Interest"
          type="text"
          placeholder="Type and press Enter"
          value={formData.customInterest || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, customInterest: e.target.value }))}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleCustomInterest(formData.customInterest);
            }
          }}
          description="Can't find your interest? Add it here"
        />
      </div>

      {errors.interests && (
        <p className="text-sm text-destructive">{errors.interests}</p>
      )}

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
          disabled={!formData.interests || formData.interests.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default InterestsStep;