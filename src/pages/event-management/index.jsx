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

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Weekend Basketball Pickup Game",
      description: `Join us for a friendly basketball game at Central Park! We're looking for players of all skill levels to come together for some competitive fun. Bring your A-game and get ready to make some new friends while breaking a sweat.\n\nWhat to bring:\n• Basketball shoes\n• Water bottle\n• Positive attitude\n\nWe'll provide the basketball and good vibes!`,
      category: "Sports & Fitness",
      date: "2025-07-12T10:00",
      location: "Central Park Basketball Courts, New York, NY",
      maxAttendees: 12,
      attendeeCount: 8,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
      attendees: [
        { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", isHost: true },
        { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
        { name: "David Rodriguez", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
        { name: "James Wilson", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" }
      ],
      rsvpStatus: null,
      host: {
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        memberSince: "2023"
      },
      hostId: 1
    },
    {
      id: 2,
      title: "Gaming Night - FIFA Tournament",
      description: `Calling all FIFA enthusiasts! Join us for an epic tournament night with prizes, snacks, and bragging rights on the line. Whether you're a seasoned pro or just love the beautiful game, come compete in our friendly tournament.\n\nTournament format:\n• Single elimination bracket\n• 10-minute matches\n• Winner takes all prize pool\n\nSnacks and drinks provided!`,
      category: "Gaming",
      date: "2025-07-13T19:00",
      location: "GameHub Lounge, 123 Main St, Brooklyn, NY",
      maxAttendees: 16,
      attendeeCount: 12,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      attendees: [
        { name: "Carlos Martinez", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", isHost: true },
        { name: "Ryan Thompson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
        { name: "Kevin Lee", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
      ],
      rsvpStatus: "attending",
      host: {
        name: "Carlos Martinez",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        memberSince: "2022"
      },
      hostId: 2
    },
    {
      id: 3,
      title: "Hiking Adventure - Bear Mountain",
      description: `Escape the city and join us for a challenging but rewarding hike up Bear Mountain! Perfect for intermediate hikers looking to connect with nature and meet fellow outdoor enthusiasts.\n\nTrail details:\n• 5.2 miles round trip\n• Moderate difficulty\n• Scenic views at the summit\n• Estimated 3-4 hours\n\nBring plenty of water, snacks, and hiking boots!`,
      category: "Outdoor Adventures",
      date: "2025-07-14T08:00",
      location: "Bear Mountain State Park, NY",
      maxAttendees: 10,
      attendeeCount: 6,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
      attendees: [
        { name: "Tom Anderson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", isHost: true },
        { name: "Steve Miller", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" }
      ],
      rsvpStatus: "maybe",
      host: {
        name: "Tom Anderson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        memberSince: "2024"
      },
      hostId: 3
    },
    {
      id: 4,
      title: "Craft Beer Tasting & Networking",
      description: `Join fellow beer enthusiasts for an evening of craft beer tasting and professional networking. Sample local brews while making meaningful connections in a relaxed atmosphere.\n\nWhat's included:\n• 6 craft beer samples\n• Appetizer platters\n• Networking activities\n• Beer education session\n\nPerfect for professionals looking to expand their network!`,
      category: "Food & Drinks",
      date: "2025-07-15T18:30",
      location: "Brooklyn Brewery, 79 N 11th St, Brooklyn, NY",
      maxAttendees: 25,
      attendeeCount: 18,
      image: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&h=300&fit=crop",
      attendees: [
        { name: "Mark Davis", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", isHost: true },
        { name: "John Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }
      ],
      rsvpStatus: null,
      host: {
        name: "Mark Davis",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        memberSince: "2023"
      },
      hostId: 4
    },
    {
      id: 5,
      title: "Tech Meetup - AI & Machine Learning",
      description: `Dive deep into the world of AI and Machine Learning with fellow tech enthusiasts! This meetup features presentations, hands-on workshops, and networking opportunities for developers and tech professionals.\n\nAgenda:\n• AI trends presentation\n• ML workshop session\n• Q&A with industry experts\n• Networking & pizza\n\nBring your laptop for the workshop!`,
      category: "Technology",
      date: "2025-07-16T19:00",
      location: "TechHub NYC, 902 Broadway, New York, NY",
      maxAttendees: 30,
      attendeeCount: 22,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      attendees: [
        { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", isHost: true },
        { name: "Daniel Park", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }
      ],
      rsvpStatus: "attending",
      host: {
        name: "Sarah Kim",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        memberSince: "2022"
      },
      hostId: 5
    },
    {
      id: 6,
      title: "Live Music Jam Session",
      description: `Musicians and music lovers unite! Join us for an open jam session where you can showcase your talents, collaborate with other musicians, or simply enjoy great live music.\n\nWhat to expect:\n• Open mic opportunities\n• Instrument sharing\n• Collaborative performances\n• Music networking\n\nBring your instrument or just your love for music!`,
      category: "Music & Arts",
      date: "2025-07-17T20:00",
      location: "The Music Hall, 456 Music Ave, Manhattan, NY",
      maxAttendees: 20,
      attendeeCount: 14,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      attendees: [
        { name: "Jake Williams", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", isHost: true },
        { name: "Chris Brown", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" }
      ],
      rsvpStatus: null,
      host: {
        name: "Jake Williams",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        memberSince: "2023"
      },
      hostId: 6
    }
  ]);

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
    if (newEvent.privacy === 'public') {
      setEvents(prev => [newEvent, ...prev]);
    }
    setHostingEvents(prev => [newEvent, ...prev]);
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