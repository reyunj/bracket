"use client";
import Image from "next/image";
import Logo from "@/app/assets/Logo.png";
import Footer from "./component/Footer";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const handleScoreboardClick = () => {
    const uniqueId = uuidv4();
    localStorage.setItem("scoreboardId", uniqueId);
    window.open(`/scoreboard?sessionId=${uniqueId}`, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="mb-6">
          <Image
            src={Logo}
            alt="Karate Network Logo"
            width={0}
            height={0}
            className="mb-4"
          />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          The Karate Network Management System
        </h1>
        <div className="flex flex-col space-y-4">
          {/* <Link href="/bracket">
            <button className="border border-transparent p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 w-64 text-center">
              Bracket Generator
            </button>
          </Link> */}
          <button
            onClick={handleScoreboardClick}
            className="border border-transparent p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 w-64 text-center"
          >
            Begin Setup
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
