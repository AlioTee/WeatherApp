import { useState, useCallback } from "react";
import type { WeatherData, TempUnit, WindUnit, PrecipUnit } from "../types/weather";
import { fetchGeoData } from "../api/geocode";
import { fetchWeatherData } from "../api/weather";

export function useWeather(tempUnit: TempUnit, windUnit: WindUnit, precipUnit: PrecipUnit) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [displayName, setDisplayName] = useState<string>("");

  const search = useCallback(
    async (searchTerm: string) => {
      setLoading(true);
      setError(null);

      try {
        const SETTLEMENT_TYPES = ["city", "town", "village", "hamlet", "suburb", "municipality"];

        const geoResults = await fetchGeoData(searchTerm);
        if (!geoResults.length) throw new Error("No results found");

       const queryWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
       const matchingResults = geoResults.filter((result) =>
          queryWords.every((word) => result.display_name.toLowerCase().includes(word))
        );
const candidates = matchingResults.length > 0 ? matchingResults : geoResults;

const geo = candidates.find((r) => SETTLEMENT_TYPES.includes(r.addresstype)) ?? candidates[0];

setDisplayName(`${geo.name}, ${geo.address.country_code.toUpperCase()}`);

        const weatherData = await fetchWeatherData(geo.lat, geo.lon, tempUnit, windUnit, precipUnit);
        setWeather(weatherData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    },
    [tempUnit, windUnit, precipUnit]
  );

  return { loading, error, weather, displayName, search };
}