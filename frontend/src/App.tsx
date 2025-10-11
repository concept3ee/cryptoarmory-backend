import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InvestmentProvider } from './context/InvestmentContext';
import { NotificationProvider } from './context/NotificationContext';
import LandingPage from './components/Landing/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Dashboard from './components/Dashboard/Dashboard';
import Toast from './components/Common/Toast';
import SessionWarning from './components/Common/SessionWarning';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoadingUser } = useAuth();
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-gray-300">Loading…</div>
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoadingUser } = useAuth();
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-gray-300">Loading…</div>
      </div>
    );
  }
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const AppContent: React.FC = () => {
  return (
    <NotificationProvider>
      <InvestmentProvider>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginForm onToggleMode={() => window.location.href = '/signup'} />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <SignupForm onToggleMode={() => window.location.href = '/login'} />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toast />
        <SessionWarning />
      </InvestmentProvider>
    </NotificationProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;