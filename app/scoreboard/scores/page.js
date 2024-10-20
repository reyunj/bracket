"use client";
import { useEffect, useState } from "react";

const Scores = () => {
  const [judges, setJudges] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    // Function to load scores from localStorage
    const loadScores = () => {
      const storedScores = localStorage.getItem("scores");
      if (storedScores) {
        const { judges, participants, scores } = JSON.parse(storedScores);
        setJudges(judges);
        setParticipants(participants);
        setScores(scores);
      }
    };

    // Load scores initially
    loadScores();

    // Set an interval to refresh scores every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(loadScores, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const totalScore = (participant) => {
    return judges.reduce(
      (total, judge) => total + (scores[judge]?.[participant] || 0),
      0
    );
  };

  const averageScore = (participant) => {
    const total = totalScore(participant);
    const judgeCount = judges.length;
    return judgeCount > 0 ? (total / judgeCount).toFixed(2) : 0;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container p-6 bg-black rounded-lg shadow-lg">
        {participants.length === 0 ? (
          <p className="text-white text-center text-2xl">
            No participants added yet.
          </p>
        ) : (
          <table className="min-w-full border border-white">
            <thead>
              <tr className="bg-gray-900">
                <th className="border border-white px-6 py-4 text-left text-2xl font-semibold text-white">
                  Participant
                </th>
                {judges.map((judge) => (
                  <th
                    key={judge}
                    className="border border-white px-6 py-4 text-left text-2xl font-semibold text-white"
                  >
                    {judge}
                  </th>
                ))}

                <th className="border border-white px-6 py-4 text-left text-2xl font-semibold text-white">
                  Average Score
                </th>
                <th className="border border-white px-6 py-4 text-left text-2xl font-semibold text-white">
                  Total Score
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant} className="border-b border-gray-700">
                  <td className="border border-white px-6 py-4 text-white">
                    {participant}
                  </td>
                  {judges.map((judge) => (
                    <td
                      key={judge}
                      className="border border-white px-6 py-4 text-white"
                    >
                      {scores[judge]?.[participant] || 0}
                    </td>
                  ))}
                  <td className="border border-white px-6 py-4 text-white">
                    {averageScore(participant)}
                  </td>
                  <td className="border border-white px-6 py-4 text-white">
                    {totalScore(participant)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Scores;
