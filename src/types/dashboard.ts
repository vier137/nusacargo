export interface Port {
  code: string;
  name: string;
  island: string;
}

export interface Metrics {
  totalShipments: number;
  inTransit: number;
  delayed: number;
  ontimeRate: number; // persen
  generatedAt: string; // ISO, dipakai untuk membuktikan perilaku cache
}

export interface TrendPoint {
  day: string;
  ontimeRate: number;
}

export interface Trend {
  points: TrendPoint[];
  generatedAt: string;
}
