import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { AppLayout } from './components/layout/AppLayout';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { MyTrips } from './pages/MyTrips';
import { CreateTrip } from './pages/CreateTrip';
import { ItineraryBuilder } from './pages/ItineraryBuilder';
import { Discovery } from './pages/Discovery';
import { ActivitySearchModal } from './pages/ActivitySearchModal';
import { BudgetExpenses } from './pages/BudgetExpenses';
import { Community } from './pages/Community';
import { SharedTrip } from './pages/SharedTrip';
import { Profile } from './pages/Profile';
import { CalendarView } from './pages/CalendarView';
import { AdminDashboard } from './pages/AdminDashboard';

// Strict Admin Module Route Guard: Only allows users with role === 'admin'
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <TripProvider>
        <BrowserRouter>
          <Routes>
            {/* Root lands on /login first */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected User Service Module Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trips" element={<MyTrips />} />
              <Route path="/trips/create" element={<CreateTrip />} />
              <Route path="/trips/:tripId" element={<ItineraryBuilder />} />
              <Route path="/trips/:tripId/plan" element={<ItineraryBuilder />} />
              <Route path="/trips/:tripId/budget" element={<BudgetExpenses />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/activity-search" element={<ActivitySearchModal />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/community" element={<Community />} />
              <Route path="/shared/:tripId" element={<SharedTrip />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Profile />} />
              <Route path="/support" element={<Community />} />

              {/* Protected Admin Module Route */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
            </Route>

            {/* Fallback to Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </TripProvider>
    </AuthProvider>
  );
};

export default App;
