import { NextResponse } from "next/server";
import { MOCK_SHIPMENTS, sleep } from "@/lib/mock-data";

type Ctx = { params: Promise<{ awb: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  const { awb } = await params;
  await sleep(400);
  const found = MOCK_SHIPMENTS.find((s) => s.awb.toUpperCase() === awb.toUpperCase());
  if (!found) return NextResponse.json({ error: "Resi tidak ditemukan" }, { status: 404 });
  return NextResponse.json(found);
}
