import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather, fetchHourlyForecast } from '../redux/weatherSlice'; 
import { Card, Image, Row, Col } from 'react-bootstrap';

export default function WeatherInfo({ city }) { // Accetta la città come prop
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const hourlyForecast = useSelector((state) => state.weather.hourlyForecast);

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
      dispatch(fetchHourlyForecast(city));
    }
  }, [dispatch, city]);

  const IconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="m-3">
      {weather ? (
        <div>
          {/* Card Principale */}
          <Card className="mb-3">
            <Card.Body className="text-center">
              <Card.Title className='text-center display-3'>{weather.name}</Card.Title>
              <Card.Text>
                <p className='display-1'>{Math.round(weather.main.temp)}°C</p>
                <p className='display-6'>{weather.weather[0].description}</p>
              
                Umidità: {weather.main.humidity}%
                <br />
                Vento: {weather.wind.speed}m/s
                <br />
                Min. {weather.main.temp_min}°C - Max. {weather.main.temp_max}°C
              </Card.Text>
              <Image  src={IconUrl(weather.weather[0].icon)} alt="Weather Icon" />
            </Card.Body>
          </Card>

          {/* Card Orarie */}
          {hourlyForecast && hourlyForecast.length > 0 ? (
            <Row xs={2} md={4} lg={6}>
              {hourlyForecast.slice(0, 6).map((hour, index) => (
                <Col key={index} className="mb-3">
                  <Card className='text-center'>
                    <Card.Body>
                      <Card.Title>
                        {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Card.Title>

                      <Image src={IconUrl(hour.weather[0].icon)} alt="Weather Icon" />
                      <Card.Text>
                      Temperatura: {Math.round(weather.main.temp)}°C
                        <br />
                        {hour.weather[0].description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No hourly weather data available</p>
          )}
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}

