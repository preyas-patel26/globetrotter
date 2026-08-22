import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock, DollarSign, Copy, Eye, CheckCircle } from 'lucide-react';
import { mockCommunityTrips } from '../data/mockData';
import { useTrips } from '../context/TripContext';

export const Community: React.FC = () => {
  const navigate = useNavigate();
  const { copyCommunityTrip } = useTrips();
  const [activeTab, setActiveTab] = useState('Popular');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const tabs = ['Popular', 'Recent', 'Budget Friendly', 'Adventure', 'Nature'];

  const handleCopy = (tripId: string, title: string) => {
    const newTrip = copyCommunityTrip(tripId);
    setToastMsg(`Copied "${title}" to your editable itineraries!`);
    setTimeout(() => setToastMsg(null), 3000);
    if (newTrip) {
      setTimeout(() => navigate(`/trips/${newTrip.id}/plan`), 1000);
    }
  };

  const featuredTrip = mockCommunityTrips.find((t) => t.featured) || mockCommunityTrips[1];
  const regularTrips = mockCommunityTrips.filter((t) => !t.featured);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface">
          Discover Inspiration
        </h1>
        <p className="text-outline text-sm md:text-base mt-1">
          Explore premium itineraries crafted by our community of global travelers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regularTrips.map((trip) => (
          <div
            key={trip.id}
            className="glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all group flex flex-col justify-between"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={trip.coverImage}
                alt={trip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-extrabold text-on-surface flex items-center gap-1 shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>{(trip.likesCount / 1000).toFixed(1)}k</span>
                </span>
              </div>
            </div>

            <div className="p-5 bg-surface-container-lowest space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-headline font-extrabold text-lg text-on-surface leading-snug">
                  {trip.title}
                </h3>
                <p className="text-xs text-outline leading-relaxed mt-1 line-clamp-2">
                  {trip.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/40 space-y-3">
                <div className="flex items-center justify-between text-xs text-outline font-medium">
                  <div className="flex items-center gap-2">
                    <img
                      src={trip.creatorAvatar}
                      alt={trip.creatorName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-semibold text-on-surface">{trip.creatorName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {trip.duration}
                    </span>
                    <span className="font-bold text-on-surface">Est. {trip.estBudget}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigate('/shared/shared_kyoto_sakura')}
                    className="flex-1 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-outline" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleCopy(trip.id, trip.title)}
                    className="flex-1 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-sm hover:bg-primary-dim transition-colors flex items-center justify-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Trip</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FEATURED BANNER CARD matching media_1787376963896.png */}
      <div className="glass-card-elevated rounded-3xl overflow-hidden shadow-xl border border-outline-variant/30 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 relative h-64 lg:h-auto overflow-hidden">
          <img
            src={featuredTrip.coverImage}
            alt={featuredTrip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-extrabold text-xs shadow-md">
              Featured
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6 bg-surface-container-lowest">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {featuredTrip.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-headline font-extrabold text-2xl text-on-surface">
              {featuredTrip.title}
            </h2>

            <p className="text-xs md:text-sm text-outline leading-relaxed">
              {featuredTrip.subtitle}
            </p>
          </div>

          <div className="pt-4 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={featuredTrip.creatorAvatar}
                alt={featuredTrip.creatorName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-xs text-on-surface">{featuredTrip.creatorName}</h4>
                <p className="text-[11px] text-outline font-medium">{featuredTrip.creatorBadge}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div>
                <span className="text-[10px] text-outline font-bold uppercase block">DURATION</span>
                <span className="font-extrabold text-on-surface">{featuredTrip.duration}</span>
              </div>

              <div>
                <span className="text-[10px] text-outline font-bold uppercase block">COST</span>
                <span className="font-extrabold text-primary">{featuredTrip.estBudget}</span>
              </div>

              <button
                onClick={() => handleCopy(featuredTrip.id, featuredTrip.title)}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-dim transition-all"
              >
                Copy Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
