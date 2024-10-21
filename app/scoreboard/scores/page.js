"use client";

import { useEffect, useState } from "react";

export default function Scores() {
  const [judges, setJudges] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [category, setCategory] = useState(""); // New state for category
  const [tournamentName, setTournamentName] = useState(""); // New state for tournament name

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("sessionId");
    setSessionId(id);

    if (!id) {
      console.error("No sessionId found in the URL");
      return;
    }

    const loadScores = () => {
      const storedScores = localStorage.getItem(`scores-${id}`);
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
      } else {
        console.error("No scores found for this sessionId");
      }
    };

    loadScores();

    const intervalId = setInterval(() => {
      loadScores();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="container mx-auto flex flex-col justify-center items-center p-6 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-black">Scoreboard</h1>

        <div className="mb-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Category: {category}
          </h2>
          <h2 className="text-xl font-semibold mb-2 text-black">
            Tournament: {tournamentName}
          </h2>
        </div>

        {participants.length === 0 ? (
          <p className="text-gray-400">No participants added yet.</p>
        ) : (
          <table className="min-w-full bg-gray-800">
            <thead className="bg-gray-700">
              <tr>
                <th className="border-4 border-gray-600 p-4 text-lg text-white">
                  Participant
                </th>
                {judges.map((judge) => (
                  <th
                    key={judge}
                    className="border-4 border-gray-600 p-4 text-lg text-white"
                  >
                    {judge}
                  </th>
                ))}
                <th className="border-4 border-gray-600 p-4 text-lg text-white">
                  Average Score
                </th>
                <th className="border-4 border-gray-600 p-4 text-lg text-white">
                  Total Score
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => {
                const totalScore = judges.reduce(
                  (total, judge) => total + (scores[judge]?.[participant] || 0),
                  0
                );
                const averageScore =
                  judges.length > 0
                    ? (totalScore / judges.length).toFixed(2)
                    : 0;

                return (
                  <tr key={participant}>
                    <td className="border-4 border-gray-600 p-4 text-lg text-white text-center">
                      {participant}
                    </td>
                    {judges.map((judge) => (
                      <td
                        key={judge}
                        className="border-4 border-gray-600 p-4 text-lg text-white text-center"
                      >
                        {scores[judge]?.[participant] || 0}
                      </td>
                    ))}
                    <td className="border-4 border-gray-600 p-4 text-lg text-white text-center">
                      {averageScore}
                    </td>
                    <td className="border-4 border-gray-600 p-4 text-lg text-white text-center">
                      {totalScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
