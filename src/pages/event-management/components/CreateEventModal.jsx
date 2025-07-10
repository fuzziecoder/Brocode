import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    privacy: 'public',
    image: ''
  });

  const categoryOptions = [
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'outdoor', label: 'Outdoor Adventures' },
    { value: 'food', label: 'Food & Drinks' },
    { value: 'tech', label: 'Technology' },
    { value: 'music', label: 'Music & Arts' },
    { value: 'business', label: 'Business & Networking' },
    { value: 'social', label: 'Social Hangouts' }
  ];

  const privacyOptions = [
    { value: 'public', label: 'Public - Anyone can join' },
    { value: 'friends', label: 'Friends only' },
    { value: 'invite', label: 'Invite only' }
  ];

  const handleInputChange = (field, value) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      date: `${eventData.date}T${eventData.time}`,
      attendeeCount: 1,
      attendees: [{
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }],
      rsvpStatus: 'attending',
      isHost: true
    };
    
    onCreateEvent(newEvent);
    onClose();
    setCurrentStep(1);
    setEventData({
      title: '',
      description: '',
      category: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      privacy: 'public',
      image: ''
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return eventData.title && eventData.description && eventData.category;
      case 2:
        return eventData.date && eventData.time && eventData.location;
      case 3:
        return eventData.maxAttendees && eventData.privacy;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Create Event</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round((currentStep / 3) * 100)}% complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-96">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground mb-4">Event Details</h3>
              
              <Input
                label="Event title"
                type="text"
                placeholder="What's your event about?"
                value={eventData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Tell people what to expect..."
                  value={eventData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              <Select
                label="Category"
                options={categoryOptions}
                value={eventData.category}
                onChange={(value) => handleInputChange('category', value)}
                placeholder="Choose a category"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground mb-4">When & Where</h3>
              
              <Input
                label="Date"
                type="date"
                value={eventData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />

              <Input
                label="Time"
                type="time"
                value={eventData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                required
              />

              <Input
                label="Location"
                type="text"
                placeholder="Where will this happen?"
                value={eventData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />

              <Input
                label="Event image URL (optional)"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={eventData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground mb-4">Settings</h3>
              
              <Input
                label="Maximum attendees"
                type="number"
                placeholder="How many people can join?"
                value={eventData.maxAttendees}
                onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                min="2"
                max="100"
                required
              />

              <Select
                label="Privacy"
                options={privacyOptions}
                value={eventData.privacy}
                onChange={(value) => handleInputChange('privacy', value)}
              />

              <div className="bg-muted p-3 rounded-md">
                <h4 className="font-medium text-foreground mb-2">Event Summary</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Title:</strong> {eventData.title}</p>
                  <p><strong>Category:</strong> {categoryOptions.find(c => c.value === eventData.category)?.label}</p>
                  <p><strong>Date:</strong> {eventData.date} at {eventData.time}</p>
                  <p><strong>Location:</strong> {eventData.location}</p>
                  <p><strong>Max attendees:</strong> {eventData.maxAttendees}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handlePrevious}
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          
          <Button
            onClick={currentStep === 3 ? handleSubmit : handleNext}
            disabled={!isStepValid()}
          >
            {currentStep === 3 ? 'Create Event' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;