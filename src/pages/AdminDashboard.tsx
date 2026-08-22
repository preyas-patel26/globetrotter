import React, { useState } from 'react';
import {
  Users,
  Compass,
  DollarSign,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Search,
  CheckCircle,
  Plus,
  Edit2,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { Modal } from '../components/common/Modal';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { destinations, addAdminDestination, updateDestinationEstCost } = useTrips();
  const [userSearch, setUserSearch] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Admin Add Destination Modal State
  const [isAddDestModalOpen, setIsAddDestModalOpen] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newRegion, setNewRegion] = useState('Asia');
  const [newCostPerDay, setNewCostPerDay] = useState<number>(180);
  const [newCostLevel, setNewCostLevel] = useState<'Low' | 'Med' | 'High'>('Med');
  const [newImage, setNewImage] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Editing Approx Cost State
  const [editingDestId, setEditingDestId] = useState<string | null>(null);
  const [tempCostInput, setTempCostInput] = useState<number>(0);

  // Mock list of platform users for Admin management
  const [usersList, setUsersList] = useState([
    { id: 'usr_001', name: 'Aryan Patel', email: 'aryan.patel@example.com', role: 'user', trips: 4, status: 'Active' },
    { id: 'usr_002', name: 'Elena R.', email: 'elena.r@globetrotter.com', role: 'user', trips: 8, status: 'Active' },
    { id: 'usr_003', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'user', trips: 5, status: 'Active' },
    { id: 'usr_004', name: 'Markus O.', email: 'markus.o@example.com', role: 'user', trips: 11, status: 'Active' },
    { id: 'usr_005', name: 'Admin Manager', email: 'admin@globetrotter.com', role: 'admin', trips: 0, status: 'Active' },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const toggleUserStatus = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
      )
    );
    showToast('User status updated!');
  };

  const handleAddDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCity || !newCountry) return;

    addAdminDestination({
      city: newCity,
      country: newCountry,
      region: newRegion,
      estCostPerDay: newCostPerDay,
      costLevel: newCostLevel,
      popularityRating: 4.8,
      nights: 3,
      startDate: '2024-11-01',
      endDate: '2024-11-04',
      image:
        newImage ||
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      description: newDescription || 'A beautiful newly added destination for travelers.',
    });

    setIsAddDestModalOpen(false);
    setNewCity('');
    setNewCountry('');
    setNewImage('');
    setNewDescription('');
    showToast(`Successfully added ${newCity}, ${newCountry} to platform places!`);
  };

  const handleSaveEstCost = (destId: string) => {
    updateDestinationEstCost(destId, tempCostInput);
    setEditingDestId(null);
    showToast('Approximate daily expense updated!');
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
            Admin Management & Analytics
          </h1>
          <p className="text-outline text-sm mt-0.5">
            Add new places, manage approx travel expenses, monitor adoption, and control user access.
          </p>
        </div>

        <button
          onClick={() => setIsAddDestModalOpen(true)}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-dim transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Place / Destination</span>
        </button>
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
            <span>Platform Destinations</span>
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-headline font-extrabold text-3xl text-on-surface">
            {destinations.length}
          </h3>
          <span className="text-[11px] font-bold text-primary font-semibold">
            Active Places
          </span>
        </div>

        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-outline font-semibold">
            <span>Total Approx Budget</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-headline font-extrabold text-3xl text-on-surface">$4.2M</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Managed by Admin
          </span>
        </div>

        <div className="glass-card-elevated rounded-3xl p-6 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-outline font-semibold">
            <span>Public Itineraries</span>
            <BarChart3 className="w-4 h-4 text-tertiary" />
          </div>
          <h3 className="font-headline font-extrabold text-3xl text-on-surface">640</h3>
          <span className="text-[11px] font-bold text-primary font-semibold">
            Community Copies
          </span>
        </div>
      </div>

      {/* ADMIN DESTINATION APPROX COST MANAGEMENT TABLE */}
      <div className="glass-card-elevated rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-lg text-on-surface">
              Manage Destination Places & Approx Expenses
            </h3>
            <p className="text-xs text-outline">
              Admin can manually set and update the approximate daily expenses for each place.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{dest.city}</h4>
                  <p className="text-xs text-outline">{dest.country}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-outline font-bold block uppercase">APPROX COST</span>
                  {editingDestId === dest.id ? (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs font-bold">$</span>
                      <input
                        type="number"
                        value={tempCostInput}
                        onChange={(e) => setTempCostInput(Number(e.target.value))}
                        className="w-16 px-1.5 py-0.5 border rounded text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => handleSaveEstCost(dest.id)}
                        className="px-2 py-0.5 bg-primary text-white text-[10px] rounded font-bold"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span className="font-bold text-primary">${dest.estCostPerDay || 200}/day</span>
                  )}
                </div>

                {editingDestId !== dest.id && (
                  <button
                    onClick={() => {
                      setEditingDestId(dest.id);
                      setTempCostInput(dest.estCostPerDay || 200);
                    }}
                    className="p-1.5 rounded-lg text-outline hover:bg-surface-container hover:text-primary"
                    title="Edit Approx Daily Expense"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Access Management Table */}
      <div className="glass-card-elevated rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Platform Users</h3>
            <p className="text-xs text-outline">Manage accounts and authorization roles.</p>
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

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/60 text-outline uppercase font-bold text-[10px] tracking-wider">
                <th className="pb-3 px-3">User Name</th>
                <th className="pb-3 px-3">Email</th>
                <th className="pb-3 px-3">Role</th>
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

      {/* ADMIN ADD DESTINATION PLACE MODAL */}
      <Modal
        isOpen={isAddDestModalOpen}
        onClose={() => setIsAddDestModalOpen(false)}
        title="Add New Place / Destination (Admin)"
      >
        <form onSubmit={handleAddDestinationSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase mb-1">City Name</label>
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="e.g. Venice"
                className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1">Country</label>
              <input
                type="text"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                placeholder="e.g. Italy"
                className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase mb-1">Region</label>
              <select
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none"
              >
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
                <option value="Americas">Americas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1">Approx $/Day</label>
              <input
                type="number"
                value={newCostPerDay}
                onChange={(e) => setNewCostPerDay(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase mb-1">Cost Tier</label>
              <select
                value={newCostLevel}
                onChange={(e) => setNewCostLevel(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Med">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1">Cover Image URL</label>
            <input
              type="url"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={2}
              placeholder="Describe the place..."
              className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsAddDestModalOpen(false)}
              className="px-4 py-2 border rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:bg-primary-dim"
            >
              Add Place
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
