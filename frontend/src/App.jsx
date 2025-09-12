
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompanyDashboard from './pages/CompanyDashboard';
import UserDashboard from './pages/UserDashboard';
import MyBadges from './pages/MyBadges';
import Home from './pages/Home';
import './styles/App.css';
function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/my-badges" element={<MyBadges />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
