import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '2rem', borderRadius: 12, background: '#f9fafb', boxShadow: '0 2px 8px #e5e7eb' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>OfferCred</h1>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '1.5rem', color: '#334155' }}>
        Verifying Student Opportunities with Trust & Tech
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>
        In student communities, many claim job offers, internships, or freelance projects on LinkedIn or campus groups without any way to verify them. This opens the door to exaggeration and false representation, creating fake clout and overshadowing genuine achievements.<br /><br />
        The absence of verification causes trust issues for recruiters, peers, and hiring platforms, while reducing accountability for both students and companies. OfferCred provides a transparent, verifiable system to validate claims, ensure credibility, and build a culture of honesty that helps recruiters identify real talent.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', marginTop: '2rem' }}>
        <Link to="/company-dashboard" className="text-blue-600 hover:underline text-xl font-semibold">Company Dashboard</Link>
        <Link to="/user-dashboard" className="text-blue-600 hover:underline text-xl font-semibold">User Dashboard</Link>
      </div>
    </div>
  );
}
