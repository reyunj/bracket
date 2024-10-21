"use client";

import { useState, useEffect } from "react";
import Footer from "../component/Footer";

export default function Scoreboard() {
  const [judges, setJudges] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [judgeNames, setJudgeNames] = useState("");
  const [participantNames, setParticipantNames] = useState("");
  const [scores, setScores] = useState({});
  const [category, setCategory] = useState(""); // New state for category
  const [tournamentName, setTournamentName] = useState(""); // New state for tournament name

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");

    const loadScores = () => {
      const storedScores = localStorage.getItem(`scores-${sessionId}`);
      if (storedScores) {
        const { judges, participants, scores, category, tournamentName } =
          JSON.parse(storedScores);
        setJudges(judges);
        setParticipants(participants);
        setScores(scores);
        setCategory(category); // Load category
        setTournamentName(tournamentName); // Load tournament name
        console.log("Loaded Scores: ", {
          judges,
          participants,
          scores,
          category,
          tournamentName,
        });
      }
    };

    loadScores();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");

    const saveScores = () => {
      if (sessionId) {
        const dataToSave = {
          judges,
          participants,
          scores,
          category,
          tournamentName,
        }; // Save category and tournament name
        localStorage.setItem(`scores-${sessionId}`, JSON.stringify(dataToSave));
        console.log("Saved Scores: ", dataToSave);
      }
    };

    saveScores();
  }, [judges, participants, scores, category, tournamentName]);

  const handleAdd = () => {
    const participantArray = participantNames
      .split("\n")
      .map((name) => name.trim())
      .filter(Boolean);
    const judgeArray = judgeNames
      .split("\n")
      .map((name) => name.trim())
      .filter(Boolean);

    if (participantArray.length === 0 || judgeArray.length === 0) {
      alert("Please enter at least one participant and one judge name.");
      return;
    }

    const newParticipants = participantArray.filter(
      (name) => !participants.includes(name)
    );
    if (newParticipants.length > 0) {
      setParticipants((prev) => [...prev, ...newParticipants]);
      judges.forEach((judge) => {
        setScores((prev) => ({
          ...prev,
          [judge]: {
            ...prev[judge],
            ...Object.fromEntries(
              newParticipants.map((participant) => [participant, 0])
            ),
          },
        }));
      });
      setParticipantNames("");
    }

    const newJudges = judgeArray.filter((name) => !judges.includes(name));
    if (newJudges.length > 0) {
      setJudges((prev) => [...prev, ...newJudges]);
      newJudges.forEach((judge) => {
        setScores((prev) => ({ ...prev, [judge]: {} }));
      });
      setJudgeNames("");
    }
  };

  const handleScoreChange = (judge, participant, value) => {
    setScores((prev) => ({
      ...prev,
      [judge]: { ...prev[judge], [participant]: Number(value) },
    }));
  };

  const totalScore = (participant) => {
    return judges.reduce(
      (total, judge) => total + (scores[judge]?.[participant] || 0),
      0
    );
  };

  const handleRemoveParticipant = (participant) => {
    setParticipants((prev) => prev.filter((p) => p !== participant));
    judges.forEach((judge) => {
      setScores((prev) => ({
        ...prev,
        [judge]: { ...prev[judge], [participant]: undefined },
      }));
    });
  };

  const handleViewScores = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");

    const scoresData = {
      judges: judges.join(","),
      participants: participants.join(","),
      scores: JSON.stringify(scores),
      category, // Include category in scores data
      tournamentName, // Include tournament name in scores data
      sessionId: sessionId,
    };

    const scoresURL = new URL("/scoreboard/scores", window.location.origin);
    scoresURL.search = new URLSearchParams(scoresData).toString();
    window.open(scoresURL, "_blank");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="container mx-auto flex flex-col justify-center items-center p-6 flex-grow ">
        <h1 className="text-3xl font-bold mb-6">Scoreboard</h1>

        <div className="mb-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Category</h2>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Tournament Name</h2>
          <input
            type="text"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            placeholder="Enter Tournament Name"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Add Participants</h2>
          <textarea
            value={participantNames}
            onChange={(e) => setParticipantNames(e.target.value)}
            placeholder="Enter Participant Names (one per line)"
            rows={4}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Add Judges</h2>
          <textarea
            value={judgeNames}
            onChange={(e) => setJudgeNames(e.target.value)}
            placeholder="Enter Judge Names (one per line)"
            rows={4}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 w-full max-w-md"
        >
          Add Participants and Judges
        </button>

        <h2 className="text-xl font-semibold mb-2 mt-6">Scores</h2>
        {participants.length === 0 ? (
          <p className="text-gray-500">No participants added yet.</p>
        ) : (
          participants.map((participant) => (
            <div
              key={participant}
              className="mb-4 p-4 border border-gray-300 rounded-md shadow w-full max-w-md"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{participant}</h3>
                <button
                  onClick={() => handleRemoveParticipant(participant)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
              {judges.length === 0 ? (
                <p className="text-gray-500">No judges added yet.</p>
              ) : (
                judges.map((judge) => (
                  <div key={judge} className="flex items-center mb-2">
                    <label className="mr-2">{judge}:</label>
                    <input
                      type="number"
                      value={scores[judge]?.[participant] || ""}
                      onChange={(e) =>
                        handleScoreChange(judge, participant, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1 w-full"
                      min="0"
                      max="10"
                    />
                  </div>
                ))
              )}
              <p className="font-semibold">
                Total Score: {totalScore(participant)}
              </p>
            </div>
          ))
        )}
        <button
          onClick={handleViewScores}
          className="mt-6 bg-green-500 text-white rounded-md p-2 hover:bg-green-600 w-full max-w-md"
        >
          View Scores
        </button>
      </div>
      <Footer />
    </div>
  );
}
