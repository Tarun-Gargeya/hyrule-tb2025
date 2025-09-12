const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (resets when server restarts)
let badges = [];

// Email setup (Nodemailer)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

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

    // Send email to student
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: studentEmail,
        subject: `Badge Verification from ${company}`,
        html: `
          <h2>Badge Verification</h2>
          <p>Hello ${name},</p>
          <p>Congratulations! ${company} has created a professional badge for you.</p>
          <p><strong>Position:</strong> ${position}</p>
          <p>Please click the link below to claim and verify your badge:</p>
          <p><a href="${claimLink}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">Claim Your Badge</a></p>
          <p>Or copy and paste this link in your browser: ${claimLink}</p>
          <p>Best regards,<br>Badge Verification System</p>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${studentEmail}`);
      
      res.status(201).json({ 
        message: "Badge created and email sent successfully!", 
        claimLink,
        emailSent: true
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      res.status(201).json({ 
        message: "Badge created but email sending failed", 
        claimLink,
        emailSent: false,
        emailError: emailError.message
      });
    }
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

// Debug route: list all badges (remove in production!)
app.get("/badges", (req, res) => {
  res.json(badges);
});

// Test email configuration
app.get("/test-email", async (req, res) => {
  try {
    await transporter.verify();
    res.json({ message: "Email configuration is working!", emailUser: process.env.EMAIL_USER });
  } catch (error) {
    res.status(500).json({ 
      message: "Email configuration failed", 
      error: error.message,
      emailUser: process.env.EMAIL_USER 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
