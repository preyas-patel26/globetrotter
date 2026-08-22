import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Compass as DiscoveryIcon,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  X,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Trips', path: '/trips', icon: Compass },
    { name: 'Plan a Trip', path: '/trips/create', icon: MapPin },
    { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Discovery', path: '/discovery', icon: DiscoveryIcon },
  ];

  // Show Admin Management module link ONLY for authenticated Admin users
  if (isAdmin) {
    mainNavItems.push({ name: 'Admin Portal', path: '/admin', icon: ShieldCheck });
  }

  const secondaryNavItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Support', path: '/support', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navContent = (
    <div className="flex flex-col h-full py-6 px-4 bg-surface-container-lowest border-r border-outline-variant shadow-sm text-on-surface">
      {/* Brand Header */}
      <div className="px-3 mb-6 flex items-center justify-between">
        <NavLink to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-lg text-primary leading-none tracking-tight">
              GlobeTrotter
            </h1>
            <span className="text-[11px] font-medium text-outline uppercase tracking-wider block mt-0.5">
              {isAdmin ? 'Admin Portal' : 'Travel Platform'}
            </span>
          </div>
        </NavLink>
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Primary Navigation Links */}
      <div className="space-y-1 mb-6">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-secondary-fixed text-on-secondary-fixed shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-outline'}`} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Start New Trip CTA Button */}
      {!isAdmin && (
        <div className="px-2 mb-6">
          <NavLink
            to="/trips/create"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-md hover:bg-primary-dim hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Start New Trip</span>
          </NavLink>
        </div>
      )}

      <div className="my-1 border-t border-outline-variant/50" />

      {/* Secondary Links */}
      <div className="space-y-1 mt-2 flex-1">
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
                isActive
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <Icon className="w-4 h-4 text-outline" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* User Footer Profile & Logout */}
      {user && (
        <div className="pt-3 border-t border-outline-variant/60 flex items-center justify-between px-2">
          <NavLink
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity min-w-0"
          >
            <img
              src={user.avatar}
              alt={user.firstName}
              className="w-8 h-8 rounded-full object-cover border border-primary-container"
            />
            <div className="min-w-0">
              <p className="font-semibold text-xs text-on-surface truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] text-outline truncate">
                {isAdmin ? '🛡️ Admin' : user.tier}
              </p>
            </div>
          </NavLink>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Shell */}
      <aside className="hidden md:block w-[260px] h-screen fixed left-0 top-0 z-40">
        {navContent}
      </aside>

      {/* Mobile Top Bar Trigger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant px-4 flex items-center justify-between z-30 shadow-sm">
        <NavLink to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
            <Compass className="w-5 h-5 text-primary" />
          </div>
          <span className="font-headline font-bold text-primary text-base">GlobeTrotter</span>
        </NavLink>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-on-surface hover:bg-surface-container-low"
        >
          <Compass className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[280px] max-w-full bg-surface-container-lowest h-full z-10 shadow-2xl">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
