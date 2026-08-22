import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trip, DestinationStop, Activity, ExpenseItem, PackingItem } from '../types';
import { mockTripsList, mockDestinationsList, mockCommunityTrips } from '../data/mockData';

interface TripContextType {
  trips: Trip[];
  destinations: DestinationStop[];
  activeTripId: string | null;
  setActiveTripId: (id: string | null) => void;
  getTrip: (id: string) => Trip | undefined;
  createTrip: (tripData: Partial<Trip>) => Trip;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addStopToTrip: (tripId: string, destination: DestinationStop) => void;
  removeStopFromTrip: (tripId: string, stopId: string) => void;
  addActivityToStop: (tripId: string, stopId: string, dayNumber: number, activity: Activity) => void;
  removeActivityFromStop: (tripId: string, stopId: string, dayNumber: number, activityId: string) => void;
  updateActivityCost: (tripId: string, stopId: string, dayNumber: number, activityId: string, newCost: number) => void;
  addExpenseToTrip: (tripId: string, expense: Omit<ExpenseItem, 'id'>) => void;
  copyCommunityTrip: (communityTripId: string) => Trip | undefined;
  togglePackingItem: (tripId: string, itemId: string) => void;
  addPackingItem: (tripId: string, title: string, category: PackingItem['category']) => void;
  addAdminDestination: (newDest: Omit<DestinationStop, 'id' | 'days'>) => void;
  updateDestinationEstCost: (destId: string, newCostPerDay: number) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const defaultPackingList: PackingItem[] = [
  { id: 'p1', title: 'Passport & Visas', category: 'Documents', packed: true },
  { id: 'p2', title: 'Travel Insurance Documents', category: 'Documents', packed: true },
  { id: 'p3', title: 'Universal Power Adapter', category: 'Electronics', packed: false },
  { id: 'p4', title: 'Camera & Charger', category: 'Electronics', packed: false },
  { id: 'p5', title: 'Light Jacket / Layering Clothes', category: 'Clothing', packed: true },
  { id: 'p6', title: 'Comfortable Walking Shoes', category: 'Clothing', packed: true },
  { id: 'p7', title: 'First Aid & Prescription Meds', category: 'Essentials', packed: false },
];

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-load sample dummy trips for immediate testing!
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('globetrotter_user_trips');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? parsed : mockTripsList;
    }
    return mockTripsList;
  });

  const [destinations, setDestinations] = useState<DestinationStop[]>(() => {
    const saved = localStorage.getItem('globetrotter_master_destinations');
    return saved ? JSON.parse(saved) : mockDestinationsList;
  });

  const [activeTripId, setActiveTripId] = useState<string | null>('trip_rajasthan');

  useEffect(() => {
    localStorage.setItem('globetrotter_user_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('globetrotter_master_destinations', JSON.stringify(destinations));
  }, [destinations]);

  const getTrip = (id: string) => {
    return trips.find((t) => t.id === id);
  };

  const createTrip = (tripData: Partial<Trip>): Trip => {
    const newTrip: Trip = {
      id: `trip_${Date.now()}`,
      userId: 'usr_active',
      title: tripData.title || 'My Summer Adventure',
      description: tripData.description || 'Custom planned travel itinerary',
      coverImage: tripData.coverImage || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      startDate: tripData.startDate || '2024-10-15',
      endDate: tripData.endDate || '2024-10-25',
      budget: tripData.budget || 3000,
      status: 'Draft',
      isPublic: false,
      destinations: tripData.destinations || [],
      customExpenses: [],
      packingList: defaultPackingList,
      currency: 'USD',
    };
    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    return newTrip;
  };

  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
    if (activeTripId === id) {
      setActiveTripId(null);
    }
  };

  const addStopToTrip = (tripId: string, destination: DestinationStop) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const newStop: DestinationStop = {
          ...destination,
          id: `stop_${Date.now()}`,
          weatherForecast: destination.weatherForecast || {
            temp: '24°C',
            condition: 'Sunny',
            icon: '☀️',
          },
          days: [
            {
              dayNumber: 1,
              date: destination.startDate || t.startDate,
              title: `Day 1: ${destination.city} Exploration`,
              activities: [],
            },
            {
              dayNumber: 2,
              date: destination.endDate || t.endDate,
              title: `Day 2: ${destination.city} Highlights`,
              activities: [],
            },
          ],
        };
        return {
          ...t,
          destinations: [...t.destinations, newStop],
        };
      })
    );
  };

  const removeStopFromTrip = (tripId: string, stopId: string) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        return {
          ...t,
          destinations: t.destinations.filter((d) => d.id !== stopId),
        };
      })
    );
  };

  const addActivityToStop = (
    tripId: string,
    stopId: string,
    dayNumber: number,
    activity: Activity
  ) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const updatedDestinations = t.destinations.map((stop) => {
          if (stop.id !== stopId) return stop;
          const updatedDays = stop.days.map((day) => {
            if (day.dayNumber !== dayNumber) return day;
            return {
              ...day,
              activities: [...day.activities, { ...activity, id: `act_${Date.now()}` }],
            };
          });
          return { ...stop, days: updatedDays };
        });
        return { ...t, destinations: updatedDestinations };
      })
    );
  };

  const removeActivityFromStop = (
    tripId: string,
    stopId: string,
    dayNumber: number,
    activityId: string
  ) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const updatedDestinations = t.destinations.map((stop) => {
          if (stop.id !== stopId) return stop;
          const updatedDays = stop.days.map((day) => {
            if (day.dayNumber !== dayNumber) return day;
            return {
              ...day,
              activities: day.activities.filter((a) => a.id !== activityId),
            };
          });
          return { ...stop, days: updatedDays };
        });
        return { ...t, destinations: updatedDestinations };
      })
    );
  };

  const updateActivityCost = (
    tripId: string,
    stopId: string,
    dayNumber: number,
    activityId: string,
    newCost: number
  ) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const updatedDestinations = t.destinations.map((stop) => {
          if (stop.id !== stopId) return stop;
          const updatedDays = stop.days.map((day) => {
            if (day.dayNumber !== dayNumber) return day;
            const updatedActivities = day.activities.map((act) => {
              if (act.id !== activityId) return act;
              return { ...act, estimatedCost: newCost };
            });
            return { ...day, activities: updatedActivities };
          });
          return { ...stop, days: updatedDays };
        });
        return { ...t, destinations: updatedDestinations };
      })
    );
  };

  const addExpenseToTrip = (tripId: string, expense: Omit<ExpenseItem, 'id'>) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const newExpense: ExpenseItem = {
          ...expense,
          id: `exp_${Date.now()}`,
        };
        return {
          ...t,
          customExpenses: [...(t.customExpenses || []), newExpense],
        };
      })
    );
  };

  const copyCommunityTrip = (communityTripId: string): Trip | undefined => {
    const found = mockCommunityTrips.find((c) => c.id === communityTripId);
    if (!found) return undefined;

    const newTrip: Trip = {
      id: `trip_copied_${Date.now()}`,
      userId: 'usr_active',
      title: `${found.title} (Copy)`,
      description: found.subtitle,
      coverImage: found.coverImage,
      startDate: '2024-11-01',
      endDate: '2024-11-06',
      budget: parseInt(found.estBudget.replace(/[^0-9]/g, '')) || 3500,
      status: 'Upcoming',
      isPublic: false,
      destinations: destinations.slice(0, 2),
      customExpenses: [],
      packingList: defaultPackingList,
      currency: 'USD',
    };

    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    return newTrip;
  };

  const togglePackingItem = (tripId: string, itemId: string) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const updatedList = (t.packingList || defaultPackingList).map((item) =>
          item.id === itemId ? { ...item, packed: !item.packed } : item
        );
        return { ...t, packingList: updatedList };
      })
    );
  };

  const addPackingItem = (
    tripId: string,
    title: string,
    category: PackingItem['category']
  ) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const newItem: PackingItem = {
          id: `p_${Date.now()}`,
          title,
          category,
          packed: false,
        };
        return {
          ...t,
          packingList: [...(t.packingList || defaultPackingList), newItem],
        };
      })
    );
  };

  const addAdminDestination = (newDest: Omit<DestinationStop, 'id' | 'days'>) => {
    const createdDest: DestinationStop = {
      ...newDest,
      id: `dest_${Date.now()}`,
      days: [],
    };
    setDestinations((prev) => [createdDest, ...prev]);
  };

  const updateDestinationEstCost = (destId: string, newCostPerDay: number) => {
    setDestinations((prev) =>
      prev.map((d) => (d.id === destId ? { ...d, estCostPerDay: newCostPerDay } : d))
    );
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        destinations,
        activeTripId,
        setActiveTripId,
        getTrip,
        createTrip,
        updateTrip,
        deleteTrip,
        addStopToTrip,
        removeStopFromTrip,
        addActivityToStop,
        removeActivityFromStop,
        updateActivityCost,
        addExpenseToTrip,
        copyCommunityTrip,
        togglePackingItem,
        addPackingItem,
        addAdminDestination,
        updateDestinationEstCost,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};
