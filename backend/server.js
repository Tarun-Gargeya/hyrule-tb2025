// POST /api/register
// Body: { email_id, name, ... }
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
app.post("/api/register", async (req, res) => {
  const { email_id, name, ...rest } = req.body;
  if (!email_id || !name) {
    return res.status(400).json({ error: "email_id and name required" });
  }
  // 1. Insert user
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert([
      { email_id, name, ...rest }
    ])
    .select()
    .single();
  if (userError || !user) {
    return res.status(500).json({ error: userError?.message || "User creation failed" });
  }
  // 2. Check for existing welcome badge
  const { data: existing, error: existError } = await supabase
    .from("badges")
    .select("id")
    .eq("user_id", user.id)
    .eq("title", "Welcome Badge")
    .eq("category", "welcome")
    .eq("organization", "hyrule-tb2025")
    .eq("role", "Newcomer")
    .maybeSingle();
  if (existError) {
    return res.status(500).json({ error: existError.message, user });
  }
  if (existing) {
    return res.json({ success: true, user, badge: null, message: "Welcome badge already exists for this user." });
  }
  // 3. Insert welcome badge
  const { data: badge, error: badgeError } = await supabase
    .from("badges")
    .insert([
      {
        user_id: user.id,
        title: "Welcome Badge",
        description: "Awarded for joining the platform!",
        organization: "hyrule-tb2025",
        role: "Newcomer",
        issued_at: new Date().toISOString(),
        category: "welcome"
      },
    ])
    .select()
    .single();
  if (badgeError) {
    return res.status(500).json({ error: badgeError.message, user });
  }
  res.json({ success: true, user, badge });
});
// POST /api/welcome-badge
// Body: { userId }
app.post("/api/welcome-badge", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "userId required" });
  }
  // Fetch user email (optional, for logging)
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("email_id")
    .eq("id", userId)
    .single();
  if (userError || !user) {
    return res.status(404).json({ error: "User not found" });
  }
  // Check for existing welcome badge
  const { data: existing, error: existError } = await supabase
    .from("badges")
    .select("id")
    .eq("user_id", userId)
    .eq("title", "Welcome Badge")
    .eq("category", "welcome")
    .eq("organization", "hyrule-tb2025")
    .eq("role", "Newcomer")
    .maybeSingle();
  if (existError) {
    return res.status(500).json({ error: existError.message });
  }
  if (existing) {
    return res.status(409).json({ error: "Welcome badge already exists for this user." });
  }
  // Insert welcome badge
  const { data: badge, error: badgeError } = await supabase
    .from("badges")
    .insert([
      {
        user_id: userId,
        title: "Welcome Badge",
        description: "Awarded for joining the platform!",
        organization: "hyrule-tb2025",
        role: "Newcomer",
        issued_at: new Date().toISOString(),
        category: "welcome"
      },
    ])
    .select();
  if (badgeError) {
    return res.status(500).json({ error: badgeError.message });
  }
  res.json({ success: true, badge: badge && badge[0] });
});




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
      // 3. Check for existing badge (robust)
      const { data: existing, error: existError } = await supabase
        .from("badges")
        .select("id")
        .eq("user_id", studentId)
        .eq("organization", organization)
        .eq("role", role)
        .eq("title", title || `${role} at ${organization}`)
        .eq("category", category || "Work Experience")
        .maybeSingle();
      if (existError) {
        return res.status(500).json({ error: existError.message });
      }
      if (existing) {
        return res.status(409).json({ error: "Badge already exists for this user, organization, role, title, and category." });
      }
      // 4. Insert badge if not exists
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
      .order("createdAt", { ascending: false });
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
