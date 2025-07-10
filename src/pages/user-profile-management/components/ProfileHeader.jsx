import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, onPhotoUpdate, onStatusChange }) => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const statusOptions = [
    { value: 'online', label: 'Online', color: 'bg-success', icon: 'Circle' },
    { value: 'away', label: 'Away', color: 'bg-warning', icon: 'Clock' },
    { value: 'invisible', label: 'Invisible', color: 'bg-muted', icon: 'EyeOff' }
  ];

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoUpdate(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    setIsPhotoModalOpen(false);
  };

  const currentStatus = statusOptions.find(s => s.value === profile.status) || statusOptions[0];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border">
            <Image
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-standard"
          >
            <Icon name="Camera" size={16} />
          </button>
          
          {/* Verification Badge */}
          {profile.isVerified && (
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.location}</p>
            </div>
            
            {/* Status Selector */}
            <div className="relative mt-4 md:mt-0">
              <button
                onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-standard"
              >
                <div className={`w-3 h-3 rounded-full ${currentStatus.color}`} />
                <span className="text-sm font-medium">{currentStatus.label}</span>
                <Icon name="ChevronDown" size={16} />
              </button>

              {isStatusMenuOpen && (
                <div className="absolute right-0 top-12 w-40 bg-popover border border-border rounded-lg shadow-elevation-3 z-50">
                  {statusOptions.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => {
                        onStatusChange(status.value);
                        setIsStatusMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-standard first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className={`w-3 h-3 rounded-full ${status.color}`} />
                      <span>{status.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>{profile.friendsCount} friends</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>Joined {profile.joinDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{profile.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Upload Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Update Profile Photo</h3>
            <div className="space-y-4">
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button variant="outline" className="w-full" iconName="Upload">
                  Choose from Gallery
                </Button>
              </label>
              <Button variant="outline" className="w-full" iconName="Camera">
                Take Photo
              </Button>
            </div>
            <div className="flex space-x-3 mt-6">
              <Button variant="outline" onClick={() => setIsPhotoModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close status menu */}
      {isStatusMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsStatusMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileHeader;