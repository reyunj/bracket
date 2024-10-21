"use client";

import { useState } from "react";
import Footer from "../component/Footer";

export default function Bracket() {
  const [bracketId, setBracketId] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [category, setCategory] = useState("");

  const handleBracketIdChange = (e) => {
    setBracketId(e.target.value);
  };

  const handleTournamentNameChange = (e) => {
    setTournamentName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tournamentName || !category || !bracketId) {
      alert("All fields are required!");
      return;
    }

    const tournamentParam = encodeURIComponent(tournamentName);
    const categoryParam = encodeURIComponent(category);
    const bracketUrl = `/bracket/${bracketId}?tournament=${tournamentParam}&category=${categoryParam}`;
    window.open(bracketUrl, "_blank");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4">Bracket Generator</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md mb-4 px-4"
        >
          <input
            type="text"
            value={bracketId}
            onChange={handleBracketIdChange}
            placeholder="Enter bracket ID"
            className="border border-gray-300 p-3 rounded-md w-full mb-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Category"
            className="border border-gray-300 p-3 rounded-md w-full mb-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={tournamentName}
            onChange={handleTournamentNameChange}
            placeholder="Tournament Name"
            className="border border-gray-300 p-3 rounded-md w-full mb-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="border border-transparent p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
