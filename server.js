const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (for demo purposes)
let scoreDataStore = {};

// API Endpoints
app.post("/api/save-scores", (req, res) => {
  const { sessionId, formData } = req.body;
  if (!sessionId || !formData) {
    return res
      .status(400)
      .send({ message: "Session ID and data are required." });
  }

  // Save data in memory (in a real-world app, save to a database like MongoDB or PostgreSQL)
  scoreDataStore[sessionId] = formData;

  res.status(200).send({ message: "Scores saved successfully!" });
});

app.get("/api/get-scores", (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).send({ message: "Session ID is required." });
  }

  const data = scoreDataStore[sessionId];

  if (!data) {
    return res.status(404).send({ message: "No data found for this session." });
  }

  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
