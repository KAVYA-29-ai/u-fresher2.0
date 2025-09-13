import React, { useState, useEffect } from 'react';
import { UserProvider } from '@/contexts/UserContext';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/components/LandingPage';
import FresherDashboard from '@/components/dashboards/FresherDashboard';
import MentorDashboard from '@/components/dashboards/MentorDashboard';
import CollegeDiscovery from '@/components/college/CollegeDiscovery';
import CollegeDetail from '@/components/college/CollegeDetail';
import MentorDirectory from '@/components/mentor/MentorDirectory';
import MentorProfile from '@/components/mentor/MentorProfile';
import AboutPage from '@/components/AboutPage';

import ProjectHub from '@/components/project/ProjectHub';

export type Page = 
  | 'landing' 
  | 'fresher-dashboard' 
  | 'mentor-dashboard' 
  | 'colleges' 
  | 'college-detail' 
  | 'mentors' 
  | 'mentor-profile' 
  | 'about' 
  | 'projects';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [selectedMentor, setSelectedMentor] = useState<string>('');

  // Navigation function
  const showPage = (page: Page, data?: any) => {
    setCurrentPage(page);
    if (page === 'college-detail' && data) {
      setSelectedCollege(data.collegeId);
    }
    if (page === 'mentor-profile' && data) {
      setSelectedMentor(data.mentorId);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage showPage={showPage} />;
      case 'fresher-dashboard':
        return <FresherDashboard showPage={showPage} />;
      case 'mentor-dashboard':
        return <MentorDashboard showPage={showPage} />;
      case 'colleges':
        return <CollegeDiscovery showPage={showPage} />;
      case 'college-detail':
        return <CollegeDetail collegeId={selectedCollege} showPage={showPage} />;
      case 'mentors':
        return <MentorDirectory showPage={showPage} />;
      case 'mentor-profile':
        return <MentorProfile mentorId={selectedMentor} showPage={showPage} />;
      case 'about':
        return <AboutPage showPage={showPage} />;
      case 'projects':
        return <ProjectHub showPage={showPage} />;
      default:
        return <LandingPage showPage={showPage} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-background">
        {renderCurrentPage()}
        <Toaster />
      </div>
    </UserProvider>
  );
};

export default Index;