import { NextResponse } from "next/server";
import { buildTrend, sleep } from "@/lib/mock-data";

// Untuk demo error.tsx: bila ada ?fail, permintaan ganjil gagal dan genap berhasil,
// sehingga tombol "Coba lagi" bisa dibuktikan bekerja.
let failNext = true;

export async function GET(request: Request) {
  await sleep(2000); // bagian paling lambat di dasbor
  if (new URL(request.url).searchParams.has("fail")) {
    const shouldFail = failNext;
    failNext = !failNext;
    if (shouldFail) {
      return NextResponse.json({ error: "Layanan tren sedang gangguan (simulasi)" }, { status: 500 });
    }
  }
  return NextResponse.json(buildTrend());
}
