const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (resets when server restarts)
let badges = [];

// Email removed: no transporter configuration

// Route: Company creates badge
app.post("/createBadge", async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { company, studentEmail, name, position } = req.body;

    if (!company || !studentEmail || !name || !position) {
      return res.status(400).json({ 
        message: "Missing required fields: company, studentEmail, name, position" 
      });
    }

    // generate claim token
    const token = crypto.randomBytes(16).toString("hex");

    // save badge in memory
    const badge = {
      id: badges.length + 1,
      company,
      studentEmail,
      name,
      position,
      status: "pending", // pending → verified
      claimToken: token,
    };
    badges.push(badge);

    // claim link
    const claimLink = `http://localhost:3001/claim/${token}`;

    // Email sending removed; just return the claim link
    res.status(201).json({ 
      message: "Badge created",
      claimLink
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating badge" });
  }
});

// Route: Student claims badge
app.get("/claim/:token", (req, res) => {
  const { token } = req.params;
  
  const badge = badges.find(b => b.claimToken === token);
  if (!badge) {
    return res.status(404).json({ message: "Invalid or expired claim token" });
  }
  
  if (badge.status === "verified") {
    return res.json({ message: "Badge already verified", badge });
  }
  
  badge.status = "verified";
  badge.verifiedAt = new Date().toISOString();
  
  res.json({ 
    message: "Badge successfully verified!", 
    badge: {
      company: badge.company,
      name: badge.name,
      position: badge.position,
      status: badge.status,
      verifiedAt: badge.verifiedAt
    }
  });
});

// Mock route: list badges from static JSON (placeholder backend)
const fs = require("fs");
const path = require("path");
app.get("/badges", (req, res) => {
  try {
    const filePath = path.join(__dirname, "mock-badges.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const list = JSON.parse(raw);
    res.json(list);
  } catch (e) {
    console.error("Failed to load mock badges:", e);
    res.status(500).json({ message: "Failed to load mock badges" });
  }
});

// Mock route: user profile placeholder
app.get("/profile", (req, res) => {
  try {
    const filePath = path.join(__dirname, "mock-profile.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const profile = JSON.parse(raw);
    res.json(profile);
  } catch (e) {
    console.error("Failed to load mock profile:", e);
    res.status(500).json({ message: "Failed to load mock profile" });
  }
});

// Email endpoints removed

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
