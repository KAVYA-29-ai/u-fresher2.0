import React from 'react';
import { ArrowLeft, Users, BookOpen, Zap, Shield, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/navigation/Navbar';
import { Page } from '@/pages/Index';

interface AboutPageProps {
  showPage: (page: Page) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ showPage }) => {
  const features = [
    {
      icon: Users,
      title: 'Smart Networking',
      description: 'Connect with peers and mentors from top colleges across India. Build meaningful relationships that last beyond graduation.'
    },
    {
      icon: BookOpen,
      title: 'Expert Mentorship',
      description: 'Get guidance from industry professionals and alumni. Book 1-on-1 sessions and accelerate your career growth.'
    },
    {
      icon: Zap,
      title: 'Skill Development',
      description: 'Join collaborative projects, participate in hackathons, and enhance your portfolio with real-world experience.'
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'We maintain a safe and inclusive platform where students can learn, grow, and express themselves freely.'
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'Our focus is on building strong communities that support each other through academic and professional journeys.'
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Access international internships, exchange programs, and global networking opportunities.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '500+', label: 'Expert Mentors' },
    { number: '50+', label: 'College Communities' },
    { number: '1,000+', label: 'Success Stories' }
  ];

  const team = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', avatar: '👨‍💼', description: 'Former Google engineer passionate about education' },
    { name: 'Priya Sharma', role: 'Head of Product', avatar: '👩‍💻', description: 'Ex-Microsoft PM with 8+ years experience' },
    { name: 'Arjun Patel', role: 'Head of Engineering', avatar: '👨‍💻', description: 'Full-stack expert and startup veteran' },
    { name: 'Sneha Reddy', role: 'Head of Community', avatar: '👩‍🎓', description: 'Education advocate and community builder' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar showPage={showPage} />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <Button
              onClick={() => showPage('landing')}
              variant="ghost"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                About U Fresher
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Empowering the next generation of leaders through meaningful connections, 
                expert mentorship, and collaborative learning experiences.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="glass-card rounded-3xl p-8 md:p-12 bg-gradient-primary text-white">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                  To bridge the gap between academic learning and industry requirements by creating 
                  a vibrant ecosystem where students can connect, learn from experienced professionals, 
                  and collaborate on real-world projects that shape their future careers.
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-card text-center">
                  <CardContent className="p-8">
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Why U Fresher */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose U Fresher?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We're more than just a platform – we're a community dedicated to your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="glass-card glow-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How It Helps */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  For <span className="gradient-text">Students</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Career Guidance</h4>
                      <p className="text-muted-foreground">Get personalized advice from industry experts and alumni</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Skill Building</h4>
                      <p className="text-muted-foreground">Participate in projects and hackathons to enhance your skills</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Network Building</h4>
                      <p className="text-muted-foreground">Connect with peers and build lifelong professional relationships</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  For <span className="gradient-text">Mentors</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-accent rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Give Back</h4>
                      <p className="text-muted-foreground">Share your knowledge and help shape the next generation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-accent rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Earn Income</h4>
                      <p className="text-muted-foreground">Monetize your expertise through mentorship sessions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-accent rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Stay Updated</h4>
                      <p className="text-muted-foreground">Keep up with the latest trends through student interactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Passionate individuals working together to transform education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="glass-card text-center">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{member.avatar}</div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mb-16">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students and mentors who are already part of our thriving community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => showPage('colleges')}
                  className="btn-hero text-lg px-8 py-3"
                >
                  Explore Communities
                </Button>
                <Button 
                  onClick={() => showPage('mentors')}
                  className="btn-outline text-lg px-8 py-3"
                >
                  Find Mentors
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;