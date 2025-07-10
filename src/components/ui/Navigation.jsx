import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/user-registration' || location.pathname === '/user-login';

  if (isAuthPage) {
    return null;
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard-home',
      icon: 'Home',
      badge: null,
    },
    {
      name: 'Messages',
      path: '/messaging-center',
      icon: 'MessageCircle',
      badge: 3,
    },
    {
      name: 'Events',
      path: '/event-management',
      icon: 'Calendar',
      badge: 2,
    },
    {
      name: 'Profile',
      path: '/user-profile-management',
      icon: 'User',
      badge: null,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:flex lg:flex-col lg:bg-card lg:border-r lg:border-border lg:pt-16">
        <div className="flex-1 flex flex-col min-h-0 pt-6">
          <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-standard w-full ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground shadow-elevation-1'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    className={`mr-3 flex-shrink-0 ${
                      isActive(item.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <span className={`ml-3 inline-block py-0.5 px-2 text-xs font-medium rounded-full ${
                      isActive(item.path)
                        ? 'bg-primary-foreground text-primary'
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="grid grid-cols-4 h-16">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 transition-standard ${
                isActive(item.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon
                  name={item.icon}
                  size={20}
                  className={isActive(item.path) ? 'text-primary' : 'text-muted-foreground'}
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${
                isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Toggle (if needed for additional features) */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;