import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Image, Row, Col } from 'react-bootstrap';

export default function WeatherInfo() {
  const weather = useSelector((state) => state.weather.data);

  const IconUrl = (iconCode) => {
      return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  return (
    <div className="m-3">
      {weather ? (
        <Card>
          <Card.Body className="text-center">
            <Card.Title className='text-center display-5'>{weather.name}</Card.Title>
            <Card.Text>
              Temperatura: {weather.main.temp}°C
              <br />
              Condition: {weather.weather[0].description}
              <br />
              Umidità: {weather.main.humidity}%
              <br />
              Vento: {weather.wind.speed}m/s
            
            </Card.Text>
            <Image src={IconUrl(weather.weather[0].icon)} alt="Weather Icon" />
          </Card.Body>

          
        </Card>
        
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}
