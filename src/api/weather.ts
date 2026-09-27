import type { WeatherData, TempUnit, WindUnit, PrecipUnit } from "../types/weather";

export async function fetchWeatherData(
  lat: string,
  lon: string,
  tempUnit: TempUnit,
  windUnit: WindUnit,
  precipUnit: PrecipUnit
): Promise<WeatherData> {
  const apiTempUnit = tempUnit === "F" ? "fahrenheit" : "celsius";
  const apiWindUnit = windUnit === "mph" ? "mph" : "kmh";
  const apiPrecipUnit = precipUnit === "in" ? "inch" : "mm";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&wind_speed_unit=${apiWindUnit}&temperature_unit=${apiTempUnit}&precipitation_unit=${apiPrecipUnit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}