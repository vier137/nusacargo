import { NextResponse } from "next/server";
import { PORTS, sleep } from "@/lib/mock-data";

export async function GET() {
  await sleep(150);
  return NextResponse.json(PORTS);
}
