import { getWeatherCodeName } from "../../utils/getWeatherCodeName";
import type { WeatherData } from "../../types/weather";
import "../../styles/current.css";

type CurrentWeatherProps = {
  weather: WeatherData;
  displayName: string;
  windUnit: "km/h" | "mph";
  precipUnit: "mm" | "in";
};

export default function CurrentWeather({
  weather,
  displayName,
  windUnit,
  precipUnit,
}: CurrentWeatherProps) {
  const { current } = weather;
  const iconName = getWeatherCodeName(current.weather_code);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Date().toLocaleDateString("en-US", dateOptions);

  return (
    <section className="current">
      <h2 className="visually-hidden">Current Location Temperature</h2>

      <div className="current__weather">
        <div className="current__location">
          <div className="current__city">{displayName}</div>
          <div className="current__date">{formattedDate}</div>
        </div>
        <div className="current__info">
          <img
            className="current__icon"
            src={`/assets/images/icon-${iconName}.webp`}
            alt={iconName}
            width={320}
            height={320}
          />
          <div className="current__temp">
            <span>{Math.round(current.temperature_2m)}</span>°
          </div>
        </div>
      </div>

      <div className="current__conditions">
        <div className="block current__condition">
          <p className="current__condition-title">Feels Like</p>
          <p className="current__condition-value">
            <span>{Math.round(current.apparent_temperature)}</span>°
          </p>
        </div>
        <div className="block current__condition">
          <p className="current__condition-title">Humidity</p>
          <p className="current__condition-value">
            <span>{current.relative_humidity_2m}</span>%
          </p>
        </div>
        <div className="block current__condition">
          <p className="current__condition-title">Wind</p>
          <p className="current__condition-value">
            {Math.round(current.wind_speed_10m)} {windUnit}
          </p>
        </div>
        <div className="block current__condition">
          <p className="current__condition-title">Precipitation</p>
          <p className="current__condition-value">
            {current.precipitation} {precipUnit}
          </p>
        </div>
      </div>
    </section>
  );
}