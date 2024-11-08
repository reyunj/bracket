import { NextResponse } from "next/server";

let scoreDataStore = {};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { message: "Session ID is required." },
      { status: 400 }
    );
  }

  const data = scoreDataStore[sessionId];
  if (!data) {
    return NextResponse.json(
      { message: "No data found for this session." },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
