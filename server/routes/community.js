import express from 'express';
import { mockCommunityTrips } from '../db/seedData.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, trips: mockCommunityTrips });
});

router.get('/:id', (req, res) => {
  const found = mockCommunityTrips.find((t) => t.id === req.params.id) || mockCommunityTrips[0];
  res.json({ success: true, trip: found });
});

export default router;
