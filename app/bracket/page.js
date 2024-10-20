"use client";

import { useState } from "react";
import Footer from "../component/Footer";

export default function Bracket() {
  const [bracketId, setBracketId] = useState("");

  const handleBracketIdChange = (e) => {
    setBracketId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(`/bracket/${bracketId}`, "_blank");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4">Bracket Generator</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full max-w-md mb-4 px-4"
        >
          <input
            type="text"
            value={bracketId}
            onChange={handleBracketIdChange}
            placeholder="Enter bracket ID"
            className="border border-gray-300 p-3 rounded-md w-full sm:w-3/4 mb-2 sm:mb-0 sm:mr-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
