import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus } from 'lucide-react';
import { useTrips } from '../context/TripContext';
import { useNavigate } from 'react-router-dom';

export const CalendarView: React.FC = () => {
  const { trips } = useTrips();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState('October 2024');
  const [selectedDay, setSelectedDay] = useState<number>(15);

  const activeTrip = trips[0]; // Kyoto Spring Awakening / Rajasthan Explorer

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Mock events mapping for October 2024
  const tripEvents: Record<number, { title: string; time: string; cost: number; city: string }[]> = {
    12: [{ title: 'Tokyo Haneda Airport Arrival', time: '10:00 AM', cost: 35, city: 'Tokyo' }],
    13: [{ title: 'Shibuya Crossing & Dinner', time: '06:00 PM', cost: 85, city: 'Tokyo' }],
    15: [
      { title: 'Arrival at Jaipur International Airport', time: '10:00 AM', cost: 120, city: 'Jaipur' },
      { title: 'Check-in: The Raj Palace', time: '11:30 AM', cost: 450, city: 'Jaipur' },
      { title: 'Theme Park Day', time: '09:00 AM', cost: 320, city: 'Tokyo' },
    ],
    16: [
      { title: 'Amber Fort Guided Tour', time: '09:30 AM', cost: 25, city: 'Jaipur' },
      { title: 'Hawa Mahal Photo Stroll', time: '02:00 PM', cost: 20, city: 'Jaipur' },
    ],
    18: [{ title: 'Bullet Train to Kyoto & Tea Ceremony', time: '10:00 AM', cost: 130, city: 'Kyoto' }],
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface">
            Trip Calendar
          </h1>
          <p className="text-outline text-sm mt-0.5">
            Visualize scheduled stops and daily activities on your interactive timeline.
          </p>
        </div>

        <button
          onClick={() => navigate('/trips/create')}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-dim transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Scheduled Event</span>
        </button>
      </div>

      {/* Main Grid: Calendar Month Grid (Left 8 cols) + Day Activity Detail Drawer (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Calendar Card (8 cols) matching wireframe Screen 11 */}
        <div className="lg:col-span-8 glass-card-elevated rounded-3xl p-6 md:p-8 shadow-md border border-outline-variant/30 space-y-6">
          {/* Calendar Month Header Controls */}
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-xl text-on-surface flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span>{currentMonth}</span>
            </h2>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl border border-outline-variant hover:bg-surface-container-low text-on-surface">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl border border-outline-variant hover:bg-surface-container-low text-on-surface">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-outline uppercase tracking-wider">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const hasEvents = !!tripEvents[day];
              const isSelected = selectedDay === day;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[72px] p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary bg-primary-container/30 ring-2 ring-primary/40 shadow-sm'
                      : hasEvents
                      ? 'border-primary/30 bg-surface-container-low/80 hover:border-primary'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-primary' : 'text-on-surface'
                    }`}
                  >
                    {day}
                  </span>

                  {hasEvents && (
                    <div className="space-y-1">
                      {tripEvents[day].slice(0, 2).map((ev, idx) => (
                        <div
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-semibold truncate"
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Day Activity Details Panel (4 cols) */}
        <div className="lg:col-span-4 glass-card-elevated rounded-3xl p-6 shadow-md border border-outline-variant/30 space-y-6">
          <div className="pb-3 border-b border-outline-variant/40">
            <h3 className="font-headline font-bold text-lg text-on-surface">
              Schedule for Oct {selectedDay}, 2024
            </h3>
            <p className="text-xs text-outline mt-0.5">
              {tripEvents[selectedDay]?.length || 0} scheduled activities
            </p>
          </div>

          {tripEvents[selectedDay] && tripEvents[selectedDay].length > 0 ? (
            <div className="space-y-3">
              {tripEvents[selectedDay].map((event, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 space-y-2 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded bg-primary-container/40">
                      {event.city}
                    </span>
                    <span className="text-xs font-semibold text-outline flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-on-surface">{event.title}</h4>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30 text-xs">
                    <span className="text-outline font-medium">Est. Cost</span>
                    <span className="font-bold text-on-surface">${event.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-outline space-y-2">
              <CalendarIcon className="w-8 h-8 text-outline mx-auto opacity-50" />
              <p>No activities scheduled for this date.</p>
              <button
                onClick={() => navigate('/trips/trip_rajasthan/plan')}
                className="text-xs font-bold text-primary hover:underline block pt-2"
              >
                Go to Itinerary Builder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
