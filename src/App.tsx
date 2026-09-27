import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./components/dashboard/Dashboard";
import { useWeather } from "./hooks/useWeather";
import "./styles/global.css";

function App() {
  const [unit, setUnit] = useState<"C" | "F"| "">("");
  const [selectedDay, setSelectedDay] = useState(0);
  const [heroTitle, setHeroTitle] = useState("Search for real-time weather data");
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const tempUnit = (unit || "C") as "C" | "F";
  const windUnit = tempUnit === "F" ? "mph" : "km/h";
  const precipUnit = tempUnit === "F" ? "in" : "mm";

  const { loading, error, weather, displayName, search } = useWeather(tempUnit, windUnit, precipUnit);

  return (
    <div className="app-window">
      <Header
        onSearch={search}
        isLoading={loading}
        onSearchSubmit={() => {
          setHeroTitle("Thanks for using!");
          setIsSearchActive(true);
        }}
      />
      <main className="main wrapper">
        <Hero title={heroTitle} unit={unit} onUnitChange={setUnit} isSearchActive={isSearchActive} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weather && (
          <Dashboard
            weather={weather}
            displayName={displayName}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            tempUnit={tempUnit}
            windUnit={windUnit}
            precipUnit={precipUnit}
          />
        )}
      </main>
    </div>
  );
}

export default App;