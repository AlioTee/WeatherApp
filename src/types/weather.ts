// Shape of one result from the Nominatim geocoding search
export type GeoResult = {
  lat: string;
  lon: string;
  display_name: string;
  name: string;
  addresstype: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    country?: string;
    country_code: string;
  };
};

// Shape of the Open-Meteo forecast response
// (only the fields we actually request are included)
export type WeatherData = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    precipitation: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
};

export type TempUnit = "C" | "F";
export type WindUnit = "km/h" | "mph";
export type PrecipUnit = "mm" | "in";