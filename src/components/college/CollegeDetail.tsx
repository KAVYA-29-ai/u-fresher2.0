import React, { useState } from 'react';
import { ArrowLeft, Users, MessageCircle, Calendar, Trophy, Plus, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/navigation/Navbar';
import { useUser } from '@/contexts/UserContext';
import { Page } from '@/pages/Index';
import { toast } from 'sonner';

interface CollegeDetailProps {
  collegeId: string;
  showPage: (page: Page) => void;
}

const CollegeDetail: React.FC<CollegeDetailProps> = ({ collegeId, showPage }) => {
  const { user, joinCommunity } = useUser();
  const [activeTab, setActiveTab] = useState('posts');
  const [newPost, setNewPost] = useState('');
  const [activeRoom, setActiveRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [newCollab, setNewCollab] = useState({
    title: '',
    skills: '',
    teamSize: '',
    description: ''
  });
  const [showCreateCollab, setShowCreateCollab] = useState(false);

  // College data (would come from props/context in real app)
  const collegeData = {
    'gla': {
      name: 'GLA University',
      location: 'Mathura, UP',
      description: 'Premier technical university with strong industry connections and excellent placement record.',
      stats: { students: '12,000+', faculty: '800+', programs: '50+', ranking: '#15' },
      image: '🏛️'
    },
    'iit-delhi': {
      name: 'IIT Delhi', 
      location: 'New Delhi',
      description: 'India\'s premier technical institute known for excellence in engineering and research.',
      stats: { students: '8,000+', faculty: '600+', programs: '30+', ranking: '#1' },
      image: '🏛️'
    }
  };

  const college = collegeData[collegeId as keyof typeof collegeData] || collegeData['gla'];

  const posts = [
    {
      id: 1,
      author: 'Admin',
      avatar: '👨‍💼',
      content: 'Welcome to GLA University community! This is your space to connect, collaborate and grow together. 🎓',
      time: '2 days ago',
      likes: 45,
      comments: 12,
      type: 'welcome'
    },
    {
      id: 2,
      author: 'Placement Cell',
      avatar: '💼',
      content: 'EXCITING NEWS! 🚀 Google is visiting our campus next month for internship recruitment. Eligibility: CS/IT students with CGPA > 8.0. Start preparing now!',
      time: '1 day ago',
      likes: 128,
      comments: 34,
      type: 'placement'
    },
    {
      id: 3,
      author: 'Tech Club',
      avatar: '💻',
      content: 'Hackathon Alert! 💡 "Code for Change" - 48-hour hackathon starting this Friday. Amazing prizes and internship opportunities. Register now!',
      time: '12 hours ago',
      likes: 67,
      comments: 23,
      type: 'event'
    },
    {
      id: 4,
      author: 'Student Council',
      avatar: '🎭',
      content: 'Annual Cultural Fest "Crescendo 2025" is here! 🎪 3 days of music, dance, drama and fun. Get your passes now. Celebrity guests announced soon!',
      time: '8 hours ago',
      likes: 89,
      comments: 18,
      type: 'event'
    },
    {
      id: 5,
      author: 'Library',
      avatar: '📚',
      content: 'New books added to our collection! 📖 Latest titles on AI, ML, Blockchain, and Cybersecurity. Check them out on the ground floor.',
      time: '6 hours ago',
      likes: 23,
      comments: 5,
      type: 'announcement'
    },
    {
      id: 6,
      author: 'Career Services',
      avatar: '🎯',
      content: 'Resume writing workshop this Saturday! ✍️ Learn from industry experts how to craft winning resumes. Limited seats available.',
      time: '4 hours ago',
      likes: 41,
      comments: 9,
      type: 'workshop'
    }
  ];

  const clubs = [
    { name: 'Coding Club', members: 450, icon: '💻' },
    { name: 'Design Society', members: 280, icon: '🎨' },
    { name: 'Robotics Club', members: 320, icon: '🤖' },
    { name: 'Photography Club', members: 190, icon: '📸' },
    { name: 'Music Society', members: 220, icon: '🎵' }
  ];

  const chatRooms = [
    { id: 'general', name: 'General', members: 1240 },
    { id: 'placement', name: 'Placement', members: 890 },
    { id: 'projects', name: 'Projects', members: 670 },
    { id: 'study', name: 'Study Group', members: 580 },
    { id: 'events', name: 'Events', members: 720 },
    { id: 'hackathon', name: 'Hackathon', members: 340 },
    { id: 'coding-club', name: 'Coding Club', members: 450 },
    { id: 'design-club', name: 'Design Club', members: 280 },
    { id: 'alumni-talks', name: 'Alumni Talks', members: 920 }
  ];

  const roomMessages = {
    general: [
      { user: 'Alex Kumar', avatar: '👨‍🎓', message: 'Anyone interested in forming a study group for Data Structures?', time: '2 min ago' },
      { user: 'Priya Singh', avatar: '👩‍💻', message: 'Count me in! I need help with trees and graphs', time: '1 min ago' },
      { user: 'Rahul Sharma', avatar: '👨‍💻', message: 'Same here! Let\'s create a WhatsApp group', time: '30 sec ago' }
    ],
    placement: [
      { user: 'Maya Patel', avatar: '👩‍💼', message: 'Has anyone heard back from Microsoft interviews?', time: '5 min ago' },
      { user: 'Arjun Patel', avatar: '👨‍💼', message: 'I got the call yesterday! Second round next week', time: '3 min ago' },
      { user: 'Sneha Reddy', avatar: '👩‍💻', message: 'Congratulations! Any tips for the technical round?', time: '1 min ago' }
    ]
  };

  const collaborations = [
    {
      id: 'iot-parking',
      title: 'IoT Smart Parking System',
      description: 'Building an intelligent parking solution for campus using IoT sensors',
      leader: 'Rahul Sharma',
      members: 4,
      skills: ['IoT', 'React', 'Node.js'],
      progress: 65
    },
    {
      id: 'ai-resume',
      title: 'AI Resume Screener',
      description: 'ML-powered tool to help students optimize their resumes',
      leader: 'Priya Singh', 
      members: 3,
      skills: ['Python', 'ML', 'React'],
      progress: 40
    },
    {
      id: 'campus-app',
      title: 'Campus Event Management',
      description: 'Mobile app for managing all campus events and notifications',
      leader: 'Alex Kumar',
      members: 5,
      skills: ['React Native', 'Firebase'],
      progress: 25
    },
    {
      id: 'blockchain-vote',
      title: 'Blockchain Voting System',
      description: 'Secure voting system for student elections using blockchain',
      leader: 'Maya Patel',
      members: 3,
      skills: ['Solidity', 'Web3', 'React'],
      progress: 80
    }
  ];

  const currentRoomMessages = roomMessages[activeRoom as keyof typeof roomMessages] || [];

  const handleJoinCommunity = () => {
    joinCommunity(collegeId);
  };

  const handleCreateCollab = () => {
    if (newCollab.title && newCollab.description) {
      toast.success('Collaboration Created!', {
        description: 'Your project collaboration has been created'
      });
      setShowCreateCollab(false);
      setNewCollab({ title: '', skills: '', teamSize: '', description: '' });
    }
  };

  const tabs = [
    { id: 'posts', label: 'Community Posts', icon: MessageCircle },
    { id: 'clubs', label: 'Clubs & Societies', icon: Users },
    { id: 'collab', label: 'Collaborations', icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar showPage={showPage} />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              onClick={() => showPage('colleges')}
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Communities
            </Button>
            
            {/* College Info */}
            <div className="glass-card rounded-3xl p-8 bg-gradient-primary text-white mb-8">
              <div className="flex items-center space-x-6">
                <div className="text-6xl">{college.image}</div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{college.name}</h1>
                  <p className="text-white/90 mb-4">{college.location}</p>
                  <p className="text-white/80 mb-4">{college.description}</p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {Object.entries(college.stats).map(([key, value], index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold">{value}</div>
                        <div className="text-sm text-white/80 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  {!user?.joinedCommunities.includes(collegeId) ? (
                    <Button
                      onClick={handleJoinCommunity}
                      className="bg-white text-primary hover:bg-white/90"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Join Community
                    </Button>
                  ) : (
                    <Badge className="bg-white/20 text-white">
                      ✓ Member
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 p-1 bg-muted rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {/* New Post */}
              {user?.joinedCommunities.includes(collegeId) && (
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1">
                        <Input
                          placeholder="Share something with the community..."
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="mb-3"
                        />
                        <Button size="sm" className="btn-hero">Post</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Posts Feed */}
              {posts.map((post) => (
                <Card key={post.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{post.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold">{post.author}</span>
                          <span className="text-sm text-muted-foreground">{post.time}</span>
                        </div>
                        
                        <p className="mb-4">{post.content}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <button className="flex items-center space-x-1 hover:text-primary">
                            <span>👍</span>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-primary">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'clubs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((club, index) => (
                <Card key={index} className="glass-card glow-card cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{club.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                    <p className="text-muted-foreground mb-4">{club.members} members</p>
                    <Button className="w-full btn-hero">Join Club</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'collab' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Active Collaborations</h3>
                <Button
                  onClick={() => setShowCreateCollab(true)}
                  className="btn-hero"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Collaboration
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {collaborations.map((collab) => (
                  <Card key={collab.id} className="glass-card">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-2">{collab.title}</h4>
                      <p className="text-muted-foreground mb-4">{collab.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm">Led by {collab.leader}</span>
                        <span className="text-sm">{collab.members} members</span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{collab.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${collab.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {collab.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button className="w-full btn-hero">Join Collaboration</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Collaboration Modal */}
      {showCreateCollab && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glass-card w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New Collaboration</CardTitle>
                <Button
                  onClick={() => setShowCreateCollab(false)}
                  variant="ghost"
                  size="sm"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Input
                placeholder="Project title..."
                value={newCollab.title}
                onChange={(e) => setNewCollab({ ...newCollab, title: e.target.value })}
              />
              <Input
                placeholder="Description..."
                value={newCollab.description}
                onChange={(e) => setNewCollab({ ...newCollab, description: e.target.value })}
              />
              <Input
                placeholder="Skills required (React, Node.js, etc.)"
                value={newCollab.skills}
                onChange={(e) => setNewCollab({ ...newCollab, skills: e.target.value })}
              />
              <Input
                placeholder="Team size (4-6 members)"
                value={newCollab.teamSize}
                onChange={(e) => setNewCollab({ ...newCollab, teamSize: e.target.value })}
              />
              
              <Button
                onClick={handleCreateCollab}
                className="w-full btn-hero"
              >
                Create Collaboration
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CollegeDetail;