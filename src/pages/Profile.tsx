import React, { useState } from 'react';
import { Edit2, Globe, Plane, MapPin, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/common/Modal';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Aryan',
    lastName: user?.lastName || 'Patel',
    email: user?.email || 'aryan.patel@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    city: user?.city || 'Seattle',
    country: user?.country || 'United States',
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!user) return null;

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditModalOpen(false);
    setToastMsg('Profile updated successfully!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Profile Header Avatar Banner matching media_1787377170639.png */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.firstName}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white shadow-md hover:scale-110 transition-transform"
            title="Edit profile photo"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-1">
          <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-xs text-outline font-medium">{user.email}</p>
          <span className="px-3 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[11px] font-bold inline-block mt-1">
            {user.tier}
          </span>
        </div>
      </div>

      {/* Main Grid: Personal Info & Preferences (Left) + Stats & Saved (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Personal Information Card */}
          <div className="glass-card-elevated rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/40">
              <h3 className="font-headline font-bold text-lg text-on-surface">
                Personal Information
              </h3>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-outline uppercase font-bold text-[10px] block mb-1">
                  FIRST NAME
                </span>
                <span className="font-bold text-sm text-on-surface">{user.firstName}</span>
              </div>

              <div>
                <span className="text-outline uppercase font-bold text-[10px] block mb-1">
                  LAST NAME
                </span>
                <span className="font-bold text-sm text-on-surface">{user.lastName}</span>
              </div>

              <div>
                <span className="text-outline uppercase font-bold text-[10px] block mb-1">
                  EMAIL ADDRESS
                </span>
                <span className="font-bold text-sm text-on-surface">{user.email}</span>
              </div>

              <div>
                <span className="text-outline uppercase font-bold text-[10px] block mb-1">
                  PHONE NUMBER
                </span>
                <span className="font-bold text-sm text-on-surface">{user.phone}</span>
              </div>
            </div>
          </div>

          {/* Travel Preferences Card */}
          <div className="glass-card-elevated rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30 space-y-6">
            <h3 className="font-headline font-bold text-lg text-on-surface pb-4 border-b border-outline-variant/40">
              Travel Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/40 flex items-center justify-center text-primary">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-outline font-bold uppercase block">
                    Preferred Language
                  </span>
                  <span className="font-bold text-sm text-on-surface">
                    {user.preferredLanguage}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/40 flex items-center justify-center text-primary">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-outline font-bold uppercase block">
                    Display Currency
                  </span>
                  <span className="font-bold text-sm text-on-surface">
                    {user.displayCurrency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Journey Stats Card */}
          <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 space-y-6">
            <h3 className="font-headline font-bold text-lg text-on-surface pb-3 border-b border-outline-variant/40">
              Journey Stats
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-lowest">
                <div className="flex items-center gap-3">
                  <Plane className="w-5 h-5 text-primary" />
                  <span className="text-xs font-semibold text-on-surface">Trips Completed</span>
                </div>
                <span className="font-extrabold text-xl text-on-surface">
                  {user.tripsCompleted}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-lowest">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-xs font-semibold text-on-surface">Countries Visited</span>
                </div>
                <span className="font-extrabold text-xl text-on-surface">
                  {user.countriesVisited}
                </span>
              </div>
            </div>
          </div>

          {/* Saved Destinations Card */}
          <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-lg text-on-surface">
                Saved Destinations
              </h3>
              <a href="#viewall" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-primary hover:underline">
                View All
              </a>
            </div>

            <div className="space-y-3">
              {user.savedDestinations.map((dest, i) => (
                <div
                  key={i}
                  className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h4 className="font-headline font-bold text-base text-white">{dest.city}</h4>
                    <p className="text-xs text-white/80 font-medium">{dest.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Personal Profile"
      >
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-bold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
