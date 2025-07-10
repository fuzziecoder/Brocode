import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ events, onEventSelect, isVisible }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleViewDetails = (event) => {
    onEventSelect(event);
    setSelectedEvent(null);
  };

  if (!isVisible) return null;

  return (
    <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Events Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
        />
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button variant="secondary" size="icon" className="bg-card shadow-elevation-2">
          <Icon name="Plus" size={16} />
        </Button>
        <Button variant="secondary" size="icon" className="bg-card shadow-elevation-2">
          <Icon name="Minus" size={16} />
        </Button>
        <Button variant="secondary" size="icon" className="bg-card shadow-elevation-2">
          <Icon name="Navigation" size={16} />
        </Button>
      </div>

      {/* Event Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {events.slice(0, 5).map((event, index) => (
          <div
            key={event.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`
            }}
            onClick={() => handleEventClick(event)}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-elevation-2 hover:scale-110 transition-transform">
                <Icon name="MapPin" size={16} color="white" />
              </div>
              {selectedEvent?.id === event.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-card border border-border rounded-lg shadow-elevation-3 p-3">
                  <div className="text-sm">
                    <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                    <p className="text-muted-foreground mb-2 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {event.attendeeCount} attending
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(event)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-elevation-2">
        <div className="text-sm">
          <h4 className="font-semibold text-foreground mb-2">Map Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-muted-foreground text-xs">Upcoming Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-muted-foreground text-xs">Your Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close popup */}
      {selectedEvent && (
        <div
          className="absolute inset-0"
          onClick={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default MapView;