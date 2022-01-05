import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleResponse(response) {
    setLoaded(true);
    setWeather({
      Temperature: response.data.main.temp,
      Wind: response.data.wind.speed,
      Humidity: response.data.main.humidity,
      Description: response.data.weather[0].description,
      Icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city === "") {
      alert(`Please enter a city`);
    } else {
      const apiKey = "c95b7792f2deeca8f4736c654342258c";
      const apiUnit = "metric";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${apiUnit}`;
      axios.get(apiUrl).then(handleResponse);
    }
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Type a city..."
        autoFocus
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.Temperature)}°C</li>
          <li>Description: {weather.Description}</li>
          <li>Humidity: {weather.Humidity}%</li>
          <li>Wind: {weather.Wind}km/h</li>
          <li>
            <img src={weather.Icon} alt={weather.Description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
