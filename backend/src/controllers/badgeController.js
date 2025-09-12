import crypto from "crypto";
import nodemailer from "nodemailer";

// in-memory store (replace with DB later)
let badges = [];

export const createBadge = async (req, res) => {
  try {
    const { company, studentEmail, name, position } = req.body || {};

    if (!company || !studentEmail || !name || !position) {
      return res
        .status(400)
        .json({ error: "Missing fields: company, studentEmail, name, position required" });
    }

    // generate token
    const token = crypto.randomBytes(16).toString("hex");

    // badge object
    const newBadge = {
      company,
      studentEmail,
      name,
      position,
      claimToken: token,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    badges.push(newBadge);

    const claimLink = `http://localhost:5000/badge/claim/${token}`;

    // === Gmail Transporter ===
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // 16-char app password
      },
    });

    const mailOptions = {
      from: `"OfferCred" <${process.env.EMAIL_USER}>`,
      to: studentEmail,
      subject: `${company} issued you an OfferCred badge`,
      text: `Hi ${name},\n\n${company} has issued you a badge for ${position}.\nClaim it: ${claimLink}\n\n- OfferCred`,
      html: `<p>Hi ${name},</p>
             <p><strong>${company}</strong> has issued you a badge for <em>${position}</em>.</p>
             <p><a href="${claimLink}">Click here to claim your badge</a></p>
             <p>- OfferCred</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return res.status(201).json({
      message: "Badge created and email sent",
      claimLink,
      badge: newBadge,
    });
  } catch (err) {
    console.error("Error in createBadge:", err);
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};

export const claimBadge = (req, res) => {
  const token = req.params.token;
  const badge = badges.find((b) => b.claimToken === token);

  if (!badge) return res.status(404).json({ error: "Badge not found" });

  badge.status = "verified";
  return res.json({ message: "Badge verified", badge });
};
