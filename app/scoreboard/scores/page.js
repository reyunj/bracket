"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Pic from "@/app/assets/Pic.png";

const useScores = (sessionId) => {
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError(null);

      if (sessionId) {
        try {
          const response = await fetch(
            `https://bracket-nu.vercel.app/api/get-scores?sessionId=${sessionId}`
          );
          const data = await response.json();
          setScoreData(data);
        } catch (error) {
          setError("No setup data found for this session.");
        }
      } else {
        setError("Session ID is missing.");
      }
      setLoading(false);
    };

    fetchScores();
  }, [sessionId]);

  return { scoreData, loading, error };
};

const ScoreItem = ({ label, value }) => (
  <div className="flex justify-between">
    {label && <span>{label}</span>}
    <span>{value ?? "-"}</span>
  </div>
);

export default function Scores() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("sessionId");
    setSessionId(id);
  }, []);

  const { scoreData, loading, error } = useScores(sessionId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading scores...
      </div>
    );
  }

  return (
    <>
      {error ? (
        <div className="text-red-500 text-center text-xl">{error}</div>
      ) : (
        <>
          {scoreData && (
            <div className="flex flex-col h-screen">
              <div className="flex justify-between pt-3 px-4">
                <div>
                  <Image src={Pic} width={200} height={200} alt="Logo" />
                </div>
                {(scoreData.participants1 || scoreData.participants2) && (
                  <div className="text-white flex items-start">
                    <div className="bg-black flex p-3 gap-44 px-40 text-4xl font-bold">
                      <ScoreItem value={scoreData.participants1} />
                      <span className="text-6xl font-extrabold">VS</span>
                      <div className="flex justify-center">
                        <ScoreItem value={scoreData.participants2} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col">
                  {scoreData.category ? (
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-white text-4xl font-extrabold p-5">
                      <ScoreItem value={scoreData.category} />
                    </div>
                  ) : null}
                  {scoreData.match ? (
                    <div className="mt-2 flex justify-center">
                      <div className="flex text-3xl font-bold">
                        Match # <ScoreItem value={scoreData.match} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center text-white pb-2 mt-auto">
                <div className="flex bg-black p-5 gap-6 text-4xl font-bold border-slate-500 border-8">
                  <ScoreItem label="Tatami" value={scoreData.fieldTakami} />
                  {(scoreData.ageBracket || scoreData.ageDirection) && (
                    <div className="flex">
                      <ScoreItem value={scoreData.ageBracket} />
                      Yrs old <ScoreItem value={scoreData.ageDirection} />
                    </div>
                  )}
                  <ScoreItem value={scoreData.rank} />
                  <ScoreItem value={scoreData.ks} />
                  <ScoreItem value={scoreData.gender} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
