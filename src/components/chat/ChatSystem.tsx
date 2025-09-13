import React, { useState } from 'react';
import { MessageCircle, X, Send, Paperclip, Video, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChatSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatRooms = [
    { id: 'general', name: 'General', type: 'community', unread: 3 },
    { id: 'placement', name: 'Placement', type: 'community', unread: 1 },
    { id: 'projects', name: 'Projects', type: 'community', unread: 0 },
    { id: 'study', name: 'Study Group', type: 'community', unread: 5 },
    { id: 'events', name: 'Events', type: 'community', unread: 2 },
    { id: 'hackathon', name: 'Hackathon', type: 'community', unread: 0 },
    { id: 'coding-club', name: 'Coding Club', type: 'community', unread: 1 },
    { id: 'design-club', name: 'Design Club', type: 'community', unread: 0 },
    { id: 'alumni-talks', name: 'Alumni Talks', type: 'community', unread: 4 },
    { id: 'mentor-sarah', name: 'Dr. Sarah Wilson', type: 'mentor', unread: 1 },
    { id: 'student-alex', name: 'Alex Kumar', type: 'student', unread: 0 }
  ];

  const messages = {
    general: [
      { id: 1, user: 'Rahul Sharma', avatar: '👨‍💻', message: 'Hey everyone! Anyone working on React projects?', time: '10:30 AM', isOwn: false },
      { id: 2, user: 'Priya Singh', avatar: '👩‍💼', message: 'Yes! I\'m building an e-commerce app. Would love to collaborate!', time: '10:32 AM', isOwn: false },
      { id: 3, user: 'You', avatar: '👨‍🎓', message: 'Count me in! I have experience with Node.js backend', time: '10:35 AM', isOwn: true },
      { id: 4, user: 'Arjun Patel', avatar: '👨‍🎓', message: 'This is awesome! Let\'s create a group for this project', time: '10:38 AM', isOwn: false },
      { id: 5, user: 'Sneha Reddy', avatar: '👩‍💻', message: 'I can help with UI/UX design if needed', time: '10:40 AM', isOwn: false },
    ],
    placement: [
      { id: 1, user: 'Career Cell', avatar: '💼', message: 'Amazon is visiting campus next week. Prepare your resumes!', time: '9:00 AM', isOwn: false },
      { id: 2, user: 'Maya Patel', avatar: '👩‍💻', message: 'What are the eligibility criteria?', time: '9:15 AM', isOwn: false },
      { id: 3, user: 'Career Cell', avatar: '💼', message: 'CS/IT students with CGPA > 7.0. Check your emails for details', time: '9:20 AM', isOwn: false },
    ]
  };

  const currentMessages = messages[activeRoom as keyof typeof messages] || messages.general;
  const totalUnread = chatRooms.reduce((sum, room) => sum + room.unread, 0);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full btn-hero shadow-glow relative"
        >
          <MessageCircle className="w-6 h-6" />
          {totalUnread > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white text-xs flex items-center justify-center">
              {totalUnread > 9 ? '9+' : totalUnread}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 z-50">
      <Card className="glass-card h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Chats</CardTitle>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Room Tabs */}
          <div className="flex space-x-1 mt-2 overflow-x-auto">
            {chatRooms.slice(0, 4).map((room) => (
              <Button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                variant={activeRoom === room.id ? "default" : "ghost"}
                size="sm"
                className="flex-shrink-0 text-xs relative"
              >
                {room.name}
                {room.unread > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-white text-xs flex items-center justify-center">
                    {room.unread}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                  {!msg.isOwn && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm">{msg.avatar}</span>
                      <span className="text-xs font-medium">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                  )}
                  <div
                    className={`p-2 rounded-lg text-sm ${
                      msg.isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.message}
                  </div>
                  {msg.isOwn && (
                    <div className="text-xs text-muted-foreground text-right mt-1">
                      {msg.time}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
              />
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Video className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="w-8 h-8 p-0 btn-hero"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSystem;