import React, { useState } from 'react';
import { ArrowLeft, Star, Calendar, MessageCircle, Video, Clock, MapPin, Users, Award, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/navigation/Navbar';
import { Page } from '@/pages/Index';
import { toast } from 'sonner';

interface MentorProfileProps {
  mentorId: string;
  showPage: (page: Page) => void;
}

const MentorProfile: React.FC<MentorProfileProps> = ({ mentorId, showPage }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Mock mentor data (would come from props/context in real app)
  const mentorData = {
    'sarah-wilson': {
      name: 'Dr. Sarah Wilson',
      avatar: '👩‍🏫',
      title: 'Senior AI Engineer at Google',
      company: 'Google',
      college: 'IIT Delhi',
      experience: '8 years',
      rating: 4.9,
      reviews: 156,
      price: 2500,
      availability: 'Available',
      skills: ['AI/ML', 'Python', 'TensorFlow', 'Data Science', 'Deep Learning', 'Computer Vision'],
      bio: 'Former Google Research scientist with expertise in machine learning and AI. Passionate about mentoring the next generation of AI engineers. I have published 15+ research papers and hold 3 patents in machine learning.',
      sessions: 340,
      students: 89,
      responseTime: '< 2 hours',
      languages: ['English', 'Hindi'],
      timezone: 'IST (GMT +5:30)',
      education: ['PhD in Computer Science - Stanford University', 'MS in AI - Carnegie Mellon'],
      achievements: ['Google AI Excellence Award 2023', 'Top 1% Mentor on U Fresher', 'Published researcher with 1000+ citations'],
      specializations: ['Machine Learning Interview Prep', 'Research Paper Writing', 'Career Transition to AI', 'System Design for ML'],
    }
  };

  const mentor = mentorData[mentorId as keyof typeof mentorData] || mentorData['sarah-wilson'];

  const reviews = [
    {
      id: 1,
      student: 'Alex Kumar',
      avatar: '👨‍🎓',
      rating: 5,
      comment: 'Dr. Wilson helped me land my dream job at Microsoft! Her ML interview prep sessions were incredibly valuable. Highly recommend!',
      date: '2 weeks ago',
      course: 'ML Interview Preparation'
    },
    {
      id: 2,
      student: 'Priya Singh',
      avatar: '👩‍💻',
      rating: 5,
      comment: 'Amazing mentor! She explained complex AI concepts in a very simple way. My understanding of deep learning improved significantly.',
      date: '1 month ago',
      course: 'Deep Learning Fundamentals'
    },
    {
      id: 3,
      student: 'Rahul Sharma',
      avatar: '👨‍💻',
      rating: 5,
      comment: 'Great guidance on my research paper. Dr. Wilson helped me structure my thoughts and improve the quality significantly.',
      date: '2 months ago',
      course: 'Research Paper Review'
    },
    {
      id: 4,
      student: 'Maya Patel',
      avatar: '👩‍💼',
      rating: 4,
      comment: 'Very knowledgeable and patient. Helped me transition from web development to AI/ML. The career guidance was spot on.',
      date: '3 months ago',
      course: 'Career Transition Guidance'
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const availableDates = [
    'Today', 'Tomorrow', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19'
  ];

  const handleBookSession = () => {
    if (selectedDate && selectedTime) {
      toast.success('Session Booked!', {
        description: `Your session with ${mentor.name} is confirmed for ${selectedDate} at ${selectedTime}`
      });
      setShowBookingModal(false);
    } else {
      toast.error('Please select date and time');
    }
  };

  const handleSendMessage = () => {
    toast.success('Message Sent!', {
      description: `Your message has been sent to ${mentor.name}`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showPage={showPage} />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <Button
            onClick={() => showPage('mentors')}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mentors
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <Card className="glass-card">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="text-6xl">{mentor.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
                          <p className="text-xl text-muted-foreground mb-2">{mentor.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{mentor.college}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{mentor.experience} experience</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-500/10 text-green-500">
                          {mentor.availability}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                            <span className="font-bold">{mentor.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{mentor.reviews} reviews</p>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{mentor.sessions}</div>
                          <p className="text-xs text-muted-foreground">Sessions</p>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{mentor.students}</div>
                          <p className="text-xs text-muted-foreground">Students</p>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{mentor.responseTime}</div>
                          <p className="text-xs text-muted-foreground">Response Time</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{mentor.bio}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {mentor.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-primary" />
                      Education
                    </h4>
                    <ul className="space-y-2">
                      {mentor.education.map((edu, index) => (
                        <li key={index} className="text-sm text-muted-foreground">• {edu}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-primary" />
                      Achievements
                    </h4>
                    <ul className="space-y-2">
                      {mentor.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-muted-foreground">• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Specializations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mentor.specializations.map((spec, index) => (
                        <div key={index} className="p-3 bg-muted/20 rounded-lg">
                          <p className="text-sm font-medium">{spec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>Reviews ({mentor.reviews})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{review.avatar}</span>
                          <div>
                            <p className="font-medium">{review.student}</p>
                            <p className="text-xs text-muted-foreground">{review.date} • {review.course}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="glass-card sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2">₹{mentor.price.toLocaleString()}</div>
                    <p className="text-muted-foreground">per hour</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowBookingModal(true)}
                      className="w-full btn-hero"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Session
                    </Button>
                    
                    <Button 
                      onClick={handleSendMessage}
                      variant="outline" 
                      className="w-full"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Quick Call
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Languages:</span>
                      <span>{mentor.languages.join(', ')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Timezone:</span>
                      <span>{mentor.timezone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Response:</span>
                      <span>{mentor.responseTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Total Students</span>
                    </div>
                    <span className="font-bold">{mentor.students}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Sessions Completed</span>
                    </div>
                    <span className="font-bold">{mentor.sessions}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Average Rating</span>
                    </div>
                    <span className="font-bold">{mentor.rating}/5</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Rate per Hour</span>
                    </div>
                    <span className="font-bold">₹{mentor.price.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glass-card w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Book a Session</CardTitle>
                <Button
                  onClick={() => setShowBookingModal(false)}
                  variant="ghost"
                  size="sm"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Select Date</h4>
                <div className="grid grid-cols-3 gap-2">
                  {availableDates.map((date) => (
                    <Button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      variant={selectedDate === date ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {date}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Select Time</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Session Fee:</span>
                  <span className="font-bold">₹{mentor.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Platform Fee:</span>
                  <span>₹100</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center font-bold">
                  <span>Total:</span>
                  <span>₹{(mentor.price + 100).toLocaleString()}</span>
                </div>
              </div>
              
              <Button
                onClick={handleBookSession}
                className="w-full btn-hero"
              >
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MentorProfile;