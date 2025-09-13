import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
      <h2>Welcome! Choose a dashboard:</h2>
      <Link to="/company-dashboard" className="text-blue-400 text-7xl">Go to Company Dashboard</Link>
      <Link to="/user-dashboard">Go to User Dashboard</Link>
    </div>
  );
}
