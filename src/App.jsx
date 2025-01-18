import React, {useEffect, useState} from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);
  }, []);

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await fetchWeather(cityName);
        setWeatherData(data);
        setCityName("");
        setError(null);

        // Add to localStorage
        if (!recentSearches.includes(cityName)) {
          const updatedSearches = [cityName, ...recentSearches.slice(0, 4)]; // Store last 5 searches
          setRecentSearches(updatedSearches);
          localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleRecentSearch = async (city) => {
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError("City not found. Please try again.");
    } finally {
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
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
          <div>
            <h3>Recent Searches</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {recentSearches.map((city, index) => (
                  <li key={index}>
                    <button
                        onClick={() => handleRecentSearch(city)}
                        style={{ margin: "5px", padding: "5px", cursor: "pointer" }}
                    >
                      {city}
                    </button>
                  </li>
              ))}
            </ul>
          </div>
      )}
    </div>
  );
};

export default App;
