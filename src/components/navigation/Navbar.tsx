import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { Page } from '@/pages/Index';
import logoImage from '@/assets/logo.png';

interface NavbarProps {
  showPage: (page: Page) => void;
  onAuthClick?: (mode: 'fresher' | 'mentor') => void;
}

const Navbar: React.FC<NavbarProps> = ({ showPage, onAuthClick }) => {
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'landing' as Page },
    { label: 'Communities', page: 'colleges' as Page },
    { label: 'Mentors', page: 'mentors' as Page },
    { label: 'Projects', page: 'projects' as Page },
    { label: 'About', page: 'about' as Page }
  ];

  const handleNavClick = (page: Page) => {
    showPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    showPage('landing');
    setIsMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (user?.role === 'fresher') {
      showPage('fresher-dashboard');
    } else if (user?.role === 'mentor') {
      showPage('mentor-dashboard');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 navbar-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <img 
              src={logoImage} 
              alt="U Fresher Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold gradient-text hidden sm:block">
              U Fresher
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item.page)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleDashboardClick}
                  variant="ghost"
                  className="flex items-center space-x-2"
                >
                  <span className="text-lg">{user.avatar}</span>
                  <span className="text-sm font-medium">{user.name}</span>
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => onAuthClick?.('fresher')}
                  variant="ghost"
                  size="sm"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => onAuthClick?.('fresher')}
                  className="btn-hero text-sm px-4 py-2"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 navbar-blur border-t border-border">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.page)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t border-border pt-4">
                {user ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleDashboardClick}
                      className="flex items-center space-x-2 w-full text-left py-2"
                    >
                      <span className="text-lg">{user.avatar}</span>
                      <span className="text-sm font-medium">{user.name}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left text-muted-foreground hover:text-foreground py-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      onClick={() => onAuthClick?.('fresher')}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => onAuthClick?.('fresher')}
                      className="w-full btn-hero"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;