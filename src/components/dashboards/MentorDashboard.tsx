import React, { useState } from 'react';
import { Users, Calendar, DollarSign, BookOpen, Clock, Star, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import Navbar from '@/components/navigation/Navbar';
import { Page } from '@/pages/Index';

interface MentorDashboardProps {
  showPage: (page: Page) => void;
}

const MentorDashboard: React.FC<MentorDashboardProps> = ({ showPage }) => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, label: 'Active Students', value: '24', trend: '+3 this week', color: 'text-blue-500' },
    { icon: Calendar, label: 'Sessions This Month', value: '18', trend: '+2 from last month', color: 'text-green-500' },
    { icon: DollarSign, label: 'Earnings', value: '₹45,000', trend: '+12% from last month', color: 'text-purple-500' },
    { icon: Star, label: 'Rating', value: '4.9', trend: 'Based on 156 reviews', color: 'text-orange-500' }
  ];

  const studentRequests = [
    {
      name: 'Rahul Sharma',
      college: 'IIT Delhi',
      subject: 'Career Guidance in AI/ML',
      time: '2 hours ago',
      avatar: '👨‍💻'
    },
    {
      name: 'Priya Singh',
      college: 'VIT Vellore',
      subject: 'Resume Review Request',
      time: '4 hours ago',
      avatar: '👩‍💼'
    },
    {
      name: 'Arjun Patel',
      college: 'BITS Pilani',
      subject: 'Mock Interview Session',
      time: '6 hours ago',
      avatar: '👨‍🎓'
    },
    {
      name: 'Sneha Reddy',
      college: 'GLA University',
      subject: 'Project Guidance - React App',
      time: '1 day ago',
      avatar: '👩‍💻'
    },
    {
      name: 'Karthik Kumar',
      college: 'Manipal University',
      subject: 'Internship Preparation',
      time: '1 day ago',
      avatar: '👨‍💼'
    }
  ];

  const myStudents = [
    { name: 'Alex Kumar', progress: 85, nextSession: 'Tomorrow 3:00 PM', avatar: '👨‍🎓' },
    { name: 'Maya Patel', progress: 72, nextSession: 'Friday 2:00 PM', avatar: '👩‍💻' },
    { name: 'Rohan Singh', progress: 91, nextSession: 'Monday 4:00 PM', avatar: '👨‍💻' },
    { name: 'Kavya Nair', progress: 68, nextSession: 'Tuesday 1:00 PM', avatar: '👩‍🎓' }
  ];

  const upcomingSessions = [
    { time: '3:00 PM', student: 'Alex Kumar', topic: 'React Advanced Concepts', duration: '1 hour' },
    { time: '5:00 PM', student: 'Maya Patel', topic: 'Career Planning Discussion', duration: '45 mins' },
    { time: '7:00 PM', student: 'Rohan Singh', topic: 'Code Review Session', duration: '1 hour' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar showPage={showPage} />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="glass-card rounded-2xl p-8 bg-gradient-primary text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{user?.avatar}</div>
                  <div>
                    <h1 className="text-3xl font-bold">Good morning, {user?.name}! 🌟</h1>
                    <p className="text-white/90 mt-2">Ready to inspire and guide today?</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/90">Today's Sessions</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm font-medium">{stat.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-4 border-b border-border">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'requests', label: 'Student Requests' },
                { id: 'students', label: 'My Students' },
                { id: 'schedule', label: 'Schedule' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'requests' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Student Requests</span>
                  <Badge variant="secondary">{studentRequests.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studentRequests.map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{request.avatar}</div>
                      <div>
                        <h3 className="font-semibold">{request.name}</h3>
                        <p className="text-sm text-muted-foreground">{request.college}</p>
                        <p className="text-sm">{request.subject}</p>
                        <p className="text-xs text-muted-foreground">{request.time}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="btn-hero">Accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'students' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>My Students</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/20">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{student.avatar}</div>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">Progress: {student.progress}%</p>
                        <div className="w-32 h-2 bg-muted rounded-full mt-1">
                          <div 
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Next Session</p>
                      <p className="text-xs text-muted-foreground">{student.nextSession}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'students' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>My Students</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/20">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{student.avatar}</div>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">Progress: {student.progress}%</p>
                        <div className="w-32 h-2 bg-muted rounded-full mt-1">
                          <div 
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Next Session</p>
                      <p className="text-xs text-muted-foreground">{student.nextSession}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Today's Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div>
                        <p className="font-medium">{session.time}</p>
                        <p className="text-sm text-muted-foreground">{session.student}</p>
                        <p className="text-xs text-muted-foreground">{session.topic}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{session.duration}</Badge>
                        <Button size="sm" className="ml-2 btn-hero">Join</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Session Completion Rate</span>
                      <span className="font-bold text-green-500">96%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Student Satisfaction</span>
                      <span className="font-bold text-blue-500">4.9/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Response Time</span>
                      <span className="font-bold text-purple-500">&lt; 2 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Growth</span>
                      <span className="font-bold text-orange-500">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex space-x-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm">Completed session with Alex Kumar</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm">New student request from Priya Singh</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm">Received 5-star rating from Maya Patel</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full btn-hero justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule New Session
                  </Button>
                  <Button className="w-full btn-outline justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    View All Students
                  </Button>
                  <Button className="w-full btn-outline justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;