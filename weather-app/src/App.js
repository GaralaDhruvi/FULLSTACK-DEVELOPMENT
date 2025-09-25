import React, { useState } from 'react';
import './App.css';

const weatherData = {
  Ahmedabad: 40,
  Mumbai: 32,
  Delhi: 39,
  Chennai: 35,
};

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [error, setError] = useState('');

  const apiKey = '195fa8de45164b7da82101607253006';

  const apiUrl = (cityName) =>
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityName)}`;

  const getWeather = async () => {
    setWeather('');
    setError('');

    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    if (weatherData[city]) {
      setWeather(`The weather in ${city} is ${weatherData[city]}°C (hardcoded)`);
      return;
    }

    try {
      const response = await fetch(apiUrl(city));
      const data = await response.json();

      if (data.error) {
        setError('City not found. Please try another.');
      } else {
        setWeather(`The weather in ${data.location.name} is ${data.current.temp_c}°C`);
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Click here to Get Weather</button>
      {weather && <p className="weather">{weather}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
