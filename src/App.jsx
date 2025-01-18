import React, {useEffect, useState} from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./styles/App.css"

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);
  }, []);

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRecentSearch = async (city) => {
    setLoading(true);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">

      <h1>Weather App</h1>

      <input
        className="input-field"
        type="text"
        placeholder="Enter city name..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={fetchData}
      />

      {loading && (
          <p>Loading...</p>
      )}

      {error && (
          <div className="error-message">{error}</div>
      )}

      {weatherData && (
          <div className="weather-details">
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

      {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h3>Recent Searches</h3>
            <ul>
              {recentSearches.map((city, index) => (
                  <li key={index}>
                    <button
                        onClick={() => handleRecentSearch(city)}
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
