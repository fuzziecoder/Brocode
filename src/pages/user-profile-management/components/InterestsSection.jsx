import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InterestsSection = ({ interests, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([...interests]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customInterest, setCustomInterest] = useState('');

  const popularInterests = [
    'Gaming', 'Sports', 'Music', 'Movies', 'Technology', 'Fitness', 'Travel',
    'Photography', 'Cooking', 'Reading', 'Art', 'Outdoor Activities', 'Cars',
    'Basketball', 'Football', 'Soccer', 'Tennis', 'Golf', 'Hiking', 'Cycling',
    'Programming', 'Entrepreneurship', 'Investing', 'Cryptocurrency', 'AI/ML',
    'Guitar', 'Piano', 'Drums', 'Singing', 'Dancing', 'Writing', 'Podcasts',
    'Board Games', 'Chess', 'Poker', 'Fishing', 'Camping', 'Rock Climbing',
    'Martial Arts', 'Yoga', 'Meditation', 'Philosophy', 'History', 'Science'
  ];

  const filteredInterests = popularInterests.filter(interest =>
    interest.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedInterests.includes(interest)
  );

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      setSelectedInterests(prev => [...prev, interest]);
    }
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests(prev => [...prev, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const handleSave = () => {
    onUpdate(selectedInterests);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedInterests([...interests]);
    setSearchTerm('');
    setCustomInterest('');
    setIsEditing(false);
  };

  const getInterestColor = (interest) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800'
    ];
    return colors[interest.length % colors.length];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Interests & Hobbies</h2>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)} iconName="Edit">
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} iconName="Save">
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Selected Interests */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">
          Your Interests ({selectedInterests.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedInterests.map((interest) => (
            <span
              key={interest}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getInterestColor(interest)}`}
            >
              {interest}
              {isEditing && (
                <button
                  onClick={() => handleInterestToggle(interest)}
                  className="ml-2 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </span>
          ))}
          {selectedInterests.length === 0 && (
            <p className="text-muted-foreground text-sm">No interests selected yet</p>
          )}
        </div>
      </div>

      {/* Edit Mode */}
      {isEditing && (
        <div className="space-y-6">
          {/* Search Interests */}
          <div>
            <Input
              label="Search Interests"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for interests..."
              className="mb-3"
            />
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {filteredInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-standard"
                >
                  <Icon name="Plus" size={14} className="mr-1" />
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Add Custom Interest */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Add Custom Interest
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="Enter custom interest..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomInterest()}
              />
              <Button
                variant="outline"
                onClick={handleAddCustomInterest}
                disabled={!customInterest.trim()}
                iconName="Plus"
              >
                Add
              </Button>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Popular Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Sports', 'Technology', 'Arts', 'Outdoor', 'Gaming', 'Music', 'Fitness', 'Travel'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSearchTerm(category.toLowerCase())}
                  className="flex items-center justify-center px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-standard text-sm"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interest Matching Info */}
      {!isEditing && (
        <div className="border-t border-border pt-6">
          <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
            <Icon name="Lightbulb" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Interest Matching</h4>
              <p className="text-sm text-muted-foreground">
                Your interests help us connect you with like-minded friends. The more interests you add, 
                the better we can match you with people who share your passions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestsSection;