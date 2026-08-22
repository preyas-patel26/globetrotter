import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

export interface UserAccount extends UserProfile {
  role: 'user' | 'admin';
}

const defaultAdminUser: UserAccount = {
  id: 'usr_admin',
  firstName: 'Admin',
  lastName: 'Manager',
  email: 'admin@globetrotter.com',
  phone: '+1 (555) 000-9999',
  city: 'San Francisco',
  country: 'United States',
  tier: 'Platform Admin',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  tripsCompleted: 0,
  countriesVisited: 0,
  preferredLanguage: 'English (US)',
  displayCurrency: 'USD ($)',
  savedDestinations: [],
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
      setUser(defaultAdminUser);
      return true;
    }

    // Clean user profile for newly logged in travelers
    const regularUser: UserAccount = {
      id: `usr_${Date.now()}`,
      firstName: trimmedEmail.split('@')[0] || 'Explorer',
      lastName: 'Traveler',
      email: trimmedEmail || 'user@globetrotter.com',
      phone: '+1 (555) 123-4567',
      city: 'Seattle',
      country: 'United States',
      tier: 'Explorer Tier',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      tripsCompleted: 0,
      countriesVisited: 0,
      preferredLanguage: 'English (US)',
      displayCurrency: 'USD ($)',
      savedDestinations: [],
      role: 'user',
    };
    setUser(regularUser);
    return true;
  };

  const register = (userData: Partial<UserProfile>) => {
    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      firstName: userData.firstName || 'Explorer',
      lastName: userData.lastName || 'Traveler',
      email: userData.email || 'user@globetrotter.com',
      phone: userData.phone || '+1 (555) 000-0000',
      city: userData.city || 'Seattle',
      country: userData.country || 'United States',
      tier: 'Explorer Tier',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      tripsCompleted: 0,
      countriesVisited: 0,
      preferredLanguage: 'English (US)',
      displayCurrency: 'USD ($)',
      savedDestinations: [],
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
