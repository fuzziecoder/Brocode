import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onRSVP, onViewDetails }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRSVPColor = (status) => {
    switch (status) {
      case 'attending':
        return 'text-success bg-success/10';
      case 'maybe':
        return 'text-warning bg-warning/10';
      case 'declined':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getRSVPIcon = (status) => {
    switch (status) {
      case 'attending':
        return 'Check';
      case 'maybe':
        return 'Clock';
      case 'declined':
        return 'X';
      default:
        return 'Calendar';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden hover:shadow-elevation-2 transition-standard">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRSVPColor(event.rsvpStatus)}`}>
            <Icon name={getRSVPIcon(event.rsvpStatus)} size={12} className="inline mr-1" />
            {event.rsvpStatus || 'Not responded'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {event.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg line-clamp-2">{event.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewDetails(event)}
            className="flex-shrink-0 ml-2"
          >
            <Icon name="ExternalLink" size={16} />
          </Button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground text-sm">
            <Icon name="Calendar" size={16} className="mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Icon name="MapPin" size={16} className="mr-2" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Icon name="Users" size={16} className="mr-2" />
            <span>{event.attendeeCount} attending • {event.maxAttendees} max</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {event.attendees.slice(0, 3).map((attendee, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                >
                  <Image
                    src={attendee.avatar}
                    alt={attendee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {event.attendeeCount > 3 && (
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    +{event.attendeeCount - 3}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {event.rsvpStatus !== 'attending' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRSVP(event.id, 'attending')}
                className="text-xs"
              >
                Join
              </Button>
            )}
            {event.rsvpStatus === 'attending' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRSVP(event.id, null)}
                className="text-xs text-error hover:text-error"
              >
                Leave
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;