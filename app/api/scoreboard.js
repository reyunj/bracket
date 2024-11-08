// api/scoreboard.js
const mongoose = require("mongoose");
const { json } = require("micro");

// MongoDB connection (Vercel will handle the connection pooling)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const scoreSchema = new mongoose.Schema({
  sessionId: String,
  category: String,
  fieldTakami: Number,
  ageBracket: String,
  ageDirection: String,
  rank: String,
  ks: String,
  gender: String,
  match: String,
  participants1: String,
  participants2: String,
});

const Score = mongoose.model("Score", scoreSchema);

// Serverless function handler
module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await json(req);
      const { sessionId, formData } = data;

      let score = await Score.findOne({ sessionId });

      if (score) {
        score.set(formData);
      } else {
        score = new Score({ sessionId, ...formData });
      }

      await score.save();
      res.status(200).json({ message: "Scores saved successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving data to the server." });
    }
  } else if (req.method === "GET") {
    try {
      const { sessionId } = req.query;

      const score = await Score.findOne({ sessionId });

      if (!score) {
        return res
          .status(404)
          .json({ message: "No setup data found for this session." });
      }

      res.status(200).json(score);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving data from the server." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
