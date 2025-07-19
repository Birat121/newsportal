// routes/CronRoute.js
import express from "express";

const cronRouter = express.Router();

// Lightweight health check endpoint for cron-job.org
cronRouter.get("/ping", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

export default cronRouter;
