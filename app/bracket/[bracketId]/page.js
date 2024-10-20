"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BracketPage() {
  const { bracketId } = useParams();
  const [iframeSrc, setIframeSrc] = useState(
    `https://brackethq.com/b/${bracketId}/embed/?zoom=0`
  );

  // Function to update iframe source
  const updateIframe = () => {
    setIframeSrc(
      `https://brackethq.com/b/${bracketId}/embed/?zoom=${new Date().getTime()}`
    ); // Use a timestamp to bypass cache
  };

  useEffect(() => {
    const interval = setInterval(updateIframe, 5000); // Update every 1 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [bracketId]); // Dependency array to ensure the effect runs when bracketId changes

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl">
        <iframe
          src={iframeSrc}
          width="100%"
          height="550"
          title="Bracket"
        ></iframe>
      </div>
    </div>
  );
}
