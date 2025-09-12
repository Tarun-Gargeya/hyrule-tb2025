
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompanyDashboard from './pages/CompanyDashboard';
import UserDashboard from './pages/UserDashboard';
import MyBadges from './pages/MyBadges';
import Home from './pages/Home';
import ProfileLayout from './pages/profile/ProfileLayout';
import ProfilePrivate from './pages/profile/ProfilePrivate';
import ProfilePublic from './pages/profile/ProfilePublic';
import './styles/App.css';
function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/my-badges" element={<MyBadges />} />
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfilePrivate />} />
          <Route path="public" element={<ProfilePublic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App
