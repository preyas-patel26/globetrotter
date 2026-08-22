import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Plus, MapPin, ChevronDown, CheckCircle } from 'lucide-react';
import { useTrips } from '../context/TripContext';
import { DestinationStop } from '../types';

export const Discovery: React.FC = () => {
  const { destinations, addStopToTrip, trips } = useTrips();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCost, setSelectedCost] = useState('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.city.toLowerCase().includes(query.toLowerCase()) ||
      dest.country.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
    const matchesCost = selectedCost === 'All' || dest.costLevel === selectedCost;
    return matchesSearch && matchesRegion && matchesCost;
  });

  const handleAddToActiveTrip = (dest: DestinationStop) => {
    const activeTripId = trips[0]?.id || 'trip_rajasthan';
    addStopToTrip(activeTripId, dest);
    setToastMsg(`${dest.city} added to your trip itinerary!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div>
        <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface">
          Discover your next destination
        </h1>
        <p className="text-outline text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
          Explore curated cities across the globe. Find the perfect blend of culture, cost, and climate for your premium travel experience.
        </p>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="glass-card-elevated rounded-3xl p-4 md:p-6 shadow-md border border-outline-variant/30 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-outline absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container-lowest border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-surface-container-lowest border border-outline-variant text-xs font-semibold text-on-surface focus:outline-none"
          >
            <option value="All">Region: All</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>

          {/* Cost Dropdown */}
          <select
            value={selectedCost}
            onChange={(e) => setSelectedCost(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-surface-container-lowest border border-outline-variant text-xs font-semibold text-on-surface focus:outline-none"
          >
            <option value="All">Cost: All</option>
            <option value="Low">Low</option>
            <option value="Med">Medium</option>
            <option value="High">High</option>
          </select>

          <button className="py-3 px-6 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-dim transition-all">
            Search
          </button>
        </div>
      </div>

      {/* Destinations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all group flex flex-col justify-between"
          >
            {/* Image Header */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Rating Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-extrabold text-on-surface flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{dest.popularityRating || 4.8}</span>
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 bg-surface-container-lowest space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-headline font-extrabold text-xl text-on-surface">
                    {dest.city}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      dest.costLevel === 'High'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {dest.costLevel || 'Med'}
                  </span>
                </div>

                <p className="text-xs text-outline flex items-center gap-1 mt-0.5 font-medium">
                  <MapPin className="w-3 h-3 text-outline" />
                  <span>{dest.country}</span>
                </p>

                <p className="text-xs text-on-surface-variant leading-relaxed mt-2 line-clamp-3">
                  {dest.description}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-on-surface">
                    Est. ${dest.estCostPerDay || 200}
                  </span>
                  <span className="text-[11px] text-outline font-medium"> / day</span>
                </div>

                <button
                  onClick={() => handleAddToActiveTrip(dest)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-surface-container hover:bg-primary-container text-primary font-bold text-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Trip</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
