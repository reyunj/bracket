import Cors from "cors";
import initMiddleware from "@/app/lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

let scoreDataStore = {}; // In-memory for demo, use a database for persistence

export default async function handler(req, res) {
  await cors(req, res); // Run CORS middleware

  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required." });
  }

  const data = scoreDataStore[sessionId];

  if (!data) {
    return res.status(404).json({ message: "No data found for this session." });
  }

  res.status(200).json(data);
}
