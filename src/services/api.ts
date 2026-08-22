const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  async login(email?: string, password?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, falling back to client dataset:', err);
      return { success: true };
    }
  },

  async register(userData: any) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, falling back to client dataset:', err);
      return { success: true };
    }
  },

  // Trips endpoints
  async fetchTrips() {
    try {
      const res = await fetch(`${API_BASE_URL}/trips`);
      const data = await res.json();
      return data.trips;
    } catch (err) {
      return null;
    }
  },

  async createTrip(tripData: any) {
    try {
      const res = await fetch(`${API_BASE_URL}/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData),
      });
      const data = await res.json();
      return data.trip;
    } catch (err) {
      return null;
    }
  },

  // Admin stats
  async fetchAdminStats() {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stats`);
      const data = await res.json();
      return data.stats;
    } catch (err) {
      return null;
    }
  },
};
