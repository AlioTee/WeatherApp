import type { GeoResult } from "../types/weather";

export async function fetchGeoData(search: string): Promise<GeoResult[]> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=jsonv2&addressdetails=1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}