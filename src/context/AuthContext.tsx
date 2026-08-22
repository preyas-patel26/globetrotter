import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

export interface UserAccount extends UserProfile {
  role: 'user' | 'admin';
  password?: string;
}

const defaultAdminUser: UserAccount = {
  id: 'usr_admin',
  firstName: 'Admin',
  lastName: 'Manager',
  email: 'admin@globetrotter.com',
  password: 'admin123',
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

const defaultDemoUser: UserAccount = {
  id: 'usr_demo',
  firstName: 'Aryan',
  lastName: 'Patel',
  email: 'demo@globetrotter.com',
  password: 'demo123',
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

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => boolean;
  register: (userData: Partial<UserProfile> & { password?: string }) => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Registered Accounts Store
  const [registeredAccounts, setRegisteredAccounts] = useState<UserAccount[]>(() => {
    const savedAccounts = localStorage.getItem('globetrotter_registered_accounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [defaultAdminUser, defaultDemoUser];
  });

  // Current Logged In User
  const [user, setUser] = useState<UserAccount | null>(() => {
    const saved = sessionStorage.getItem('globetrotter_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('globetrotter_registered_accounts', JSON.stringify(registeredAccounts));
  }, [registeredAccounts]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('globetrotter_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('globetrotter_user');
    }
  }, [user]);

  // Strict Login Function: Verifies both Email AND Password match registered accounts!
  const login = (email?: string, password?: string): boolean => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const inputPassword = (password || '').trim();

    if (!trimmedEmail || !inputPassword) return false;

    // Search in registered accounts database
    const found = registeredAccounts.find(
      (acc) => acc.email.trim().toLowerCase() === trimmedEmail
    );

    if (found && found.password === inputPassword) {
      setUser(found);
      return true;
    }

    return false; // Authentication failed!
  };

  // Secure Registration Function: Saves email & password into registered accounts database
  const register = (userData: Partial<UserProfile> & { password?: string }): boolean => {
    const trimmedEmail = (userData.email || '').trim().toLowerCase();
    const password = (userData.password || '').trim();

    if (!trimmedEmail || !password) return false;

    // Check if email is already registered
    const existing = registeredAccounts.find(
      (acc) => acc.email.trim().toLowerCase() === trimmedEmail
    );
    if (existing) return false;

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      firstName: userData.firstName || 'Explorer',
      lastName: userData.lastName || 'Traveler',
      email: trimmedEmail,
      password: password,
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

    setRegisteredAccounts((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updated };
      setUser(updatedUser);
      setRegisteredAccounts((prev) =>
        prev.map((acc) => (acc.id === user.id ? updatedUser : acc))
      );
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
