import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/user-registration' || location.pathname === '/user-login';

  const notifications = [
    { id: 1, type: 'message', title: 'New message from Alex', time: '2 min ago', unread: true },
    { id: 2, type: 'event', title: 'Basketball game tomorrow', time: '1 hour ago', unread: true },
    { id: 3, type: 'friend', title: 'Mike sent you a friend request', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'message') {
      navigate('/messaging-center');
    } else if (notification.type === 'event') {
      navigate('/event-management');
    }
    setIsNotificationOpen(false);
  };

  const handleProfileMenuClick = (action) => {
    switch (action) {
      case 'profile': navigate('/user-profile-management');
        break;
      case 'settings': console.log('Settings clicked');
        break;
      case 'logout': navigate('/user-login');
        break;
      default:
        break;
    }
    setIsProfileMenuOpen(false);
  };

  if (isAuthPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">BroCode</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard-home')}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">BroCode</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search friends, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-standard"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 z-60">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-muted transition-standard ${
                        notification.unread ? 'bg-accent/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-accent' : 'bg-muted'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-popover-foreground">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="rounded-full"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={18} color="white" />
              </div>
            </Button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-12 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-60">
                <div className="p-2">
                  <button
                    onClick={() => handleProfileMenuClick('profile')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-standard"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => handleProfileMenuClick('settings')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-standard"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={() => handleProfileMenuClick('logout')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-destructive hover:bg-muted rounded-md transition-standard"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isNotificationOpen || isProfileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsNotificationOpen(false);
            setIsProfileMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;