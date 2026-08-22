import express from 'express';
import { mockTripsList } from '../db/seedData.js';

const router = express.Router();

let inMemoryTrips = [...mockTripsList];

router.get('/', (req, res) => {
  res.json({ success: true, trips: inMemoryTrips });
});

router.get('/:id', (req, res) => {
  const trip = inMemoryTrips.find((t) => t.id === req.params.id);
  if (!trip) {
    return res.status(404).json({ success: false, message: 'Trip not found' });
  }
  res.json({ success: true, trip });
});

router.post('/', (req, res) => {
  const tripData = req.body;
  const newTrip = {
    id: `trip_${Date.now()}`,
    userId: 'usr_001',
    title: tripData.title || 'Summer Explorer',
    description: tripData.description || 'Custom planned travel itinerary',
    coverImage: tripData.coverImage || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    startDate: tripData.startDate || '2024-10-15',
    endDate: tripData.endDate || '2024-10-25',
    budget: Number(tripData.budget) || 3000,
    status: 'Draft',
    isPublic: false,
    destinations: tripData.destinations || [],
    customExpenses: [],
  };

  inMemoryTrips.unshift(newTrip);
  res.status(201).json({ success: true, trip: newTrip });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = inMemoryTrips.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Trip not found' });
  }
  inMemoryTrips[index] = { ...inMemoryTrips[index], ...req.body };
  res.json({ success: true, trip: inMemoryTrips[index] });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  inMemoryTrips = inMemoryTrips.filter((t) => t.id !== id);
  res.json({ success: true, message: 'Trip deleted successfully' });
});

export default router;
