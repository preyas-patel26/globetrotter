import express from 'express';
import { mockDestinationsList } from '../db/seedData.js';

const router = express.Router();

router.get('/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalUsers: 1420,
      totalTrips: 3850,
      totalBudget: 4200000,
      sharedCount: 640,
      monthlyCreationTrends: [
        { month: 'May', count: 320 },
        { month: 'Jun', count: 450 },
        { month: 'Jul', count: 580 },
        { month: 'Aug', count: 720 },
        { month: 'Sep', count: 640 },
        { month: 'Oct', count: 890 },
      ],
      topDestinations: mockDestinationsList.slice(0, 4),
    },
  });
});

export default router;
