import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Share2,
  Copy,
  Sun,
  DollarSign,
  MapPin,
  ExternalLink,
  Plane,
  Clock,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { mockCommunityTrips } from '../data/mockData';
import { useTrips } from '../context/TripContext';

export const SharedTrip: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { copyCommunityTrip } = useTrips();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const communityTrip = mockCommunityTrips[0]; // Kyoto Cherry Blossoms

  const handleCopyTrip = () => {
    const newTrip = copyCommunityTrip(communityTrip.id);
    setToastMsg(`Successfully copied "${communityTrip.title}" to your itinerary!`);
    setTimeout(() => {
      setToastMsg(null);
      if (newTrip) navigate(`/trips/${newTrip.id}/plan`);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 -mx-4 md:-mx-8 -mt-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Full-width Hero Banner matching media_1787377161250.jpg */}
      <div className="relative min-h-[340px] md:min-h-[400px] flex items-end p-6 md:p-12 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${communityTrip.coverImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/95 via-on-surface/50 to-transparent" />

        {/* Back Link Top Left */}
        <button
          onClick={() => navigate('/community')}
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold hover:bg-black/60 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Community</span>
        </button>

        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/30">
                PUBLIC ITINERARY
              </span>
              <span className="text-xs text-white/80 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {communityTrip.duration}
              </span>
            </div>

            <h1 className="font-headline font-extrabold text-3xl md:text-5xl text-white drop-shadow-md">
              {communityTrip.title}
            </h1>

            <p className="text-white/90 text-sm md:text-base font-light leading-relaxed">
              {communityTrip.subtitle}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <img
                src={communityTrip.creatorAvatar}
                alt={communityTrip.creatorName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/60"
              />
              <div>
                <h4 className="font-bold text-xs text-white">{communityTrip.creatorName}</h4>
                <p className="text-[11px] text-white/70 font-medium">{communityTrip.creatorBadge}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setToastMsg('Public itinerary link copied to clipboard!');
                setTimeout(() => setToastMsg(null), 3000);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold text-xs border border-white/40 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            <button
              onClick={handleCopyTrip}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-on-primary font-extrabold text-xs shadow-xl hover:bg-primary-dim transition-all active:scale-95"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Trip</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Workspace (2 Columns) */}
      <div className="px-6 md:px-12 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Day-by-Day Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Day 1 */}
          <div className="space-y-4 relative pl-6 border-l-2 border-primary/20 ml-2">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />

            <div>
              <h3 className="font-headline font-extrabold text-xl text-on-surface">
                Day 1: Arrival & Eastern Kyoto
              </h3>
              <p className="text-xs text-outline mt-0.5 font-medium">
                March 28 • Focus: Settling in and iconic views
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Activity Item 1 */}
              <div className="glass-card rounded-2xl p-5 border border-outline-variant/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-container/40 flex items-center justify-center text-primary">
                      <Plane className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-on-surface">
                      Arrive at Kansai International Airport (KIX)
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-outline">10:00 AM</span>
                </div>
                <p className="text-xs text-outline leading-relaxed pl-12">
                  Take the Haruka Express directly to Kyoto Station. Approximately 75 minutes.
                </p>
              </div>

              {/* Activity Item 2 */}
              <div className="glass-card rounded-2xl p-5 border border-outline-variant/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-on-surface">Kiyomizu-dera Temple</h4>
                  <span className="text-xs font-semibold text-outline">3:00 PM</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80"
                    alt="Kiyomizu-dera"
                    className="w-full sm:w-36 h-24 rounded-xl object-cover"
                  />
                  <div className="space-y-2 flex-1">
                    <p className="text-xs text-outline leading-relaxed">
                      Explore the iconic wooden stage offering panoramic views of the city amidst sakura trees. A must-see in Higashiyama.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-semibold">
                        Sightseeing
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-semibold">
                        Tickets Req.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="space-y-4 relative pl-6 border-l-2 border-primary/20 ml-2">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-surface-container-high border-2 border-outline" />

            <div>
              <h3 className="font-headline font-extrabold text-xl text-on-surface">
                Day 2: Arashiyama & Bamboo
              </h3>
              <p className="text-xs text-outline mt-0.5 font-medium">
                March 29 • Focus: Nature and tranquility
              </p>
            </div>

            <div className="border border-dashed border-outline-variant rounded-2xl p-4 text-center text-xs text-outline bg-surface-container-lowest/50">
              ... More activities planned for this day.
            </div>
          </div>
        </div>

        {/* Right Column: Destination Map Card & Info Widgets (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Map Preview Widget matching screenshot */}
          <div className="glass-card-elevated rounded-3xl overflow-hidden shadow-lg border border-outline-variant/30 relative">
            <div className="h-44 bg-slate-200 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                alt="map preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider block text-white/80">
                    DESTINATION
                  </span>
                  <h4 className="font-headline font-bold text-lg text-white">Kyoto, Japan</h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Season & Budget Widgets */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 text-center border border-outline-variant/40 space-y-1">
              <Sun className="w-6 h-6 text-amber-500 mx-auto" />
              <span className="text-[10px] font-bold text-outline uppercase block">BEST SEASON</span>
              <h4 className="font-bold text-base text-on-surface">Spring</h4>
            </div>

            <div className="glass-card rounded-2xl p-5 text-center border border-outline-variant/40 space-y-1">
              <DollarSign className="w-6 h-6 text-emerald-600 mx-auto" />
              <span className="text-[10px] font-bold text-outline uppercase block">BUDGET</span>
              <h4 className="font-bold text-base text-on-surface">Moderate</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
