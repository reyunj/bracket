// app/api/save-scores/route.js
import { NextResponse } from "next/server";

let scoreDataStore = {}; // Temporary in-memory database

export async function POST(request) {
  const { sessionId, formData } = await request.json();
  if (!sessionId || !formData) {
    return NextResponse.json(
      { message: "Session ID and data are required." },
      { status: 400 }
    );
  }

  scoreDataStore[sessionId] = formData;
  return NextResponse.json({ message: "Scores saved successfully!" });
}
