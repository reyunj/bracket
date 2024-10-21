"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BracketPage() {
  const { bracketId } = useParams();
  const [iframeSrc, setIframeSrc] = useState(
    `https://brackethq.com/b/${bracketId}/embed/?zoom=0`
  );

  // Extract tournament name and category from the URL
  const tournamentName = new URLSearchParams(window.location.search).get(
    "tournament"
  );
  const category = new URLSearchParams(window.location.search).get("category");

  const updateIframe = () => {
    setIframeSrc(
      `https://brackethq.com/b/${bracketId}/embed/?zoom=${new Date().getTime()}`
    );
  };

  useEffect(() => {
    const interval = setInterval(updateIframe, 5000);
    return () => clearInterval(interval);
  }, [bracketId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl border-8 border-neutral-600 rounded-lg">
        <div className="pl-5 pt-5">
          <h1 className="text-xl font-bold mb-4">Category: {category}</h1>
          <h2 className="text-lg mb-4"> Tournament: {tournamentName}</h2>
        </div>
        <iframe src={iframeSrc} width="100%" height="550"></iframe>
      </div>
    </div>
  );
}
