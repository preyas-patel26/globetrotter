import express from 'express';
import { mockUser } from '../db/seedData.js';

const router = express.Router();

let usersStore = [
  { ...mockUser, password: 'demo123', role: 'user' },
  {
    ...mockUser,
    id: 'usr_admin',
    firstName: 'Admin',
    lastName: 'Manager',
    email: 'admin@globetrotter.com',
    password: 'admin123',
    tier: 'Platform Admin',
    role: 'admin',
  },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const trimmedEmail = (email || '').trim().toLowerCase();

  const found = usersStore.find((u) => u.email.toLowerCase() === trimmedEmail);

  if (trimmedEmail === 'admin@globetrotter.com') {
    return res.json({
      success: true,
      user: usersStore.find((u) => u.role === 'admin'),
      token: 'jwt_admin_session_token',
    });
  }

  if (found) {
    return res.json({
      success: true,
      user: found,
      token: 'jwt_user_session_token',
    });
  }

  const newUser = {
    ...mockUser,
    id: `usr_${Date.now()}`,
    email: trimmedEmail || 'user@globetrotter.com',
    role: 'user',
  };
  usersStore.push(newUser);

  res.json({
    success: true,
    user: newUser,
    token: 'jwt_user_session_token',
  });
});

router.post('/register', (req, res) => {
  const userData = req.body;
  const newUser = {
    ...mockUser,
    id: `usr_${Date.now()}`,
    firstName: userData.firstName || 'Explorer',
    lastName: userData.lastName || 'User',
    email: userData.email || 'user@globetrotter.com',
    phone: userData.phone || '+1 (555) 000-0000',
    city: userData.city || 'Seattle',
    country: userData.country || 'United States',
    role: 'user',
  };

  usersStore.push(newUser);

  res.status(201).json({
    success: true,
    user: newUser,
    token: 'jwt_registered_session_token',
  });
});

router.get('/users', (req, res) => {
  res.json({ success: true, users: usersStore });
});

export default router;
