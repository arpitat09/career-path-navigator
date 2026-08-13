import express from "express";
import { searchJobs } from "../services/jobsService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const what =
      typeof req.query.what === "string" &&
      req.query.what.trim()
        ? req.query.what.trim()
        : "software engineer";

    const where =
      typeof req.query.where === "string" &&
      req.query.where.trim()
        ? req.query.where.trim()
        : "Bengaluru";

    const page =
      Number(req.query.page) > 0
        ? Number(req.query.page)
        : 1;

    const jobs = await searchJobs({
      what,
      where,
      page,
    });

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Jobs API error:",
      error.response?.data ||
        error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch jobs",
    });
  }
});

export default router;