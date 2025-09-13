import React, { useState } from 'react';
import { Search, Filter, MapPin, Users, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/navigation/Navbar';
import { Page } from '@/pages/Index';

interface CollegeDiscoveryProps {
  showPage: (page: Page, data?: any) => void;
}

const colleges = [
  {
    id: 'gla',
    name: 'GLA University',
    location: 'Mathura, UP',
    students: '12,000+',
    stream: 'Engineering, Management',
    image: '🏛️',
    description: 'Premier technical university with strong industry connections',
    established: '2010',
    rating: 4.2,
    members: 2400
  },
  {
    id: 'iit-delhi',
    name: 'IIT Delhi',
    location: 'New Delhi',
    students: '8,000+',
    stream: 'Engineering, Science',
    image: '🏛️',
    description: 'India\'s premier technical institute',
    established: '1961',
    rating: 4.8,
    members: 3200
  },
  {
    id: 'du',
    name: 'Delhi University',
    location: 'New Delhi',
    students: '300,000+',
    stream: 'Arts, Science, Commerce',
    image: '🎓',
    description: 'One of India\'s largest and most prestigious universities',
    established: '1922',
    rating: 4.3,
    members: 15600
  },
  {
    id: 'bits',
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    students: '15,000+',
    stream: 'Engineering, Science',
    image: '🏛️',
    description: 'Leading private technical institute',
    established: '1964',
    rating: 4.6,
    members: 4800
  },
  {
    id: 'vit',
    name: 'VIT Vellore',
    location: 'Vellore, TN',
    students: '20,000+',
    stream: 'Engineering, Management',
    image: '🎓',
    description: 'Top private university with global outlook',
    established: '1984',
    rating: 4.4,
    members: 7200
  },
  {
    id: 'manipal',
    name: 'Manipal University',
    location: 'Manipal, Karnataka',
    students: '28,000+',
    stream: 'Engineering, Medicine, Management',
    image: '🏥',
    description: 'Comprehensive university with medical and engineering excellence',
    established: '1993',
    rating: 4.3,
    members: 8900
  },
  {
    id: 'srm',
    name: 'SRM University',
    location: 'Chennai, TN',
    students: '45,000+',
    stream: 'Engineering, Medicine, Management',
    image: '🎓',
    description: 'Large private university with diverse programs',
    established: '1985',
    rating: 4.1,
    members: 12400
  },
  {
    id: 'amity',
    name: 'Amity University',
    location: 'Noida, UP',
    students: '35,000+',
    stream: 'Engineering, Management, Law',
    image: '🏛️',
    description: 'Multi-disciplinary private university',
    established: '2005',
    rating: 3.9,
    members: 9800
  }
];

const CollegeDiscovery: React.FC<CollegeDiscoveryProps> = ({ showPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [streamFilter, setStreamFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredColleges = colleges
    .filter(college => 
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      college.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
      college.stream.toLowerCase().includes(streamFilter.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'members':
          return b.members - a.members;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleCollegeClick = (collegeId: string) => {
    showPage('college-detail', { collegeId });
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
            
            <h1 className="text-4xl font-bold gradient-text mb-4">Discover Communities</h1>
            <p className="text-muted-foreground text-lg">
              Join college communities and connect with peers from across India
            </p>
          </div>

          {/* Filters */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <select
                value={streamFilter}
                onChange={(e) => setStreamFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="">All Streams</option>
                <option value="engineering">Engineering</option>
                <option value="management">Management</option>
                <option value="medicine">Medicine</option>
                <option value="arts">Arts</option>
                <option value="science">Science</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="members">Sort by Members</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredColleges.length} of {colleges.length} colleges
            </p>
          </div>

          {/* Colleges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredColleges.map((college) => (
              <Card 
                key={college.id}
                className="glass-card glow-card cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => handleCollegeClick(college.id)}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{college.image}</div>
                    <h3 className="text-xl font-bold">{college.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center justify-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {college.location}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Students:</span>
                      <span className="font-medium">{college.students}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members:</span>
                      <span className="font-medium">{college.members.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="font-medium">⭐ {college.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      {college.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {college.stream.split(', ').map((stream, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {stream}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full btn-hero">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Explore Community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredColleges.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeDiscovery;