"use client";
import { useState } from "react";

export default function Home() {
  const [bracketId, setBracketId] = useState("");

  const handleBracketIdChange = (e) => {
    setBracketId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    // Open the new page in a new tab
    window.open(`/bracket/${bracketId}`, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl mb-4">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={bracketId}
            onChange={handleBracketIdChange}
            placeholder="Enter bracket ID"
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="ml-2 border p-2 bg-blue-500 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
