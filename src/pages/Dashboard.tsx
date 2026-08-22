import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Sparkles, ArrowRight, Calendar as CalendarIcon, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { trips, destinations } = useTrips();
  const navigate = useNavigate();

  const upcomingTrips = trips.filter((t) => t.status === 'Upcoming' || t.status === 'Ongoing');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-outline-variant/40">
        <div>
          <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface flex items-center gap-2">
            Good morning, {user?.firstName || 'Explorer'} 👋
          </h1>
          <p className="text-outline text-sm mt-1">Where is your next adventure taking you?</p>
        </div>

        <button
          onClick={() => navigate('/trips/create')}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-dim hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Plan a New Trip</span>
        </button>
      </div>

      {/* Main Grid: Upcoming Trips (Left 2/3) + 2024 Travel Spend (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Upcoming Trips */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-lg text-on-surface">Upcoming Trips</h2>
            <Link to="/trips" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.slice(0, 2).map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/trips/${trip.id}/plan`)}
                  className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-headline font-bold text-base text-white drop-shadow">
                        {trip.title}
                      </h3>
                      <p className="text-xs text-white/90 flex items-center gap-1 mt-0.5">
                        <CalendarIcon className="w-3 h-3 text-white/80" />
                        <span>{trip.startDate} - {trip.endDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 bg-surface-container-lowest/90">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-outline uppercase font-semibold tracking-wider text-[10px]">
                        Budget Status
                      </span>
                      <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {trip.status === 'Ongoing' ? 'On Track' : 'Planning'}
                      </span>
                    </div>

                    {/* Progress indicator */}
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full w-[65%]" />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-medium">
                        Relaxation
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-medium">
                        Coastal
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 glass-card rounded-2xl p-8 text-center text-outline">
                <Compass className="w-10 h-10 text-outline mx-auto mb-2 opacity-60" />
                <p className="font-semibold text-sm">No upcoming trips scheduled yet.</p>
                <button
                  onClick={() => navigate('/trips/create')}
                  className="mt-3 text-xs text-primary font-bold hover:underline"
                >
                  Create your first trip now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 2024 Travel Spend Card */}
        <div className="glass-card-elevated rounded-3xl p-6 flex flex-col justify-between shadow-lg border border-outline-variant/40">
          <div>
            <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">
              2024 Travel Spend
            </span>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-[11px] text-outline font-semibold">TOTAL SPENT</span>
              <h3 className="font-headline font-extrabold text-3xl text-on-surface">$8,450</h3>
            </div>

            {/* Spending Breakdown Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Flights
                  </span>
                  <span className="text-on-surface">$3,200</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[70%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    Stay
                  </span>
                  <span className="text-on-surface">$4,100</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    Activities
                  </span>
                  <span className="text-on-surface">$1,150</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full w-[40%]" />
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/trips/trip_kyoto_spring/budget"
            className="mt-8 pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs font-semibold text-primary hover:underline group"
          >
            <span>View Detailed Report</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Recommended for You Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-headline font-bold text-lg text-on-surface">Recommended for You</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {destinations.slice(3, 6).map((dest) => (
            <div
              key={dest.id}
              onClick={() => navigate(`/discovery?city=${encodeURIComponent(dest.city)}`)}
              className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all cursor-pointer group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <h4 className="font-headline font-bold text-lg text-white drop-shadow">
                    {dest.city}
                  </h4>
                  <p className="text-xs text-white/80 font-medium">{dest.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
