import React, { useState } from 'react';
import { ArrowLeft, Plus, Users, Calendar, Code, Zap, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/navigation/Navbar';
import { useUser } from '@/contexts/UserContext';
import { Page } from '@/pages/Index';
import { toast } from 'sonner';

interface ProjectHubProps {
  showPage: (page: Page) => void;
}

const ProjectHub: React.FC<ProjectHubProps> = ({ showPage }) => {
  const { user, joinProject } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    skills: '',
    teamSize: '',
    timeline: ''
  });

  const projects = [
    {
      id: 'iot-parking',
      title: 'IoT Smart Parking System',
      description: 'Develop an intelligent parking management system using IoT sensors and mobile app',
      leader: 'Rahul Sharma',
      members: 4,
      maxMembers: 6,
      skills: ['IoT', 'React Native', 'Node.js', 'MongoDB'],
      progress: 65,
      timeline: '3 months',
      status: 'In Progress',
      college: 'GLA University'
    },
    {
      id: 'ai-resume',
      title: 'AI Resume Screener',
      description: 'ML-powered resume screening tool for HR departments with automated ranking',
      leader: 'Priya Singh',
      members: 3,
      maxMembers: 5,
      skills: ['Python', 'ML', 'React', 'Flask'],
      progress: 40,
      timeline: '4 months',
      status: 'In Progress',
      college: 'IIT Delhi'
    },
    {
      id: 'campus-event',
      title: 'Campus Event Management App',
      description: 'Complete event management solution for colleges with booking and payment integration',
      leader: 'Arjun Patel',
      members: 5,
      maxMembers: 8,
      skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      progress: 25,
      timeline: '5 months',
      status: 'Starting',
      college: 'BITS Pilani'
    },
    {
      id: 'blockchain-voting',
      title: 'Blockchain Voting System',
      description: 'Secure and transparent voting system using blockchain technology for student elections',
      leader: 'Sneha Reddy',
      members: 2,
      maxMembers: 4,
      skills: ['Solidity', 'Web3', 'React', 'Ethereum'],
      progress: 80,
      timeline: '2 months',
      status: 'Near Completion',
      college: 'VIT Vellore'
    },
    {
      id: 'mental-health',
      title: 'Student Mental Health Platform',
      description: 'Anonymous peer support and counseling platform for college students',
      leader: 'Maya Patel',
      members: 3,
      maxMembers: 6,
      skills: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      progress: 15,
      timeline: '6 months',
      status: 'Planning',
      college: 'Manipal University'
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (skillFilter === '' || project.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    ))
  );

  const handleJoinProject = (projectId: string) => {
    joinProject(projectId);
  };

  const handleCreateProject = () => {
    if (newProject.title && newProject.description) {
      console.log('Creating project:', newProject);
      toast.success('Project Created!', {
        description: 'Your project has been created successfully'
      });
      setShowCreateModal(false);
      setNewProject({ title: '', description: '', skills: '', teamSize: '', timeline: '' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-blue-500/10 text-blue-500';
      case 'Starting': return 'bg-green-500/10 text-green-500';
      case 'In Progress': return 'bg-orange-500/10 text-orange-500';
      case 'Near Completion': return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-muted-foreground/10 text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showPage={showPage} />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              onClick={() => showPage('landing')}
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-4">Project Collaboration Hub</h1>
                <p className="text-muted-foreground text-lg">
                  Join exciting projects or create your own to build your portfolio
                </p>
              </div>
              
              <Button
                onClick={() => setShowCreateModal(true)}
                className="btn-hero mt-4 md:mt-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="relative">
                <Code className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by skills..."
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="glass-card glow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Led by {project.leader} • {project.college}
                      </p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  {/* Team Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{project.members}/{project.maxMembers} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.timeline}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium mb-2">Skills Required:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button
                    onClick={() => handleJoinProject(project.id)}
                    className="w-full btn-hero"
                    disabled={project.members >= project.maxMembers}
                  >
                    {user?.projects.includes(project.id) ? 'Already Joined' : 
                     project.members >= project.maxMembers ? 'Team Full' : 'Join Project'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or create a new project
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glass-card w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New Project</CardTitle>
                <Button
                  onClick={() => setShowCreateModal(false)}
                  variant="ghost"
                  size="sm"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Project Title</label>
                <Input
                  placeholder="Enter project title..."
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  placeholder="Describe your project..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Skills Required</label>
                <Input
                  placeholder="React, Node.js, MongoDB..."
                  value={newProject.skills}
                  onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Team Size</label>
                  <Input
                    placeholder="4-6"
                    value={newProject.teamSize}
                    onChange={(e) => setNewProject({ ...newProject, teamSize: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Timeline</label>
                  <Input
                    placeholder="3 months"
                    value={newProject.timeline}
                    onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value })}
                  />
                </div>
              </div>
              
              <Button
                onClick={handleCreateProject}
                className="w-full btn-hero"
              >
                <Zap className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProjectHub;