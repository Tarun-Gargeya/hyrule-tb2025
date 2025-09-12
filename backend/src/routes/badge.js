import express from "express";
import { createBadge, claimBadge } from "../controllers/badgeController.js";

const router = express.Router();
router.post("/create", createBadge);
router.get("/claim/:token", claimBadge);

export default router;
