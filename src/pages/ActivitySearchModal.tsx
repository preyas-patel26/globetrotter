import React, { useState } from 'react';
import { Search, Star, Clock, DollarSign, Plus, MapPin, CheckCircle } from 'lucide-react';
import { mockKyotoActivities } from '../data/mockData';
import { ActivityCategory } from '../types';
import { useTrips } from '../context/TripContext';

export const ActivitySearchModal: React.FC = () => {
  const { addActivityToStop, trips } = useTrips();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ['All', 'Culture', 'Food', 'Adventure', 'Nature'];

  const filteredActivities = mockKyotoActivities.filter((act) => {
    const matchesCat = activeCategory === 'All' || act.category === activeCategory;
    const matchesQuery = act.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleAdd = (activityName: string) => {
    const activeTrip = trips[0];
    if (activeTrip && activeTrip.destinations.length > 0) {
      const stopId = activeTrip.destinations[0].id;
      addActivityToStop(activeTrip.id, stopId, 1, {
        id: `act_${Date.now()}`,
        name: activityName,
        description: 'Scheduled activity in Kyoto.',
        category: 'Culture',
        time: '11:00 AM',
        duration: '2h',
        estimatedCost: 45,
      });
    }
    setToastMessage(`"${activityName}" added to your itinerary!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner Header matching media_1787376659832.png */}
      <div className="relative rounded-3xl overflow-hidden min-h-[220px] flex items-center p-8 md:p-12 text-on-surface">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface/80 to-transparent" />

        <div className="relative z-10 max-w-xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-extrabold text-xs inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Kyoto, Japan
          </span>

          <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface">
            Discover Kyoto
          </h1>

          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
            Immerse yourself in ancient traditions, serene gardens, and modern delights.
          </p>
        </div>
      </div>

      {/* Category Pills & Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-outline absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kyoto activities..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Activity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={act.image}
                alt={act.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-extrabold uppercase tracking-wider text-on-surface">
                  {act.category}
                </span>
              </div>
            </div>

            <div className="p-5 bg-surface-container-lowest space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-headline font-bold text-base text-on-surface">
                    {act.name}
                  </h3>
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {act.rating}
                  </span>
                </div>

                <p className="text-xs text-outline leading-relaxed mt-1 line-clamp-2">
                  {act.description}
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-outline font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {act.duration}
                  </span>
                  <span>{act.estimatedCost === 0 ? 'Free' : `$${act.estimatedCost}`}</span>
                </div>

                <button
                  onClick={() => handleAdd(act.name)}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs hover:bg-primary-fixed-dim transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
