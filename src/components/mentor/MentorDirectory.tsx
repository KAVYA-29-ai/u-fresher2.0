import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, DollarSign, ArrowLeft, Video, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/navigation/Navbar';
import { Page } from '@/pages/Index';

interface MentorDirectoryProps {
  showPage: (page: Page, data?: any) => void;
}

const mentors = [
  {
    id: 'sarah-wilson',
    name: 'Dr. Sarah Wilson',
    avatar: '👩‍🏫',
    title: 'Senior AI Engineer at Google',
    college: 'IIT Delhi',
    experience: '8 years',
    rating: 4.9,
    reviews: 156,
    price: '₹2,500/hour',
    availability: 'Available',
    skills: ['AI/ML', 'Python', 'TensorFlow', 'Data Science'],
    bio: 'Former Google Research scientist with expertise in machine learning and AI. Passionate about mentoring the next generation of AI engineers.',
    sessions: 340,
    students: 89
  },
  {
    id: 'rajesh-kumar',
    name: 'Rajesh Kumar',
    avatar: '👨‍💻',
    title: 'Full Stack Architect at Microsoft',
    college: 'BITS Pilani',
    experience: '12 years',
    rating: 4.8,
    reviews: 203,
    price: '₹3,000/hour',
    availability: 'Busy',
    skills: ['React', 'Node.js', 'Azure', 'System Design'],
    bio: 'Senior full-stack developer with extensive experience in building scalable web applications. Love helping students transition to industry.',
    sessions: 520,
    students: 142
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    avatar: '👩‍💼',
    title: 'Data Scientist at Netflix',
    college: 'GLA University',
    experience: '6 years',
    rating: 4.7,
    reviews: 98,
    price: '₹2,000/hour',
    availability: 'Available',
    skills: ['Data Science', 'Python', 'SQL', 'Statistics'],
    bio: 'Data scientist passionate about extracting insights from data. Specialize in recommendation systems and user behavior analysis.',
    sessions: 180,
    students: 67
  },
  {
    id: 'arjun-patel',
    name: 'Arjun Patel',
    avatar: '👨‍🎨',
    title: 'Lead UX Designer at Figma',
    college: 'VIT Vellore',
    experience: '7 years',
    rating: 4.9,
    reviews: 124,
    price: '₹2,200/hour',
    availability: 'Available',
    skills: ['UI/UX', 'Figma', 'Design Systems', 'User Research'],
    bio: 'Design leader focused on creating delightful user experiences. Help students build strong design portfolios and land dream jobs.',
    sessions: 290,
    students: 78
  },
  {
    id: 'sneha-reddy',
    name: 'Sneha Reddy',
    avatar: '👩‍💻',
    title: 'Blockchain Developer at Ethereum Foundation',
    college: 'Manipal University',
    experience: '5 years',
    rating: 4.6,
    reviews: 76,
    price: '₹2,800/hour',
    availability: 'Limited',
    skills: ['Blockchain', 'Solidity', 'Web3', 'Smart Contracts'],
    bio: 'Blockchain expert working on the future of decentralized applications. Passionate about teaching Web3 development to newcomers.',
    sessions: 150,
    students: 45
  },
  {
    id: 'karthik-nair',
    name: 'Karthik Nair',
    avatar: '👨‍🔧',
    title: 'DevOps Engineer at AWS',
    college: 'SRM University',
    experience: '9 years',
    rating: 4.8,
    reviews: 145,
    price: '₹2,600/hour',
    availability: 'Available',
    skills: ['DevOps', 'AWS', 'Kubernetes', 'CI/CD'],
    bio: 'Cloud infrastructure expert helping companies scale their applications. Love teaching students modern DevOps practices.',
    sessions: 380,
    students: 98
  },
  {
    id: 'maya-singh',
    name: 'Maya Singh',
    avatar: '👩‍💼',
    title: 'Product Manager at Stripe',
    college: 'Amity University',
    experience: '10 years',
    rating: 4.9,
    reviews: 187,
    price: '₹3,500/hour',
    availability: 'Weekends Only',
    skills: ['Product Management', 'Strategy', 'Analytics', 'Leadership'],
    bio: 'Product leader with experience in fintech and payments. Help students transition from technical roles to product management.',
    sessions: 450,
    students: 123
  },
  {
    id: 'rohit-gupta',
    name: 'Rohit Gupta',
    avatar: '👨‍💻',
    title: 'Mobile App Developer at Uber',
    college: 'DU',
    experience: '6 years',
    rating: 4.7,
    reviews: 112,
    price: '₹2,100/hour',
    availability: 'Available',
    skills: ['React Native', 'iOS', 'Android', 'Flutter'],
    bio: 'Mobile development expert with apps used by millions. Passionate about teaching cross-platform development and app optimization.',
    sessions: 220,
    students: 89
  }
];

const MentorDirectory: React.FC<MentorDirectoryProps> = ({ showPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredMentors = mentors
    .filter(mentor => {
      return (
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (skillFilter === '' || mentor.skills.some(skill => 
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )) &&
        mentor.college.toLowerCase().includes(collegeFilter.toLowerCase()) &&
        (experienceFilter === '' || 
          (experienceFilter === '5+' && parseInt(mentor.experience) >= 5) ||
          (experienceFilter === '10+' && parseInt(mentor.experience) >= 10)
        ) &&
        (availabilityFilter === '' || mentor.availability === availabilityFilter) &&
        (ratingFilter === '' || mentor.rating >= parseFloat(ratingFilter))
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'price':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleMentorClick = (mentorId: string) => {
    showPage('mentor-profile', { mentorId });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-500/10 text-green-500';
      case 'Busy': return 'bg-red-500/10 text-red-500';
      case 'Limited': return 'bg-orange-500/10 text-orange-500';
      case 'Weekends Only': return 'bg-blue-500/10 text-blue-500';
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
            
            <h1 className="text-4xl font-bold gradient-text mb-4">Find Your Perfect Mentor</h1>
            <p className="text-muted-foreground text-lg">
              Connect with industry experts and accelerate your career growth
            </p>
          </div>

          {/* Advanced Filters */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Row 1 */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Input
                placeholder="Filter by skills..."
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              />
              
              <Input
                placeholder="Filter by college..."
                value={collegeFilter}
                onChange={(e) => setCollegeFilter(e.target.value)}
              />
              
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="">All Experience</option>
                <option value="5+">5+ Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {/* Row 2 */}
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="">All Availability</option>
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Limited">Limited</option>
                <option value="Weekends Only">Weekends Only</option>
              </select>
              
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="price">Sort by Price</option>
              </select>
              
              <div className="text-sm text-muted-foreground flex items-center">
                {filteredMentors.length} of {mentors.length} mentors
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="glass-card glow-card cursor-pointer hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{mentor.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{mentor.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {mentor.college}
                        </p>
                      </div>
                    </div>
                    <Badge className={getAvailabilityColor(mentor.availability)}>
                      {mentor.availability}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                        <span className="text-sm font-bold">{mentor.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{mentor.reviews} reviews</p>
                    </div>
                    <div>
                      <div className="text-sm font-bold">{mentor.sessions}</div>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                    </div>
                    <div>
                      <div className="text-sm font-bold">{mentor.students}</div>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium mb-2">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {mentor.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{mentor.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Price and Experience */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{mentor.experience} exp</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-bold">{mentor.price}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      onClick={() => handleMentorClick(mentor.id)}
                      className="flex-1 btn-hero"
                    >
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredMentors.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
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

export default MentorDirectory;