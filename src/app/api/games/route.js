// app/api/games/route.js (for Next.js 13+ with the App Router)
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // Construct the path to the dummyGames.json file in the root directory
  const filePath = path.resolve(process.cwd(), "mocks", "dummyGames.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const games = JSON.parse(jsonData);

  return NextResponse.json(games);
}
