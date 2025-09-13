import React from 'react';
import { BookOpen, Users, MessageCircle, Calendar, Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import Navbar from '@/components/navigation/Navbar';
import { Page } from '@/pages/Index';

interface FresherDashboardProps {
  showPage: (page: Page) => void;
}

const FresherDashboard: React.FC<FresherDashboardProps> = ({ showPage }) => {
  const { user } = useUser();

  const quickStats = [
    { icon: MessageCircle, label: 'Messages', value: '12', color: 'text-blue-500' },
    { icon: Users, label: 'Connections', value: '34', color: 'text-green-500' },
    { icon: Trophy, label: 'Projects', value: '3', color: 'text-purple-500' },
    { icon: BookOpen, label: 'Communities', value: '2', color: 'text-orange-500' }
  ];

  const quickActions = [
    {
      title: 'Discover Communities',
      description: 'Join college communities and connect with peers',
      icon: Users,
      action: () => showPage('colleges'),
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      title: 'Find Mentors',
      description: 'Connect with experienced professionals',
      icon: Calendar,
      action: () => showPage('mentors'),
      color: 'bg-green-500/10 text-green-500'
    },
    {
      title: 'Join Projects',
      description: 'Collaborate on exciting projects',
      icon: BookOpen,
      action: () => showPage('projects'),
      color: 'bg-purple-500/10 text-purple-500'
    }
  ];

  const recentActivity = [
    { type: 'message', text: 'New message from mentor Dr. Sarah Wilson', time: '2 hours ago' },
    { type: 'project', text: 'You joined the AI Resume Screener project', time: '1 day ago' },
    { type: 'community', text: 'New post in GLA University community', time: '2 days ago' },
    { type: 'achievement', text: 'You completed the React basics course', time: '3 days ago' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar showPage={showPage} />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="glass-card rounded-2xl p-8 bg-gradient-primary text-white">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{user?.avatar}</div>
                <div>
                  <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>
                  <p className="text-white/90 mt-2">Ready to learn and grow today?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => (
                    <div 
                      key={index}
                      onClick={action.action}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${action.color}`}>
                          <action.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex space-x-3 p-3 rounded-lg bg-muted/20">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="glass-card mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Upcoming</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="font-medium text-sm">Mentorship Session</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 3:00 PM</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="font-medium text-sm">Hackathon Deadline</p>
                    <p className="text-xs text-muted-foreground">In 3 days</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FresherDashboard;