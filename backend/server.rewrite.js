const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY; // Service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// POST /api/verify-student
// Body: { studentId, companyId, organization, role, title, description, category }
app.post("/api/verify-student", async (req, res) => {
  const { studentId, companyId, organization, role, title, description, category } = req.body;
  if (!studentId || !companyId || !organization || !role) {
    return res.status(400).json({ error: "studentId, companyId, organization, and role required" });
  }
  // 1. Fetch student email from users table
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("email_id")
    .eq("id", studentId)
    .single();
  if (userError || !user) {
    return res.status(404).json({ error: "Student not found" });
  }
  const studentEmail = user.email_id;
  // 2. Call company-backend for verification
  try {
    const verifyRes = await axios.post("http://localhost:6000/api/verify", {
      email: studentEmail,
      studentId,
      organization,
      role,
    });
    if (verifyRes.data.verified) {
      // 3. Insert badge if verified
      const { data: badge, error: badgeError } = await supabase
        .from("badges")
        .insert([
          {
            user_id: studentId,
            title: title || `${role} at ${organization}`,
            description: description || "",
            issuer: organization,
            organization,
            role,
            category: category || "Work Experience",
            status: "verified",
            verified_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();
      if (badgeError) {
        return res.status(500).json({ error: "Badge creation failed", details: badgeError.message });
      }
      return res.json({ verified: true, badge });
    } else {
      return res.json({ verified: false });
    }
  } catch (err) {
    return res.status(500).json({ error: "Company verification failed", details: err.message });
  }
});

// GET /badges?user_id=...
app.get("/badges", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ error: "user_id required" });
  try {
    const { data, error } = await supabase
      .from("badges")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase error in /badges:", error);
      return res.status(500).json({ error: error.message, details: error });
    }
    return res.json(data);
  } catch (err) {
    console.error("Exception in /badges:", err);
    return res.status(500).json({ error: err.message, details: err });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
