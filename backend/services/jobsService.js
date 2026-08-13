import axios from "axios";

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

export async function searchJobs({
  what = "software engineer",
  where = "Bengaluru",
  page = 1,
  resultsPerPage = 20,
}) {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    throw new Error(
      "Adzuna API credentials are missing"
    );
  }

  const url =
    `https://api.adzuna.com/v1/api/jobs/in/search/${page}`;

  try {
    const response = await axios.get(url, {
      params: {
        app_id: ADZUNA_APP_ID,
        app_key: ADZUNA_APP_KEY,
        results_per_page: resultsPerPage,
        what: what,
        where: where,
      },
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    console.error("========== ADZUNA ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error(
      "Data:",
      error.response?.data
    );
    console.error(
      "Message:",
      error.message
    );
    console.error(
      "URL:",
      error.config?.url
    );
    console.error(
      "Params:",
      {
        ...error.config?.params,
        app_id: "***",
        app_key: "***",
      }
    );
    console.error(
      "==================================="
    );

    throw error;
  }
}