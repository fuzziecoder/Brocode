import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventDetailModal = ({ event, isOpen, onClose, onRSVP, onMessage }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRSVPColor = (status) => {
    switch (status) {
      case 'attending':
        return 'bg-success text-success-foreground';
      case 'maybe':
        return 'bg-warning text-warning-foreground';
      case 'declined':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'attendees', label: 'Attendees', icon: 'Users' },
    { id: 'location', label: 'Location', icon: 'MapPin' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div className="h-48 overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
          >
            <Icon name="X" size={20} />
          </Button>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {event.category}
          </div>
        </div>

        {/* Event Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">{event.title}</h2>
              <div className="flex items-center text-muted-foreground text-sm mb-2">
                <Icon name="Calendar" size={16} className="mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Icon name="Users" size={16} className="mr-2" />
                <span>{event.attendeeCount} attending • {event.maxAttendees} max</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {event.rsvpStatus && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRSVPColor(event.rsvpStatus)}`}>
                  {event.rsvpStatus}
                </span>
              )}
            </div>
          </div>

          {/* RSVP Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant={event.rsvpStatus === 'attending' ? 'default' : 'outline'}
              onClick={() => onRSVP(event.id, 'attending')}
              iconName="Check"
              iconPosition="left"
            >
              Attending
            </Button>
            <Button
              variant={event.rsvpStatus === 'maybe' ? 'default' : 'outline'}
              onClick={() => onRSVP(event.id, 'maybe')}
              iconName="Clock"
              iconPosition="left"
            >
              Maybe
            </Button>
            <Button
              variant={event.rsvpStatus === 'declined' ? 'default' : 'outline'}
              onClick={() => onRSVP(event.id, 'declined')}
              iconName="X"
              iconPosition="left"
            >
              Can't go
            </Button>
            <Button
              variant="ghost"
              onClick={() => onMessage(event.hostId)}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Message Host
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-standard ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Host</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={event.host?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                      alt={event.host?.name || 'Host'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{event.host?.name || 'Event Host'}</p>
                    <p className="text-sm text-muted-foreground">Hosting since {event.host?.memberSince || '2024'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Event Rules</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Be respectful to all attendees</li>
                  <li>• Arrive on time or notify the host</li>
                  <li>• Follow the community guidelines</li>
                  <li>• Have fun and make new connections!</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'attendees' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Attendees ({event.attendeeCount})</h3>
                <Button variant="outline" size="sm" iconName="UserPlus">
                  Invite Friends
                </Button>
              </div>
              
              <div className="space-y-3">
                {event.attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={attendee.avatar}
                          alt={attendee.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{attendee.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {attendee.isHost ? 'Host' : 'Attendee'}
                        </p>
                      </div>
                    </div>
                    {!attendee.isHost && (
                      <Button variant="ghost" size="sm" iconName="MessageCircle">
                        Message
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                  <Icon name="MapPin" size={16} />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="bg-muted rounded-lg overflow-hidden h-64">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={event.location}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&z=14&output=embed`}
                />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" iconName="Navigation" className="flex-1">
                  Get Directions
                </Button>
                <Button variant="outline" size="sm" iconName="Share" className="flex-1">
                  Share Location
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;