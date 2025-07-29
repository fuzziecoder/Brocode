import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';
import CreateEventModal from './components/CreateEventModal';
import EventDetailModal from './components/EventDetailModal';
import EventTabs from './components/EventTabs';
import MapView from './components/MapView';
import { io } from 'socket.io-client';

const EventManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    distance: 'any',
    groupSize: 'all',
    time: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from backend on mount
    fetch('http://localhost:5000/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  const [myEvents, setMyEvents] = useState([
    {
      id: 7,
      title: "My Weekly Poker Night",
      description: `Join our regular poker night for some friendly competition and good times. Perfect for beginners and experienced players alike.\n\nGame details:\n• Texas Hold'em format\n• $20 buy-in\n• Snacks and drinks provided\n• Prizes for top 3 players\n\nCome for the cards, stay for the friendship!`,
      category: "Social Hangouts",
      date: "2025-07-18T19:30",
      location: "My Apartment, 789 Poker St, Queens, NY",
      maxAttendees: 8,
      attendeeCount: 5,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      attendees: [
        { name: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", isHost: true },
        { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }
      ],
      rsvpStatus: "attending",
      isHost: true,
      host: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        memberSince: "2024"
      },
      hostId: 'current-user'
    }
  ]);

  const [hostingEvents, setHostingEvents] = useState([
    {
      id: 8,
      title: "Business Networking Breakfast",
      description: `Start your day right with coffee, networking, and meaningful business connections. Perfect for entrepreneurs, freelancers, and professionals looking to expand their network.\n\nWhat's included:\n• Continental breakfast\n• Structured networking activities\n• Business card exchange\n• Guest speaker presentation\n\nBring your business cards and elevator pitch!`,
      category: "Business & Networking",
      date: "2025-07-19T08:00",
      location: "Downtown Business Center, 321 Business Blvd, Manhattan, NY",
      maxAttendees: 40,
      attendeeCount: 28,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      attendees: [
        { name: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", isHost: true },
        { name: "Robert Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }
      ],
      rsvpStatus: "attending",
      isHost: true,
      host: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        memberSince: "2024"
      },
      hostId: 'current-user'
    }
  ]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('event:created', (event) => {
      setEvents((prev) => [...prev, event]);
    });

    socket.on('event:updated', (updatedEvent) => {
      setEvents((prev) => prev.map(ev => ev._id === updatedEvent._id ? updatedEvent : ev));
    });

    socket.on('event:deleted', ({ _id }) => {
      setEvents((prev) => prev.filter(ev => ev._id !== _id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getFilteredEvents = () => {
    let eventsToFilter = [];
    
    switch (activeTab) {
      case 'discover':
        eventsToFilter = events;
        break;
      case 'my-events':
        eventsToFilter = myEvents;
        break;
      case 'hosting':
        eventsToFilter = hostingEvents;
        break;
      default:
        eventsToFilter = events;
    }

    return eventsToFilter.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || 
                             event.category.toLowerCase().includes(filters.category.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  };

  const handleRSVP = (eventId, status) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              rsvpStatus: status,
              attendeeCount: status === 'attending' && event.rsvpStatus !== 'attending'
                ? event.attendeeCount + 1
                : status !== 'attending' && event.rsvpStatus === 'attending'
                ? event.attendeeCount - 1
                : event.attendeeCount
            }
          : event
      )
    );
  };

  const handleCreateEvent = (newEvent) => {
    // No need to update state here; real-time Socket.IO and backend fetch will handle it
  };

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setIsEventDetailOpen(true);
  };

  const handleMessageHost = (hostId) => {
    navigate('/messaging-center', { state: { userId: hostId } });
  };

  const eventCounts = {
    discover: events.length,
    myEvents: myEvents.length,
    hosting: hostingEvents.length
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border pt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Event Management</h1>
              <p className="text-muted-foreground">Discover, create, and manage brotherhood events</p>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Create Event
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(true)}
              iconName="Filter"
              iconPosition="left"
            >
              Filters
            </Button>
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                iconName="Grid3X3"
              />
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                iconName="Map"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event Tabs */}
      <EventTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        eventCounts={eventCounts}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:pl-64">
        {viewMode === 'map' ? (
          <MapView
            events={filteredEvents}
            onEventSelect={handleViewEventDetails}
            isVisible={true}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRSVP={handleRSVP}
                  onViewDetails={handleViewEventDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'discover' 
                    ? "Try adjusting your search or filters to find events"
                    : activeTab === 'my-events' ? "You haven't joined any events yet" :"You haven't created any events yet"
                  }
                </p>
                {activeTab !== 'discover' && (
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create Your First Event
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <EventFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />

      <EventDetailModal
        event={selectedEvent}
        isOpen={isEventDetailOpen}
        onClose={() => setIsEventDetailOpen(false)}
        onRSVP={handleRSVP}
        onMessage={handleMessageHost}
      />

      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default EventManagement;