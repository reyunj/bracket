"use client";

import { useEffect, useState } from "react";

export default function Scores() {
  const [judges, setJudges] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState({});
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Get the session ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("sessionId");
    setSessionId(id);

    // Check if sessionId is valid
    if (!id) {
      console.error("No sessionId found in the URL");
      return;
    }

    // Function to load scores from localStorage
    const loadScores = () => {
      const storedScores = localStorage.getItem(`scores-${id}`);
      if (storedScores) {
        const { judges, participants, scores } = JSON.parse(storedScores);
        setJudges(judges);
        setParticipants(participants);
        setScores(scores);
        console.log("Loaded Scores: ", { judges, participants, scores });
      } else {
        console.error("No scores found for this sessionId");
      }
    };

    // Load scores initially
    loadScores();

    // Set up interval to refresh scores every 5 seconds
    const intervalId = setInterval(() => {
      loadScores();
    }, 5000); // Refresh every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Only run once when component mounts

  return (
    <div className="flex flex-col h-screen">
      <div className="container mx-auto flex flex-col justify-center items-center p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Scores Overview</h1>

        {participants.length === 0 ? (
          <p className="text-gray-500">No participants added yet.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Participant</th>
                {judges.map((judge) => (
                  <th key={judge} className="border border-gray-300 p-2">
                    {judge}
                  </th>
                ))}
                <th className="border border-gray-300 p-2">Average Score</th>
                <th className="border border-gray-300 p-2">Total Score</th>
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
                  <tr key={participant} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      {participant}
                    </td>
                    {judges.map((judge) => (
                      <td key={judge} className="border border-gray-300 p-2">
                        {scores[judge]?.[participant] || 0}
                      </td>
                    ))}
                    <td className="border border-gray-300 p-2">
                      {averageScore}
                    </td>
                    <td className="border border-gray-300 p-2">{totalScore}</td>
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
