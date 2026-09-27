import { getWeatherCodeName } from "../../utils/getWeatherCodeName";
import type { WeatherData } from "../../types/weather";
import "../../styles/daily-forecast.css"

type DailyForecastProps = {
  weather: WeatherData;
};

export default function DailyForecast({ weather }: DailyForecastProps) {
  const { daily } = weather;

  return (
    <section className="daily">
      <h2 className="section__title daily__title">Daily forecast</h2>

      <div className="daily__forecast">
        {daily.time.map((date, i) => {
          const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
          const iconName = getWeatherCodeName(daily.weather_code[i]);

          return (
            <div key={date} className="block daily__day">
              <p className="daily__day-name">{dayName}</p>
              <img className="daily__icon" src={`/assets/images/icon-${iconName}.webp`} alt={iconName} width={40} height={40} />
              <div className="daily__temps">
                <span className="daily__temp-max">{Math.round(daily.temperature_2m_max[i])}°</span>
                <span className="daily__temp-min">{Math.round(daily.temperature_2m_min[i])}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}