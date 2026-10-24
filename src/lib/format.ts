// Zona waktu ditetapkan eksplisit supaya hasil format sama di server dan di peramban.
const TZ = "Asia/Jakarta";

const time = new Intl.DateTimeFormat("id-ID", { timeStyle: "medium", timeZone: TZ });
const number = new Intl.NumberFormat("id-ID");

export const formatTime = (iso: string) => time.format(new Date(iso));
export const formatNumber = (n: number) => number.format(n);
