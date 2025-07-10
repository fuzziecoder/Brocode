import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AboutSection = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age,
    location: profile.location,
    bio: profile.bio,
    occupation: profile.occupation,
    education: profile.education
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || formData.age < 18 || formData.age > 100) newErrors.age = 'Age must be between 18-100';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.bio.length > 500) newErrors.bio = 'Bio must be less than 500 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      age: profile.age,
      location: profile.location,
      bio: profile.bio,
      occupation: profile.occupation,
      education: profile.education
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">About Me</h2>
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

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            disabled={!isEditing}
            required
          />
          <Input
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
            error={errors.age}
            disabled={!isEditing}
            min="18"
            max="100"
            required
          />
        </div>

        <Input
          label="Location"
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          error={errors.location}
          disabled={!isEditing}
          placeholder="City, State, Country"
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={!isEditing}
            rows={4}
            maxLength={500}
            placeholder="Tell others about yourself, your interests, and what you're looking for in friendships..."
            className={`w-full px-3 py-2 border rounded-md text-sm transition-standard ${
              isEditing
                ? 'border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' :'border-border bg-muted text-muted-foreground'
            }`}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.bio && <span className="text-sm text-destructive">{errors.bio}</span>}
            <span className="text-xs text-muted-foreground ml-auto">
              {formData.bio.length}/500
            </span>
          </div>
        </div>

        {/* Professional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Occupation"
            type="text"
            value={formData.occupation}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            disabled={!isEditing}
            placeholder="Your job title or profession"
          />
          <Input
            label="Education"
            type="text"
            value={formData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
            disabled={!isEditing}
            placeholder="Your educational background"
          />
        </div>

        {/* Account Information */}
        {!isEditing && (
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground">{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Member since:</span>
                <span className="text-foreground">{profile.joinDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Verification:</span>
                <span className={`flex items-center space-x-1 ${profile.isVerified ? 'text-success' : 'text-warning'}`}>
                  <Icon name={profile.isVerified ? "CheckCircle" : "AlertCircle"} size={16} />
                  <span>{profile.isVerified ? 'Verified' : 'Pending'}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Friends:</span>
                <span className="text-foreground">{profile.friendsCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;