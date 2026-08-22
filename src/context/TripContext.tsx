import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trip, DestinationStop, Activity, ExpenseItem } from '../types';
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
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('globetrotter_trips');
    return saved ? JSON.parse(saved) : mockTripsList;
  });

  const [activeTripId, setActiveTripId] = useState<string | null>('trip_rajasthan');

  useEffect(() => {
    localStorage.setItem('globetrotter_trips', JSON.stringify(trips));
  }, [trips]);

  const getTrip = (id: string) => {
    return trips.find((t) => t.id === id);
  };

  const createTrip = (tripData: Partial<Trip>): Trip => {
    const newTrip: Trip = {
      id: `trip_${Date.now()}`,
      userId: 'usr_001',
      title: tripData.title || 'My Summer Adventure',
      description: tripData.description || 'Custom planned itinerary',
      coverImage: tripData.coverImage || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      startDate: tripData.startDate || '2024-10-15',
      endDate: tripData.endDate || '2024-10-25',
      budget: tripData.budget || 3000,
      status: 'Draft',
      isPublic: false,
      destinations: tripData.destinations || [],
      customExpenses: [],
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
          days: [
            {
              dayNumber: 1,
              date: destination.startDate,
              title: `Day 1: ${destination.city} Exploration`,
              activities: [],
            },
            {
              dayNumber: 2,
              date: destination.endDate,
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
      userId: 'usr_001',
      title: `${found.title} (Copy)`,
      description: found.subtitle,
      coverImage: found.coverImage,
      startDate: '2024-11-01',
      endDate: '2024-11-06',
      budget: parseInt(found.estBudget.replace(/[^0-9]/g, '')) || 3500,
      status: 'Upcoming',
      isPublic: false,
      destinations: mockDestinationsList.slice(0, 2),
      customExpenses: [],
    };

    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    return newTrip;
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        destinations: mockDestinationsList,
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
