import React, { useState } from 'react';
import {
  Users,
  Compass,
  DollarSign,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { trips, destinations } = useTrips();
  const [userSearch, setUserSearch] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Mock list of platform users for Admin management
  const [usersList, setUsersList] = useState([
    { id: 'usr_001', name: 'Aryan Patel', email: 'aryan.patel@example.com', role: 'user', trips: 14, status: 'Active' },
    { id: 'usr_002', name: 'Elena R.', email: 'elena.r@globetrotter.com', role: 'user', trips: 8, status: 'Active' },
    { id: 'usr_003', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'user', trips: 5, status: 'Active' },
    { id: 'usr_004', name: 'Markus O.', email: 'markus.o@example.com', role: 'user', trips: 11, status: 'Active' },
    { id: 'usr_005', name: 'Admin Manager', email: 'admin@globetrotter.com', role: 'admin', trips: 22, status: 'Active' },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
      )
    );
    setToastMsg('User status updated!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Platform Admin
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface mt-1">
            Admin & Analytics Hub
          </h1>
          <p className="text-outline text-sm mt-0.5">
            Platform adoption, trip creation trends, destination popularity, and user management.
          </p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-outline font-semibold">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-headline font-extrabold text-3xl text-on-surface">1,420</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12.4% this month
          </span>
        </div>

        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-outline font-semibold">
            <span>Trips Created</span>
            <Compass className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-headline font-extrabold text-3xl text-on-surface">3,850</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.2% this month
          </span>
        </div>

        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-outline font-semibold">
            <span>Total Budget Tracked</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-headline font-extrabold text-3xl text-on-surface">$4.2M</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +8.5% growth
          </span>
        </div>

        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-outline font-semibold">
            <span>Public Shared Itineraries</span>
            <BarChart3 className="w-4 h-4 text-tertiary" />
          </div>
          <h3 className="font-headline font-extrabold text-3xl text-on-surface">640</h3>
          <span className="text-[11px] font-bold text-primary font-semibold">
            42% Copy Rate
          </span>
        </div>
      </div>

      {/* Analytics Charts & Top Destinations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Monthly Creation Bar Chart (7 cols) */}
        <div className="lg:col-span-7 glass-card-elevated rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-lg text-on-surface">
              Trip Creation Growth Trends
            </h3>
            <span className="text-xs text-outline font-semibold">2024 YTD</span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6">
            {[
              { month: 'May', count: 320 },
              { month: 'Jun', count: 450 },
              { month: 'Jul', count: 580 },
              { month: 'Aug', count: 720 },
              { month: 'Sep', count: 640 },
              { month: 'Oct', count: 890 },
            ].map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.count}
                </span>
                <div className="w-full bg-surface-container-high h-44 rounded-xl flex items-end p-0.5">
                  <div
                    className="w-full bg-primary rounded-lg group-hover:bg-primary-dim transition-all duration-500"
                    style={{ height: `${(item.count / 900) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-outline">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Top Destinations Table (5 cols) */}
        <div className="lg:col-span-5 glass-card-elevated rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-4">
          <h3 className="font-headline font-bold text-lg text-on-surface pb-2 border-b border-outline-variant/40">
            Top Booked Destinations
          </h3>

          <div className="space-y-3">
            {destinations.slice(0, 4).map((dest, idx) => (
              <div
                key={dest.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/40"
              >
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-xs text-outline">#{idx + 1}</span>
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">{dest.city}</h4>
                    <p className="text-[11px] text-outline">{dest.country}</p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="font-bold text-primary block">⭐ {dest.popularityRating}</span>
                  <span className="text-[10px] text-outline">Est. ${dest.estCostPerDay}/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="glass-card-elevated rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-on-surface">User Management</h3>
            <p className="text-xs text-outline">Control platform accounts, roles, and status.</p>
          </div>

          <div className="w-full sm:w-64 relative">
            <Search className="w-4 h-4 text-outline absolute left-3 top-2.5" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search user email or name..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-xs text-on-surface focus:outline-none"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/60 text-outline uppercase font-bold text-[10px] tracking-wider">
                <th className="pb-3 px-3">User Name</th>
                <th className="pb-3 px-3">Email</th>
                <th className="pb-3 px-3">Role</th>
                <th className="pb-3 px-3">Trips</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-surface-container-low/50">
                  <td className="py-3 px-3 font-bold text-on-surface">{u.name}</td>
                  <td className="py-3 px-3 text-outline">{u.email}</td>
                  <td className="py-3 px-3 font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold">{u.trips}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="px-3 py-1 rounded-lg border border-outline-variant text-[11px] font-semibold text-on-surface hover:bg-surface-container transition-colors"
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
