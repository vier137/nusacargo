import { NextResponse } from "next/server";
import { MOCK_SHIPMENTS, sleep } from "@/lib/mock-data";

export async function GET() {
  await sleep(300);
  return NextResponse.json(MOCK_SHIPMENTS);
}
