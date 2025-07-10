import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySection = ({ privacySettings, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({ ...privacySettings });

  const privacyOptions = [
    {
      id: 'profileVisibility',
      title: 'Profile Visibility',
      description: 'Who can see your profile',
      options: [
        { value: 'public', label: 'Everyone', description: 'Anyone can view your profile' },
        { value: 'friends', label: 'Friends Only', description: 'Only your friends can see your profile' },
        { value: 'private', label: 'Private', description: 'Only you can see your profile' }
      ]
    },
    {
      id: 'locationSharing',
      title: 'Location Sharing',
      description: 'How much location information to share',
      options: [
        { value: 'exact', label: 'Exact Location', description: 'Share your exact address' },
        { value: 'city', label: 'City Only', description: 'Share only your city' },
        { value: 'region', label: 'Region Only', description: 'Share only your state/region' },
        { value: 'none', label: 'No Location', description: 'Don\'t share location information' }
      ]
    },
    {
      id: 'contactPreferences',
      title: 'Contact Preferences',
      description: 'Who can contact you',
      options: [
        { value: 'everyone', label: 'Everyone', description: 'Anyone can send you messages' },
        { value: 'friends', label: 'Friends Only', description: 'Only friends can message you' },
        { value: 'verified', label: 'Verified Users', description: 'Only verified users can contact you' }
      ]
    }
  ];

  const toggleSettings = [
    {
      id: 'showOnlineStatus',
      title: 'Show Online Status',
      description: 'Let others see when you\'re online'
    },
    {
      id: 'allowFriendRequests',
      title: 'Allow Friend Requests',
      description: 'Let others send you friend requests'
    },
    {
      id: 'showInSearch',
      title: 'Show in Search Results',
      description: 'Allow others to find you in search'
    },
    {
      id: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive notifications via email'
    },
    {
      id: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Receive browser push notifications'
    },
    {
      id: 'eventInvitations',
      title: 'Event Invitations',
      description: 'Allow others to invite you to events'
    }
  ];

  const handleRadioChange = (category, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleToggleChange = (setting, checked) => {
    setSettings(prev => ({
      ...prev,
      [setting]: checked
    }));
  };

  const handleSave = () => {
    onUpdate(settings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSettings({ ...privacySettings });
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Privacy Settings</h2>
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

      <div className="space-y-8">
        {/* Radio Button Settings */}
        {privacyOptions.map((category) => (
          <div key={category.id} className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-foreground">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
            
            <div className="space-y-3">
              {category.options.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-standard ${
                    settings[category.id] === option.value
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted'
                  } ${!isEditing ? 'cursor-default' : ''}`}
                >
                  <input
                    type="radio"
                    name={category.id}
                    value={option.value}
                    checked={settings[category.id] === option.value}
                    onChange={(e) => handleRadioChange(category.id, e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Toggle Settings */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Notification & Activity Settings</h3>
          <div className="space-y-4">
            {toggleSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{setting.title}</div>
                  <div className="text-sm text-muted-foreground">{setting.description}</div>
                </div>
                <Checkbox
                  checked={settings[setting.id] || false}
                  onChange={(e) => handleToggleChange(setting.id, e.target.checked)}
                  disabled={!isEditing}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Tips */}
        <div className="border-t border-border pt-6">
          <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Privacy Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review your privacy settings regularly</li>
                <li>• Be cautious about sharing exact location information</li>
                <li>• Only accept friend requests from people you know or trust</li>
                <li>• Report any suspicious or inappropriate behavior</li>
                <li>• You can block users who make you uncomfortable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;