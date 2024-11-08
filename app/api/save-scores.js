import Cors from "cors";
import initMiddleware from "@/app/lib/init-middleware";

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ["POST", "OPTIONS"],
  })
);

let scoreDataStore = {}; // In-memory for demo, use a database for persistence

export default async function handler(req, res) {
  await cors(req, res); // Run CORS middleware

  if (req.method === "POST") {
    const { sessionId, formData } = req.body;

    if (!sessionId || !formData) {
      return res
        .status(400)
        .json({ message: "Session ID and data are required." });
    }

    // Save data to in-memory store (replace with a database in production)
    scoreDataStore[sessionId] = formData;

    return res.status(200).json({ message: "Scores saved successfully!" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
