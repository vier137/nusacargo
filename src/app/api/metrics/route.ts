import { NextResponse } from "next/server";
import { buildMetrics, sleep } from "@/lib/mock-data";

export async function GET() {
  await sleep(600); // simulasi query agregat yang cukup berat
  return NextResponse.json(buildMetrics());
}
