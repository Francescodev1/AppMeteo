import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

export default function WeatherAround() {
  const [WeatherAround, setWeatherAround] = useState([]);

  const italianCitiesList = ['Rio de Janeiro', 'New York', 'Bogota', 'Den haag', 'Amsterdam'];

  const fetchWeatherAround = async () => {
    const apiKey = '2ee22597b178bdccdbd82698d6abb548'; // Sostituisci con la tua chiave API
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const promises = italianCitiesList.map(async (cityName) => {
      const response = await fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric&lang=it`);
      const data = await response.json();
      return data;
    });

    const weatherData = await Promise.all(promises);
    setWeatherAround(weatherData);
  };

  useEffect(() => {
    fetchWeatherAround();
  }, []);

  return (
    <div className="m-3">
      {/* Sezione per le città italiane */}
      <Row className="mt-3  justify-content-center ">
        {WeatherAround.map((cityWeather, index) => (
          <Col key={index} md={2}>
            <Card className='text-center'>
              <Card.Body>
                <Card.Title className='text-center'>{cityWeather.name}</Card.Title>
                <Card.Text>
                  Temperatura: {cityWeather.main.temp}°C
                  <br />
                  Condizioni: {cityWeather.weather[0].description}
                </Card.Text>
                <Image src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt="Weather Icon" />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
