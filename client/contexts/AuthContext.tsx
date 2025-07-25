import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '@/services/api';
import { message } from 'antd';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('user_data') || '');
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const response = await authAPI.login(email, password);

      if (response.token) {
        const userData: User = {
          id: '1',
          email: email,
          name: 'Admin User'
        };

        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser(userData);
        message.success('Login successful!');
        setIsLoading(false);
        return true;
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed');
      setIsLoading(false);
      return false;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    message.success('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
