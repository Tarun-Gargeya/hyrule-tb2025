
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BadgeProvider } from './context/BadgeContext';
import { ProtectedRoute } from './components';
import CompanyDashboard from './pages/CompanyDashboard';
import UserDashboard from './pages/UserDashboard';
import MyBadges from './pages/MyBadges';
import Home from './pages/Home';
import Homesmt from './pages/Homesmt';
import Auth from './pages/Auth';
import ProfileWrapper from './pages/profile/ProfileWrapper';
import './styles/App.css';

function App(){
  return (
    <AuthProvider>
      <BadgeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homesmt />} />
            <Route path="/landing" element={<Homesmt />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/company-dashboard" 
              element={
                <ProtectedRoute>
                  <CompanyDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user-dashboard" 
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-badges" 
              element={
                <ProtectedRoute>
                  <MyBadges />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/:userId" 
              element={
                <ProtectedRoute>
                  <ProfileWrapper />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </BadgeProvider>
    </AuthProvider>
  );
}
export default App
