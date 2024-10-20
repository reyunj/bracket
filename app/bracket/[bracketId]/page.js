"use client";
import { useParams } from "next/navigation";

export default function BracketPage() {
  const { bracketId } = useParams();

  const iframeSrc = `https://brackethq.com/b/${bracketId}/embed/?zoom=0`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl">
        <iframe src={iframeSrc} width="100%" height="550"></iframe>
      </div>
    </div>
  );
}
