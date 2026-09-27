import { getWeatherCodeName } from "../../utils/getWeatherCodeName";
import type { WeatherData } from "../../types/weather";
import "../../styles/hourly-forecast.css";

type HourlyForecastProps = {
  weather: WeatherData;
  selectedDay: number;
  onSelectDay: (day: number) => void;
};

export default function HourlyForecast({
  weather,
  selectedDay,
  onSelectDay,
}: HourlyForecastProps) {
  const { hourly, daily } = weather;

  const startHour = selectedDay * 24;
  const endHour = startHour + 24;

  return (
    <section className="hourly">
      <div className="hourly__content">
        <div className="hourly__header">
          <h2 className="section__title hourly__title">Hourly forecast</h2>
          <select
            className="dropdown hourly__select"
            value={selectedDay}
            onChange={(e) => onSelectDay(Number(e.target.value))}
          >
            {daily.time.map((date, i) => {
              const dayName = new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
              });
              return (
                <option key={date} value={i}>
                  {dayName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="hourly__hours">
          {hourly.time.slice(startHour, endHour).map((time, i) => {
            const hour = new Date(time).toLocaleString("en-US", {
              hour: "numeric",
              hour12: true,
            });
            const iconName = getWeatherCodeName(hourly.weather_code[startHour + i]);
            const temp = Math.round(hourly.temperature_2m[startHour + i]);

            return (
              <div key={time} className="hourly__hour">
                <img
                  className="hourly__icon"
                  src={`/assets/images/icon-${iconName}.webp`}
                  alt={iconName}
                  width={24}
                  height={24}
                />
                <span className="hourly__hour-label">{hour}</span>
                <span className="hourly__temp">{temp}°</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}