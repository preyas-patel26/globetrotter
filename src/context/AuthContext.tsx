import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { mockUser } from '../data/mockData';

export interface UserAccount extends UserProfile {
  role: 'user' | 'admin';
}

const adminUser: UserAccount = {
  ...mockUser,
  id: 'usr_admin',
  firstName: 'Admin',
  lastName: 'Manager',
  email: 'admin@globetrotter.com',
  tier: 'Platform Admin',
  role: 'admin',
};

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => boolean;
  register: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start with user = null so accessing localhost lands on /login first!
  const [user, setUser] = useState<UserAccount | null>(() => {
    const saved = sessionStorage.getItem('globetrotter_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('globetrotter_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('globetrotter_user');
      localStorage.removeItem('globetrotter_user');
    }
  }, [user]);

  const login = (email?: string, _password?: string) => {
    const trimmedEmail = (email || '').trim().toLowerCase();

    if (trimmedEmail === 'admin@globetrotter.com') {
      setUser(adminUser);
      return true;
    }

    const regularUser: UserAccount = {
      ...mockUser,
      email: email || mockUser.email,
      role: 'user',
    };
    setUser(regularUser);
    return true;
  };

  const register = (userData: Partial<UserProfile>) => {
    const newUser: UserAccount = {
      ...mockUser,
      id: `usr_${Date.now()}`,
      firstName: userData.firstName || 'New',
      lastName: userData.lastName || 'Explorer',
      email: userData.email || 'user@globetrotter.com',
      phone: userData.phone || '+1 (555) 000-0000',
      city: userData.city || 'Seattle',
      country: userData.country || 'United States',
      avatar: userData.avatar || mockUser.avatar,
      role: 'user',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
    localStorage.clear();
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
