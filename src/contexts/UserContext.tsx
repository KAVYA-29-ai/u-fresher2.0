import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'fresher' | 'mentor';
  avatar: string;
  college?: string;
  joinedCommunities: string[];
  projects: string[];
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  joinCommunity: (collegeId: string) => void;
  joinProject: (projectId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Demo accounts
const DEMO_ACCOUNTS = {
  'fresher@demo.com': {
    id: 'fresher1',
    email: 'fresher@demo.com',
    name: 'Alex Kumar',
    role: 'fresher' as const,
    avatar: '👨‍🎓',
    college: 'GLA University',
    joinedCommunities: ['gla'],
    projects: ['iot-parking']
  },
  'mentor@demo.com': {
    id: 'mentor1',
    email: 'mentor@demo.com', 
    name: 'Dr. Sarah Wilson',
    role: 'mentor' as const,
    avatar: '👩‍🏫',
    college: 'IIT Delhi',
    joinedCommunities: ['iit-delhi'],
    projects: ['ai-resume']
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('ufresher_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check demo accounts
    const account = DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS];
    
    if (account && 
        ((email === 'fresher@demo.com' && password === 'Demo123') ||
         (email === 'mentor@demo.com' && password === 'Mentor123'))) {
      
      setUser(account);
      localStorage.setItem('ufresher_user', JSON.stringify(account));
      toast.success('Login Successful!', {
        description: `Welcome back, ${account.name}!`
      });
      return true;
    }
    
    toast.error('Invalid Credentials', {
      description: 'Please check your email and password'
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ufresher_user');
    toast.success('Logged out successfully');
  };

  const joinCommunity = (collegeId: string) => {
    if (user && !user.joinedCommunities.includes(collegeId)) {
      const updatedUser = {
        ...user,
        joinedCommunities: [...user.joinedCommunities, collegeId]
      };
      setUser(updatedUser);
      localStorage.setItem('ufresher_user', JSON.stringify(updatedUser));
      toast.success('Joined Community!', {
        description: 'You can now participate in discussions'
      });
    }
  };

  const joinProject = (projectId: string) => {
    if (user && !user.projects.includes(projectId)) {
      const updatedUser = {
        ...user,
        projects: [...user.projects, projectId]
      };
      setUser(updatedUser);
      localStorage.setItem('ufresher_user', JSON.stringify(updatedUser));
      toast.success('Joined Project!', {
        description: 'Check your dashboard for project updates'
      });
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      joinCommunity,
      joinProject
    }}>
      {children}
    </UserContext.Provider>
  );
};