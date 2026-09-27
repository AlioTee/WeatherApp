import "../styles/hero.css";

type HeroProps = {
  title: string;
  unit: string;
  onUnitChange: (unit: "C" | "F") => void;
  isSearchActive?: boolean;
};

export default function Hero({ title, unit, onUnitChange, isSearchActive = false }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className={`hero__heading${isSearchActive ? " hero__heading--side" : ""}`}>
          {isSearchActive ? (
            <>
              <select
                className="dropdown hero__dropdown"
                value={unit}
                onChange={(e) => onUnitChange(e.target.value as "C" | "F")}
                aria-label="Metrics"
              >
                <option value="">Metrics</option>
                <option value="C">°C</option>
                <option value="F">°F</option>
              </select>
              <h1 className="hero__title">{title}</h1>
            </>
          ) : (
            <>
              <h1 className="hero__title">{title}</h1>
              <select
                className="dropdown hero__dropdown"
                value={unit}
                onChange={(e) => onUnitChange(e.target.value as "C" | "F")}
                aria-label="Metrics"
              >
                <option value="">Metrics</option>
                <option value="C">°C</option>
                <option value="F">°F</option>
              </select>
            </>
          )}
        </div>
      </div>
    </section>
  );
}