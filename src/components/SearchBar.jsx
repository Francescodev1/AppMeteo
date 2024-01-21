import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Aggiungi questa linea

  const handleSearch = () => {
    dispatch(fetchWeather(city));
    navigate('/weather-info/${city'); // Aggiungi il percorso a cui vuoi navigare
  };

  return (
    <Form onSubmit={e => { e.preventDefault(); handleSearch(); }} className="m-3">
      <InputGroup className='d-flex  mx-auto p-3' style={{ width: '400px' }}>
        <Form.Control
          type="text"
          placeholder="Inserisci la citta' da cercare"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button className="p-3" variant="dark" type="submit">
          Cerca
        </Button>
      </InputGroup>
    </Form>
  );
}
