import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Share2,
  Save,
  Plus,
  MoreHorizontal,
  Plane,
  Building,
  MapPin,
  Calendar as CalendarIcon,
  Trash2,
  DollarSign,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useTrips } from '../context/TripContext';
import { Modal } from '../components/common/Modal';
import { Activity, DestinationStop } from '../types';

export const ItineraryBuilder: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const {
    getTrip,
    addStopToTrip,
    removeStopFromTrip,
    addActivityToStop,
    removeActivityFromStop,
    updateActivityCost,
    destinations,
  } = useTrips();

  const trip = getTrip(tripId || 'trip_rajasthan') || getTrip('trip_rajasthan');

  // Modals state
  const [showAddStopModal, setShowAddStopModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState<{
    stopId: string;
    dayNumber: number;
  } | null>(null);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [editingCostId, setEditingCostId] = useState<string | null>(null);
  const [tempCostValue, setTempCostValue] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!trip) {
    return <div className="p-8 text-center text-outline">Trip not found.</div>;
  }

  // Calculate live total cost from all activities
  const totalCostFromActivities = trip.destinations.reduce((totalStop, stop) => {
    return (
      totalStop +
      stop.days.reduce((totalDay, day) => {
        return (
          totalDay +
          day.activities.reduce((totalAct, act) => totalAct + (act.estimatedCost || 0), 0)
        );
      }, 0)
    );
  }, 0);

  const displayEstBudget = trip.budget || totalCostFromActivities || 3250;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddStop = (dest: DestinationStop) => {
    addStopToTrip(trip.id, dest);
    setShowAddStopModal(false);
    showToast(`${dest.city} added to your trip.`);
  };

  const handleAddActivity = (
    stopId: string,
    dayNumber: number,
    activitySample: Partial<Activity>
  ) => {
    const newAct: Activity = {
      id: `act_${Date.now()}`,
      name: activitySample.name || 'City Sightseeing Tour',
      description: activitySample.description || 'Guided landmark tour.',
      category: activitySample.category || 'Culture',
      time: activitySample.time || '10:00 AM',
      duration: activitySample.duration || '2h',
      estimatedCost: activitySample.estimatedCost || 30,
    };
    addActivityToStop(trip.id, stopId, dayNumber, newAct);
    setShowAddActivityModal(null);
    showToast(`Activity "${newAct.name}" added.`);
  };

  const handleCostSave = (stopId: string, dayNumber: number, actId: string) => {
    updateActivityCost(trip.id, stopId, dayNumber, actId, tempCostValue);
    setEditingCostId(null);
    showToast(`Activity cost updated to $${tempCostValue}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Banner Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 border border-outline-variant/40 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="glass-card-elevated rounded-3xl p-6 md:p-8 shadow-xl border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
              {trip.status}
            </span>
            <span className="text-xs text-outline font-medium flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5 text-outline" />
              <span>{trip.startDate} - {trip.endDate}</span>
            </span>
          </div>

          <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface">
            {trip.title}
          </h1>

          <p className="text-xs text-outline font-medium mt-1">
            10 Days • {trip.destinations.length || 3} Destinations • 2 Travelers
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-extrabold text-outline uppercase tracking-wider block">
              EST. BUDGET
            </span>
            <span className="font-headline font-extrabold text-2xl text-primary">
              ${displayEstBudget.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/shared/${trip.id}`)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-xs font-bold text-on-surface transition-colors"
            >
              <Share2 className="w-4 h-4 text-outline" />
              <span>Share</span>
            </button>
            <button
              onClick={() => {
                showToast('Itinerary saved successfully!');
                navigate(`/trips/${trip.id}`);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-dim transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Itinerary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Timeline Stops Workspace */}
      <div className="space-y-6">
        {trip.destinations.map((stop) => (
          <div
            key={stop.id}
            className="glass-card rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-outline-variant/30 relative"
          >
            {/* City Stop Title */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/40 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />
                <div>
                  <h2 className="font-headline font-bold text-xl text-on-surface flex items-center gap-2">
                    <span>{stop.city}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-semibold">
                      {stop.nights || 3} Nights
                    </span>
                  </h2>
                  <p className="text-xs text-outline mt-0.5">
                    {stop.startDate} - {stop.endDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeStopFromTrip(trip.id, stop.id)}
                  className="p-2 rounded-xl text-outline hover:text-error hover:bg-error-container/30 transition-colors"
                  title="Remove Stop"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl text-outline hover:bg-surface-container-low">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days Timeline Layout */}
            <div className="space-y-6 pl-4 border-l-2 border-primary/20 ml-2">
              {stop.days.map((day) => (
                <div key={day.dayNumber} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary-container border-2 border-primary" />

                  {/* Day Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-headline font-bold text-sm text-on-surface">
                      Day {day.dayNumber}: {day.date}
                    </h3>

                    <button
                      onClick={() =>
                        setShowAddActivityModal({ stopId: stop.id, dayNumber: day.dayNumber })
                      }
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Activity</span>
                    </button>
                  </div>

                  {/* Activities List */}
                  {day.activities.length > 0 ? (
                    <div className="space-y-3">
                      {day.activities.map((act) => {
                        const CategoryIcon =
                          act.category === 'Transport'
                            ? Plane
                            : act.category === 'Hotel'
                            ? Building
                            : MapPin;

                        return (
                          <div
                            key={act.id}
                            className="bg-surface-container-lowest/90 border border-outline-variant/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-primary/40 transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl bg-primary-container/40 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                <CategoryIcon className="w-4 h-4 text-primary" />
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-outline">
                                    {act.time}
                                  </span>
                                  <h4 className="font-bold text-sm text-on-surface">
                                    {act.name}
                                  </h4>
                                </div>
                                <p className="text-xs text-outline mt-0.5">{act.description}</p>
                              </div>
                            </div>

                            {/* Cost Display & Inline Edit */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-outline-variant/30">
                              {editingCostId === act.id ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs text-outline">$</span>
                                  <input
                                    type="number"
                                    value={tempCostValue}
                                    onChange={(e) => setTempCostValue(Number(e.target.value))}
                                    className="w-16 px-2 py-1 text-xs rounded border border-primary focus:outline-none"
                                  />
                                  <button
                                    onClick={() =>
                                      handleCostSave(stop.id, day.dayNumber, act.id)
                                    }
                                    className="text-[11px] px-2 py-1 bg-primary text-white rounded font-bold"
                                  >
                                    Save
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    setEditingCostId(act.id);
                                    setTempCostValue(act.estimatedCost || 0);
                                  }}
                                  className="text-right cursor-pointer hover:opacity-80 transition-opacity"
                                  title="Click to edit cost"
                                >
                                  <span className="text-[10px] text-outline font-bold block uppercase">
                                    EST. COST
                                  </span>
                                  <span className="font-bold text-sm text-on-surface">
                                    ${act.estimatedCost || 0}
                                  </span>
                                </div>
                              )}

                              <button
                                onClick={() =>
                                  removeActivityFromStop(trip.id, stop.id, day.dayNumber, act.id)
                                }
                                className="p-1.5 text-outline hover:text-error rounded-lg"
                                title="Delete activity"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="border border-dashed border-outline-variant rounded-2xl p-4 text-center text-xs text-outline bg-surface-container-lowest/50">
                      Day {day.dayNumber}: Empty — Click "+ Add Activity" to schedule sights or meals.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* "+ Add Another Stop" Dashed Card */}
        <div
          onClick={() => setShowAddStopModal(true)}
          className="border-2 border-dashed border-outline-variant hover:border-primary rounded-3xl p-8 text-center cursor-pointer transition-all bg-surface-container-lowest/50 hover:bg-surface-container-lowest shadow-sm group"
        >
          <div className="w-12 h-12 rounded-full bg-primary-container/50 flex items-center justify-center text-primary mx-auto mb-3 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-headline font-bold text-base text-on-surface">Add Another Stop</h3>
          <p className="text-xs text-outline mt-0.5">Continue your journey across new cities</p>
        </div>
      </div>

      {/* Add City Stop Modal */}
      <Modal
        isOpen={showAddStopModal}
        onClose={() => setShowAddStopModal(false)}
        title="Add a Destination Stop"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={citySearchQuery}
            onChange={(e) => setCitySearchQuery(e.target.value)}
            placeholder="Search city (e.g. Kyoto, Paris, Tokyo, Udaipur)..."
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
            {destinations
              .filter((d) => d.city.toLowerCase().includes(citySearchQuery.toLowerCase()))
              .map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => handleAddStop(dest)}
                  className="glass-card rounded-2xl p-3 border border-outline-variant hover:border-primary cursor-pointer flex items-center gap-3 transition-all"
                >
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">{dest.city}</h4>
                    <p className="text-xs text-outline">{dest.country}</p>
                    <span className="text-[10px] text-primary font-semibold mt-1 block">
                      Est. ${dest.estCostPerDay}/day
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>

      {/* Add Activity Modal */}
      <Modal
        isOpen={!!showAddActivityModal}
        onClose={() => setShowAddActivityModal(null)}
        title="Add Activity to Day"
      >
        <div className="space-y-4">
          <p className="text-xs text-outline">Select a quick preset activity or custom experience:</p>
          <div className="space-y-2">
            {[
              { name: 'Amber Fort Sightseeing', category: 'Culture', cost: 25, duration: '3h', time: '09:30 AM' },
              { name: 'Traditional Dinner & Cultural Dance', category: 'Food', cost: 40, duration: '2h', time: '07:00 PM' },
              { name: 'City Palace Museum Tour', category: 'Culture', cost: 20, duration: '2.5h', time: '02:00 PM' },
              { name: 'Hot Air Balloon Ride', category: 'Adventure', cost: 150, duration: '2h', time: '06:00 AM' },
            ].map((sample, i) => (
              <div
                key={i}
                onClick={() =>
                  showAddActivityModal &&
                  handleAddActivity(
                    showAddActivityModal.stopId,
                    showAddActivityModal.dayNumber,
                    sample as any
                  )
                }
                className="p-3 rounded-xl border border-outline-variant hover:bg-surface-container-low cursor-pointer flex justify-between items-center text-xs"
              >
                <div>
                  <h4 className="font-bold text-on-surface">{sample.name}</h4>
                  <p className="text-outline">{sample.category} • {sample.duration} at {sample.time}</p>
                </div>
                <span className="font-bold text-primary">${sample.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
