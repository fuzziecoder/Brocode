import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WelcomeSection from './components/WelcomeSection';
import QuickActionCard from './components/QuickActionCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import UpcomingEventCard from './components/UpcomingEventCard';
import FriendSuggestionCard from './components/FriendSuggestionCard';
import FloatingActionButton from './components/FloatingActionButton';
import LiveChatPreview from './components/LiveChatPreview';

const DashboardHome = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activities, setActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  // Mock stats data
  const userStats = {
    friendCount: 47,
    upcomingEvents: 3,
    unreadMessages: 5
  };

  // Mock activities data
  const mockActivities = [
    {
      id: 1,
      type: 'post',
      user: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Just finished an amazing hiking trip at Mount Wilson! The brotherhood made it even better. Who\'s up for the next adventure?",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
      likes: 12,
      comments: 4,
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 2,
      type: 'event_created',
      user: {
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Created a new event: \'Weekend Basketball Tournament\' - Join us this Saturday at Central Park!",
      likes: 8,
      comments: 6,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      type: 'friend_request',
      user: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
      },
      content: "Accepted your friend request! Looking forward to connecting and sharing some great experiences together.",
      likes: 15,
      comments: 2,
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 4,
      type: 'photo',
      user: {
        name: "Ryan Thompson",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
      },
      content: "Great night out with the crew! Brotherhood at its finest. Thanks for the memories, guys!",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
      likes: 23,
      comments: 8,
      timestamp: new Date(Date.now() - 10800000)
    }
  ];

  // Mock upcoming events
  const mockUpcomingEvents = [
    {
      id: 1,
      title: "Weekend Basketball Tournament",
      date: "2025-07-12T10:00:00",
      location: "Central Park Courts",
      attendees: [
        { name: "Mike", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
        { name: "David", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
        { name: "James", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face" }
      ]
    },
    {
      id: 2,
      title: "Monthly Poker Night",
      date: "2025-07-15T19:00:00",
      location: "Downtown Community Center",
      attendees: [
        { name: "Alex", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
        { name: "Ryan", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" }
      ]
    },
    {
      id: 3,
      title: "Hiking Adventure",
      date: "2025-07-20T08:00:00",
      location: "Blue Ridge Trail",
      attendees: [
        { name: "Mike", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
        { name: "David", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
        { name: "James", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face" },
        { name: "Ryan", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" }
      ]
    }
  ];

  // Mock friend suggestions
  const mockFriendSuggestions = [
    {
      id: 1,
      name: "Carlos Martinez",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      location: "Los Angeles, CA",
      mutualFriends: 3,
      interests: ["Basketball", "Gaming", "Photography"]
    },
    {
      id: 2,
      name: "Kevin Park",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
      location: "San Francisco, CA",
      mutualFriends: 5,
      interests: ["Hiking", "Tech", "Coffee"]
    },
    {
      id: 3,
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
      location: "New York, NY",
      mutualFriends: 2,
      interests: ["Fitness", "Music", "Travel"]
    }
  ];

  // Mock conversations
  const mockConversations = [
    {
      id: 1,
      name: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      unreadCount: 2,
      lastMessage: {
        content: "Hey man, are you ready for the basketball tournament this weekend?",
        timestamp: new Date(Date.now() - 300000)
      }
    },
    {
      id: 2,
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      unreadCount: 0,
      lastMessage: {
        content: "Thanks for organizing the event! Looking forward to it.",
        timestamp: new Date(Date.now() - 1800000)
      }
    },
    {
      id: 3,
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      unreadCount: 1,
      lastMessage: {
        content: "Great meeting you at the hiking event last week!",
        timestamp: new Date(Date.now() - 3600000)
      }
    },
    {
      id: 4,
      name: "Ryan Thompson",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      unreadCount: 0,
      lastMessage: {
        content: "Let\'s plan another night out soon!",
        timestamp: new Date(Date.now() - 7200000)
      }
    }
  ];

  // Quick action cards data
  const quickActions = [
    {
      title: "Find Friends",
      description: "Discover new connections",
      icon: "UserPlus",
      route: "/user-profile-management",
      color: "primary"
    },
    {
      title: "Join Events",
      description: "Explore local meetups",
      icon: "Calendar",
      route: "/event-management",
      color: "accent"
    },
    {
      title: "Start Chatting",
      description: "Connect with your bros",
      icon: "MessageCircle",
      route: "/messaging-center",
      color: "success"
    }
  ];

  useEffect(() => {
    // Initialize data
    setActivities(mockActivities);
    setUpcomingEvents(mockUpcomingEvents);
    setFriendSuggestions(mockFriendSuggestions);
    setConversations(mockConversations);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLoadMore = () => {
    console.log('Loading more activities...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pt-16 pb-20 lg:pb-6">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="lg:flex lg:space-x-6">
            {/* Left Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-20 space-y-6">
                {/* Quick Actions */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
                  {quickActions.map((action, index) => (
                    <QuickActionCard
                      key={index}
                      title={action.title}
                      description={action.description}
                      icon={action.icon}
                      route={action.route}
                      color={action.color}
                    />
                  ))}
                </div>

                {/* Friend Suggestions */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">People You May Know</h2>
                  {friendSuggestions.slice(0, 2).map((friend) => (
                    <FriendSuggestionCard key={friend.id} friend={friend} />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
              {/* Welcome Section */}
              <WelcomeSection user={currentUser} stats={userStats} />

              {/* Mobile Quick Actions */}
              <div className="lg:hidden mb-6">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {quickActions.map((action, index) => (
                    <div key={index} className="flex-shrink-0 w-64">
                      <QuickActionCard
                        title={action.title}
                        description={action.description}
                        icon={action.icon}
                        route={action.route}
                        color={action.color}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pull to Refresh */}
              <div className="mb-6">
                <Button
                  variant="ghost"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="w-full"
                >
                  <Icon name={isRefreshing ? "Loader2" : "RefreshCw"} size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
                </Button>
              </div>

              {/* Activity Feed */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Activity Feed</h2>
                {activities.map((activity) => (
                  <ActivityFeedItem key={activity.id} activity={activity} />
                ))}
                
                {/* Load More */}
                <div className="text-center py-4">
                  <Button variant="outline" onClick={handleLoadMore}>
                    Load More Activities
                  </Button>
                </div>
              </div>

              {/* Mobile Friend Suggestions */}
              <div className="lg:hidden mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">People You May Know</h2>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {friendSuggestions.map((friend) => (
                    <div key={friend.id} className="flex-shrink-0 w-48">
                      <FriendSuggestionCard friend={friend} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-20 space-y-6">
                {/* Live Chat Preview */}
                <LiveChatPreview conversations={conversations} />

                {/* Upcoming Events */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/event-management')}>
                      <Icon name="Calendar" size={16} className="mr-1" />
                      View All
                    </Button>
                  </div>
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <UpcomingEventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default DashboardHome;