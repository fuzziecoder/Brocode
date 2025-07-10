import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingEventCard = ({ event }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewEvent = () => {
    navigate('/event-management');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-standard">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="Calendar" size={20} className="text-accent-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{event.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground truncate">{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex -space-x-2">
              {event.attendees.slice(0, 3).map((attendee, index) => (
                <Image
                  key={index}
                  src={attendee.avatar}
                  alt={attendee.name}
                  className="w-6 h-6 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {event.attendees.length} attending
            </span>
          </div>
        </div>
      </div>
      <Button variant="outline" size="sm" className="w-full mt-3" onClick={handleViewEvent}>
        View Event
      </Button>
    </div>
  );
};

export default UpcomingEventCard;