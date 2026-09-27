import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import type { WeatherData } from "../../types/weather";
import "../../styles/dashboard.css";

type DashboardProps = {
  weather: WeatherData;
  displayName: string;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  tempUnit: "C" | "F";
  windUnit: "km/h" | "mph";
  precipUnit: "mm" | "in";
};

export default function Dashboard({
  weather,
  displayName,
  selectedDay,
  onSelectDay,
  windUnit,
  precipUnit,
}: DashboardProps) {
  return (
    <div className="dashboard">
      <CurrentWeather
        weather={weather}
        displayName={displayName}
        windUnit={windUnit}
        precipUnit={precipUnit}
      />
      <DailyForecast weather={weather} />
      <HourlyForecast
        weather={weather}
        selectedDay={selectedDay}
        onSelectDay={onSelectDay}
      />
    </div>
  );
}