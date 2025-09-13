import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Building, ArrowRight, Star, MessageCircle, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Page } from '@/pages/Index';

interface LandingPageProps {
  showPage: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ showPage }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'fresher' | 'mentor'>('fresher');
  const [typewriterText, setTypewriterText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const fullText = "Connect. Learn. Grow. Together.";
  const stats = [
    { icon: Users, label: 'Students', value: 10000, suffix: '+' },
    { icon: GraduationCap, label: 'Mentors', value: 500, suffix: '+' },
    { icon: Building, label: 'Colleges', value: 50, suffix: '+' }
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Animated counter for stats
  const AnimatedCounter: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      const increment = target / 100;
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < target) {
            return Math.min(prev + increment, target);
          }
          clearInterval(timer);
          return target;
        });
      }, 20);
      return () => clearInterval(timer);
    }, [target]);
    
    return <span>{Math.floor(count).toLocaleString()}{suffix}</span>;
  };

  // Floating particles component
  const FloatingParticles = () => (
    <div className="floating-particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );

  // Updates ticker
  const updates = [
    "🎉 New hackathon organized by IIT Delhi - Register now!",
    "💼 Amazon is hiring interns - Check placement cell",
    "📚 Free AI/ML workshop this weekend at VIT",
    "🏆 GLA student wins national coding competition",
    "🔬 Research opportunity available in blockchain",
    "📱 New mobile app development mentorship program",
    "🌟 Career guidance session with Google engineer",
    "💡 Startup pitch competition - Win ₹50,000!"
  ];

  const openAuthModal = (mode: 'fresher' | 'mentor') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles />
      
      <Navbar showPage={showPage} onAuthClick={openAuthModal} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="hero-gradient absolute inset-0 opacity-20" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text">
              U Fresher
            </h1>
            
            <div className="text-2xl md:text-4xl font-semibold mb-12 h-16 flex items-center justify-center">
              <span className="animate-typewriter">{typewriterText}</span>
            </div>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              The ultimate platform connecting university students with experienced mentors, 
              fostering collaboration and accelerating career growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={() => openAuthModal('fresher')}
                className="btn-hero text-lg px-8 py-4"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
              
              <Button 
                onClick={() => openAuthModal('mentor')}
                className="btn-outline text-lg px-8 py-4"
              >
                Join as Mentor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="glass-card glow-card rounded-2xl p-8 text-center animate-count-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold mb-2 gradient-text">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updates Ticker */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4 text-center">Latest Updates</h3>
          <div className="overflow-hidden">
            <div className="flex animate-pulse space-x-8">
              {updates.map((update, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 bg-card rounded-lg px-6 py-3 shadow-card"
                >
                  <p className="text-sm whitespace-nowrap">{update}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Why Choose U Fresher?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MessageCircle, title: "Smart Networking", desc: "Connect with peers and mentors from top colleges" },
              { icon: Calendar, title: "Mentorship Sessions", desc: "Book 1-on-1 sessions with industry experts" },
              { icon: TrendingUp, title: "Skill Development", desc: "Join projects and enhance your portfolio" },
              { icon: Star, title: "Career Growth", desc: "Get placement assistance and career guidance" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-card glow-card rounded-xl p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 U Fresher – All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        showPage={showPage}
      />
    </div>
  );
};

export default LandingPage;