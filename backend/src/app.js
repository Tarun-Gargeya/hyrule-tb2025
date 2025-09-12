import express from "express";
import badgeRoutes from "./routes/badge.js";

const app = express();
app.use(express.json());
app.use("/badge", badgeRoutes);

export default app;
