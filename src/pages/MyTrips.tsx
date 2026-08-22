import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Calendar as CalendarIcon, Trash2, Edit3, Eye, Compass } from 'lucide-react';
import { useTrips } from '../context/TripContext';
import { Modal } from '../components/common/Modal';

export const MyTrips: React.FC = () => {
  const { trips, deleteTrip } = useTrips();
  const navigate = useNavigate();
  const [filterTab, setFilterTab] = useState<'All' | 'Upcoming' | 'Ongoing' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalTripId, setDeleteModalTripId] = useState<string | null>(null);

  const filteredTrips = trips.filter((trip) => {
    const matchesTab = filterTab === 'All' || trip.status === filterTab;
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDeleteConfirm = () => {
    if (deleteModalTripId) {
      deleteTrip(deleteModalTripId);
      setDeleteModalTripId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & New Trip Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface">My Trips</h1>
          <p className="text-outline text-sm mt-1">Manage and review all your travel itineraries in one place.</p>
        </div>

        <button
          onClick={() => navigate('/trips/create')}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-dim hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Trip</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {(['All', 'Upcoming', 'Ongoing', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterTab === tab
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab === 'All' ? 'All Trips' : tab}
            </button>
          ))}
        </div>

        {/* Search & Filter Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trips..."
            className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-xs font-semibold text-on-surface hover:bg-surface-container-low">
            <Filter className="w-3.5 h-3.5 text-outline" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Trips Grid or Clean Empty State */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredTrips.map((trip) => {
            const isOngoing = trip.status === 'Ongoing';
            const isCompleted = trip.status === 'Completed';

            return (
              <div
                key={trip.id}
                className={`glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all group flex flex-col justify-between ${
                  isOngoing ? 'md:col-span-2' : ''
                }`}
              >
                {/* Image Banner */}
                <div className={`relative ${isOngoing ? 'h-56' : 'h-48'} overflow-hidden`}>
                  <img
                    src={trip.coverImage}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isOngoing
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : isCompleted
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-headline font-extrabold text-xl text-white drop-shadow">
                      {trip.title}
                    </h3>
                    <p className="text-xs text-white/90 flex items-center gap-1.5 mt-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-white/80" />
                      <span>{trip.startDate} - {trip.endDate}</span>
                    </p>
                  </div>
                </div>

                {/* Card Details Footer */}
                <div className="p-5 bg-surface-container-lowest/90 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <span className="text-outline uppercase text-[10px] font-bold block">
                        {isOngoing ? 'DESTINATIONS' : 'STOPS'}
                      </span>
                      <span className="font-extrabold text-sm text-on-surface">
                        {trip.destinations.length || 3}
                      </span>
                    </div>

                    <div>
                      <span className="text-outline uppercase text-[10px] font-bold block">
                        {isCompleted ? 'SPENT' : 'BUDGET'}
                      </span>
                      <span className="font-extrabold text-sm text-on-surface">
                        ${trip.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/trips/${trip.id}/plan`)}
                      className="p-2 rounded-xl bg-surface-container hover:bg-primary-container text-primary transition-colors"
                      title="Edit Plan"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/trips/${trip.id}`)}
                      className="p-2 rounded-xl bg-surface-container hover:bg-primary-container text-primary transition-colors"
                      title="View Itinerary"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModalTripId(trip.id)}
                      className="p-2 rounded-xl bg-surface-container hover:bg-error-container/40 text-error transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* CLEAN NEW USER EMPTY STATE */
        <div className="glass-card-elevated rounded-3xl p-12 text-center text-outline space-y-3">
          <div className="w-16 h-16 rounded-full bg-primary-container/40 flex items-center justify-center text-primary mx-auto">
            <Compass className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-headline font-bold text-lg text-on-surface">
            Your next adventure starts here!
          </h3>
          <p className="text-xs text-outline max-w-sm mx-auto">
            You don't have any trips planned yet. Start by creating a personalized multi-city itinerary or explore community trips.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/trips/create')}
              className="py-3 px-6 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-dim transition-all"
            >
              Plan Your First Trip
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteModalTripId}
        onClose={() => setDeleteModalTripId(null)}
        title="Delete Trip?"
      >
        <div className="space-y-4">
          <p className="text-sm text-on-surface-variant">
            Are you sure you want to delete this trip? This action cannot be undone and will remove all itinerary stops and budget items.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/40">
            <button
              onClick={() => setDeleteModalTripId(null)}
              className="px-4 py-2 rounded-xl border border-outline-variant text-xs font-semibold text-on-surface hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 rounded-xl bg-error text-on-error font-semibold text-xs hover:bg-error-dim shadow-sm"
            >
              Delete Trip
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
