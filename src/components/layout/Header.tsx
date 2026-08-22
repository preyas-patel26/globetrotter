import React, { useState } from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  placeholder = 'Search destinations, trips, activities...',
  onSearch,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/discovery?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 px-6 flex items-center justify-between gap-4 bg-transparent">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-outline absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-container-lowest/80 border border-outline-variant/60 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-full text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sunset-orange ring-2 ring-surface" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-card-elevated p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/50">
                <h4 className="font-semibold text-sm text-on-surface">Notifications</h4>
                <span className="text-xs text-primary font-medium cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="py-3 space-y-3">
                <div className="flex gap-3 text-xs">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-on-surface">Trip Budget Alert</p>
                    <p className="text-outline">Day 4 of Japan trip exceeded daily budget by $145.</p>
                    <span className="text-[10px] text-outline/80 mt-1 block">2 hours ago</span>
                  </div>
                </div>
                <div className="flex gap-3 text-xs">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-sunset-orange flex-shrink-0" />
                  <div>
                    <p className="font-medium text-on-surface">Community Copy</p>
                    <p className="text-outline">3 travelers copied your Kyoto Sakura itinerary!</p>
                    <span className="text-[10px] text-outline/80 mt-1 block">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Support Help Button */}
        <button
          onClick={() => navigate('/support')}
          className="p-2.5 rounded-full text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
          title="Help & Support"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Profile Avatar Button */}
        {user && (
          <button
            onClick={() => navigate('/profile')}
            className="p-0.5 rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all ml-1"
          >
            <img
              src={user.avatar}
              alt={user.firstName}
              className="w-9 h-9 rounded-full object-cover"
            />
          </button>
        )}
      </div>
    </header>
  );
};
