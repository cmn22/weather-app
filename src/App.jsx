import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await fetchWeather(cityName);
        setWeatherData(data);
        setCityName("");
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={fetchData}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {weatherData && (
          <div>
            <h2>
              {weatherData.location.name}, {weatherData.location.region},{" "}
              {weatherData.location.country}
            </h2>
            <p>
              Temperature: {isCelsius ? weatherData.current.temp_c : weatherData.current.temp_f} °{isCelsius ? "C" : "F"}
            </p>
            <button onClick={() => setIsCelsius(!isCelsius)}>
              Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
            </button>
            <p>Condition: {weatherData.current.condition.text}</p>
            <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
            />
            <p>Humidity: {weatherData.current.humidity}</p>
            <p>Pressure: {weatherData.current.pressure_mb}</p>
            <p>Visibility: {weatherData.current.vis_km}</p>
          </div>
      )}
    </div>
  );
};

export default App;
