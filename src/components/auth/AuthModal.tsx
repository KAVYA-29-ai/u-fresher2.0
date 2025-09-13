import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/contexts/UserContext';
import { Page } from '@/pages/Index';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'fresher' | 'mentor';
  showPage: (page: Page) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, showPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login } = useUser();

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        onClose();
        // Redirect to appropriate dashboard
        if (formData.email === 'fresher@demo.com') {
          showPage('fresher-dashboard');
        } else if (formData.email === 'mentor@demo.com') {
          showPage('mentor-dashboard');
        }
      }
    } else {
      // Signup logic would go here
      console.log('Signup:', { ...formData, mode });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl w-full max-w-md p-8 relative animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">UF</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Join U Fresher'}
          </h2>
          
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to your account' : `Create your ${mode} account`}
          </p>
        </div>

        {/* Demo Accounts Info */}
        {isLogin && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-2 text-primary">Demo Accounts:</h3>
            <div className="text-sm space-y-1">
              <div>📚 Fresher: fresher@demo.com / Demo123</div>
              <div>🎓 Mentor: mentor@demo.com / Mentor123</div>
            </div>
          </div>
        )}

        {/* Mode Toggle */}
        <div className="flex rounded-lg bg-muted p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              isLogin ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              !isLogin ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
              />
            </div>
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
              {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <Button type="submit" className="w-full btn-hero">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline ml-1"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;