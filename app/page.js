import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/Logo.jpg";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="mb-6">
          <Image
            src={Logo}
            alt="Karate Network Logo"
            width={250}
            height={250}
            className="mb-4"
          />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to The Karate Network Management System
        </h1>
        <div className="flex flex-col space-y-4">
          <Link href="/bracket">
            <button className="border border-transparent p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 w-64 text-center">
              Bracket Generator
            </button>
          </Link>
          <Link href="/scoreboard">
            <button className="border border-transparent p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 w-64 text-center">
              Scoreboard
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
