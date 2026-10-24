import "server-only"; // build gagal bila file ini ikut diimpor komponen klien

export function apiUrl(path: string): string {
  const base = process.env.CARGO_API_URL || "http://localhost:3000/api";
  return `${base}${path}`;
}

export async function fetchJson<T>(
  path: string,
  init: RequestInit,
  failMessage: string,
): Promise<T> {
  const res = await fetch(apiUrl(path), init);
  if (!res.ok) throw new Error(failMessage);
  return res.json();
}
