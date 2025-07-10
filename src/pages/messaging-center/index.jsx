import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ConversationList from './components/ConversationList';
import ChatArea from './components/ChatArea';
import NewMessageModal from './components/NewMessageModal';
import GroupChatSidebar from './components/GroupChatSidebar';

const MessagingCenter = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [isGroupSidebarOpen, setIsGroupSidebarOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [currentUser] = useState({
    id: 1,
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  });

  // Mock data initialization
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        lastMessage: 'Hey man, are you free for basketball tomorrow?',
        lastMessageSender: 'Alex Rodriguez',
        timestamp: new Date(Date.now() - 300000),
        unreadCount: 2,
        isOnline: true,
        isTyping: false,
        isPinned: true,
        isGroup: false,
        lastSeen: new Date(Date.now() - 60000)
      },
      {
        id: 2,
        name: 'Gaming Squad',
        avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop',
        lastMessage: 'Mike: Anyone up for some COD tonight?',
        lastMessageSender: 'Mike',
        timestamp: new Date(Date.now() - 900000),
        unreadCount: 5,
        isOnline: false,
        isTyping: false,
        isPinned: false,
        isGroup: true,
        adminId: 3,
        members: [
          { id: 1, name: 'You', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', isOnline: true },
          { id: 3, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', isOnline: true },
          { id: 4, name: 'Chris Wilson', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face', isOnline: false },
          { id: 5, name: 'David Brown', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face', isOnline: true }
        ],
        lastSeen: new Date(Date.now() - 1800000)
      },
      {
        id: 3,
        name: 'Jake Thompson',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
        lastMessage: 'You: Thanks for the workout tips!',
        lastMessageSender: 'You',
        timestamp: new Date(Date.now() - 3600000),
        unreadCount: 0,
        isOnline: false,
        isTyping: false,
        isPinned: false,
        isGroup: false,
        lastSeen: new Date(Date.now() - 7200000)
      },
      {
        id: 4,
        name: 'Study Group',
        avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
        lastMessage: 'Sarah: Meeting at 3 PM tomorrow',
        lastMessageSender: 'Sarah',
        timestamp: new Date(Date.now() - 7200000),
        unreadCount: 1,
        isOnline: false,
        isTyping: false,
        isPinned: false,
        isGroup: true,
        adminId: 6,
        members: [
          { id: 1, name: 'You', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', isOnline: true },
          { id: 6, name: 'Sarah Davis', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face', isOnline: false },
          { id: 7, name: 'Tom Wilson', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face', isOnline: true }
        ],
        lastSeen: new Date(Date.now() - 10800000)
      },
      {
        id: 5,
        name: 'Ryan Martinez',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face',
        lastMessage: 'Sounds good, see you there!',
        lastMessageSender: 'Ryan Martinez',
        timestamp: new Date(Date.now() - 86400000),
        unreadCount: 0,
        isOnline: true,
        isTyping: false,
        isPinned: false,
        isGroup: false,
        lastSeen: new Date(Date.now() - 300000)
      }
    ];

    const mockFriends = [
      { id: 8, name: 'Kevin Lee', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', isOnline: true },
      { id: 9, name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', isOnline: false },
      { id: 10, name: 'Tyler Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', isOnline: true },
      { id: 11, name: 'Brandon Davis', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face', isOnline: false }
    ];

    setConversations(mockConversations);
    setFriends(mockFriends);
  }, []);

  // Mock messages for active conversation
  useEffect(() => {
    if (activeConversation) {
      const mockMessages = [
        {
          id: 1,
          text: 'Hey! How are you doing?',
          sender: activeConversation.name,
          senderId: activeConversation.id,
          timestamp: new Date(Date.now() - 3600000),
          type: 'text',
          status: 'read'
        },
        {
          id: 2,
          text: 'I\'m doing great! Just finished my workout. How about you?',
          sender: currentUser.name,
          senderId: currentUser.id,
          timestamp: new Date(Date.now() - 3300000),
          type: 'text',
          status: 'read'
        },
        {
          id: 3,
          text: 'That\'s awesome! I\'ve been thinking about starting a new workout routine.',
          sender: activeConversation.name,
          senderId: activeConversation.id,
          timestamp: new Date(Date.now() - 3000000),
          type: 'text',
          status: 'read'
        },
        {
          id: 4,
          text: 'You should definitely do it! I can share some tips if you want.',
          sender: currentUser.name,
          senderId: currentUser.id,
          timestamp: new Date(Date.now() - 2700000),
          type: 'text',
          status: 'delivered'
        },
        {
          id: 5,
          text: activeConversation.lastMessage,
          sender: activeConversation.lastMessageSender === 'You' ? currentUser.name : activeConversation.name,
          senderId: activeConversation.lastMessageSender === 'You' ? currentUser.id : activeConversation.id,
          timestamp: activeConversation.timestamp,
          type: 'text',
          status: 'sent'
        }
      ];
      setMessages(mockMessages);
    }
  }, [activeConversation, currentUser]);

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleSendMessage = (message) => {
    setMessages(prev => [...prev, message]);
    
    // Update conversation's last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              lastMessage: message.text,
              lastMessageSender: 'You',
              timestamp: message.timestamp
            }
          : conv
      )
    );
  };

  const handleNewMessage = () => {
    setIsNewMessageModalOpen(true);
  };

  const handleStartConversation = (selectedFriends) => {
    if (selectedFriends.length === 1) {
      // Start individual conversation
      const friend = selectedFriends[0];
      const newConversation = {
        id: Date.now(),
        name: friend.name,
        avatar: friend.avatar,
        lastMessage: '',
        lastMessageSender: '',
        timestamp: new Date(),
        unreadCount: 0,
        isOnline: friend.isOnline,
        isTyping: false,
        isPinned: false,
        isGroup: false,
        lastSeen: new Date()
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversation(newConversation);
    } else {
      // Start group conversation
      const groupName = selectedFriends.map(f => f.name.split(' ')[0]).join(', ');
      const newGroupConversation = {
        id: Date.now(),
        name: groupName,
        avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
        lastMessage: '',
        lastMessageSender: '',
        timestamp: new Date(),
        unreadCount: 0,
        isOnline: false,
        isTyping: false,
        isPinned: false,
        isGroup: true,
        adminId: currentUser.id,
        members: [currentUser, ...selectedFriends],
        lastSeen: new Date()
      };
      
      setConversations(prev => [newGroupConversation, ...prev]);
      setActiveConversation(newGroupConversation);
    }
  };

  const handleAddMember = (memberId) => {
    // Mock add member functionality
    console.log('Adding member:', memberId);
  };

  const handleRemoveMember = (memberId) => {
    if (activeConversation?.isGroup) {
      const updatedMembers = activeConversation.members.filter(member => member.id !== memberId);
      const updatedConversation = {
        ...activeConversation,
        members: updatedMembers
      };
      
      setActiveConversation(updatedConversation);
      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversation.id ? updatedConversation : conv
        )
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Messaging Center - BroCode</title>
        <meta name="description" content="Connect with your brotherhood through real-time messaging. Send messages, share media, and stay connected with friends and groups." />
      </Helmet>

      <div className="min-h-screen bg-background pt-16 pb-16 lg:pb-0">
        <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex">
          {/* Conversation List */}
          <div className={`${
            activeConversation ? 'hidden lg:block' : 'block'
          } w-full lg:w-80 flex-shrink-0`}>
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversation?.id}
              onConversationSelect={handleConversationSelect}
              onNewMessage={handleNewMessage}
            />
          </div>

          {/* Chat Area */}
          <div className={`${
            activeConversation ? 'block' : 'hidden lg:block'
          } flex-1 flex`}>
            <ChatArea
              conversation={activeConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              currentUser={currentUser}
            />

            {/* Group Chat Sidebar */}
            {activeConversation?.isGroup && (
              <GroupChatSidebar
                conversation={activeConversation}
                isOpen={isGroupSidebarOpen}
                onClose={() => setIsGroupSidebarOpen(false)}
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
                currentUser={currentUser}
              />
            )}
          </div>
        </div>

        {/* New Message Modal */}
        <NewMessageModal
          isOpen={isNewMessageModalOpen}
          onClose={() => setIsNewMessageModalOpen(false)}
          onStartConversation={handleStartConversation}
          friends={friends}
        />
      </div>
    </>
  );
};

export default MessagingCenter;