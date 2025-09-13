// /frontend/src/pages/Profile.js
import React, { useState } from 'react';
import axios from 'axios';
import { useBadges } from '../context/BadgeContext';
import { useAuth } from '../context/AuthContext';

// Example props: studentId, companyId (in real app, get from context or route)

export default function Profile({ studentId: propStudentId, companyId: propCompanyId }) {
  const { user } = useAuth();
  const { fetchExistingBadges } = useBadges();
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use logged-in user if available
  const studentId = propStudentId || user?.id;
  const companyId = propCompanyId || '';

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    setVerification(null);
    try {
      // You may want to collect org/role/title/desc/category from UI or context
      const res = await axios.post('/api/verify-student', {
        studentId,
        companyId,
        organization: 'Company A', // Replace with actual org
        role: 'Intern', // Replace with actual role
        title: 'Internship', // Replace with actual title
        description: 'Internship badge', // Replace with actual desc
        category: 'Work Experience', // Replace with actual category
      });
      setVerification(res.data.verified);
      if (res.data.verified) {
        // Refresh badges from backend
        await fetchExistingBadges();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Student Profile</h2>
      {/* ...other profile info... */}
      <button onClick={handleVerify} disabled={loading} style={{ marginTop: 16 }}>
        {loading ? 'Verifying...' : 'Verify Work Experience'}
      </button>
  {verification === true && <div style={{ color: 'green', marginTop: 12 }}>Verified ✅ Badge added to your profile!</div>}
  {verification === false && <div style={{ color: 'red', marginTop: 12 }}>Not Verified ❌ (No badge added)</div>}
  {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
    </div>
  );
}
