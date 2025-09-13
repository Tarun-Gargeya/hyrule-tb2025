// /company-backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


// Use Supabase for employee verification
const supabase = require('./supabase');

/**
 * POST /api/verify
 * Body: { email, studentId }
 * Checks if the student exists in the employees DB.
 * Returns { verified: true } or { verified: false }
 */
/**
 * POST /api/verify
 * Body: { email, studentId }
 * Checks if the student exists in the employees table in Supabase.
 * Returns { verified: true } or { verified: false }
 */
app.post('/api/verify', async (req, res) => {
  const { email, studentId, organization, role } = req.body;
  console.log('Verification request:', { email, studentId, organization, role });
  if (!email || !studentId || !organization || !role) {
    return res.status(400).json({ error: 'email, studentId, organization, and role required' });
  }
  try {
    // Query Supabase employees table for all fields
    const { data, error } = await supabase
      .from('employees')
      .select('uid')
      .eq('email', email)
      .eq('uid', studentId)
      .eq('organization', organization)
      .eq('role', role)
      .single();
    console.log('Supabase query result:', { data, error });
    if (error || !data) {
      return res.json({ verified: false });
    }
    return res.json({ verified: true });
  } catch (err) {
    return res.status(500).json({ error: 'Supabase error', details: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Company backend running on port ${PORT}`);
});
