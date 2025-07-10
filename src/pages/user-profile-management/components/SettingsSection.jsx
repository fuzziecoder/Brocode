import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsSection = ({ settings, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...settings });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleChange = (field, checked) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...settings });
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // Mock delete account functionality
    console.log('Account deletion requested');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Account Settings</h2>
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
          {/* Email Settings */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Email & Password</h3>
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
              />
              {isEditing && (
                <Button variant="outline" iconName="Key">
                  Change Password
                </Button>
              )}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-foreground">Friend Requests</div>
                  <div className="text-sm text-muted-foreground">Get notified when someone sends you a friend request</div>
                </div>
                <Checkbox
                  checked={formData.notifyFriendRequests}
                  onChange={(e) => handleToggleChange('notifyFriendRequests', e.target.checked)}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-foreground">Messages</div>
                  <div className="text-sm text-muted-foreground">Get notified when you receive new messages</div>
                </div>
                <Checkbox
                  checked={formData.notifyMessages}
                  onChange={(e) => handleToggleChange('notifyMessages', e.target.checked)}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-foreground">Event Invitations</div>
                  <div className="text-sm text-muted-foreground">Get notified when you're invited to events</div>
                </div>
                <Checkbox
                  checked={formData.notifyEvents}
                  onChange={(e) => handleToggleChange('notifyEvents', e.target.checked)}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-foreground">Weekly Digest</div>
                  <div className="text-sm text-muted-foreground">Receive a weekly summary of your activity</div>
                </div>
                <Checkbox
                  checked={formData.weeklyDigest}
                  onChange={(e) => handleToggleChange('weeklyDigest', e.target.checked)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Activity Settings */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Activity Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-foreground">Auto-Away Status</div>
                  <div className="text-sm text-muted-foreground">Automatically set status to away after inactivity</div>
                </div>
                <Checkbox
                  checked={formData.autoAway}
                  onChange={(e) => handleToggleChange('autoAway', e.target.checked)}
                  disabled={!isEditing}
                />
              </div>

              {formData.autoAway && (
                <div className="ml-6">
                  <Input
                    label="Auto-away timeout (minutes)"
                    type="number"
                    value={formData.autoAwayTimeout}
                    onChange={(e) => handleInputChange('autoAwayTimeout', parseInt(e.target.value))}
                    disabled={!isEditing}
                    min="5"
                    max="120"
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-foreground">Read Receipts</div>
                  <div className="text-sm text-muted-foreground">Let others know when you've read their messages</div>
                </div>
                <Checkbox
                  checked={formData.readReceipts}
                  onChange={(e) => handleToggleChange('readReceipts', e.target.checked)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Account Verification</h2>
        <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            formData.isVerified ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
          }`}>
            <Icon name={formData.isVerified ? "CheckCircle" : "AlertCircle"} size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">
              {formData.isVerified ? 'Account Verified' : 'Verification Pending'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formData.isVerified 
                ? 'Your account has been verified. You have access to all features.'
                : 'Complete verification to unlock all features and build trust with other members.'
              }
            </p>
          </div>
          {!formData.isVerified && (
            <Button variant="outline" iconName="Shield">
              Start Verification
            </Button>
          )}
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Data & Privacy</h2>
        <div className="space-y-4">
          <Button variant="outline" iconName="Download" className="w-full justify-start">
            Download Your Data
          </Button>
          <Button variant="outline" iconName="FileText" className="w-full justify-start">
            Privacy Policy
          </Button>
          <Button variant="outline" iconName="Shield" className="w-full justify-start">
            Terms of Service
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-destructive rounded-lg p-6">
        <h2 className="text-xl font-semibold text-destructive mb-4">Danger Zone</h2>
        <div className="space-y-4">
          <div className="p-4 bg-destructive/5 rounded-lg">
            <h3 className="font-medium text-foreground mb-2">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="destructive" 
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete your account? This action cannot be undone and you will lose all your data, friends, and messages.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteAccount}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;