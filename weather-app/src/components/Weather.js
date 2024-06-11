import React, { useState } from 'react';
import axios from 'axios';
import { FaSearchLocation } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
//import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  const apiKey = 'e0e2009d2172423bad4142234240906'; 

  const fetchWeatherData = async (query) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;
      const response = await axios.get(url);
      setWeatherData(response.data);
      console.log(weatherData)
      setCity(response.data.location.name);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeatherData(city.trim());
    }
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          //setCity('Current Location');
          fetchWeatherData(`${latitude},${longitude}`);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    } else {
      setError({ message: 'Geolocation is not supported by this browser.' });
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button type="submit" title="Get Weather"><FaSearchLocation /></button>
      </form>
      <button className='current' onClick={handleCurrentLocationClick}>
        <MdLocationOn /> Current Location
      </button>
      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='error'>city not found or {error.message}</div>}
      {weatherData && (
        <div className='info'>
          <p>Weather in {weatherData.location.name}</p>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Feels like: {weatherData.current.feelslike_c} °C</p>
          <p>Weather: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
