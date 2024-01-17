import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { Form, Button, InputGroup } from 'react-bootstrap';

export default function SearchBar() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchWeather(city));
  };

  return (
    <Form onSubmit={e => e.preventDefault()} className="m-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Inserisci la citta' da cercare"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Cerca
        </Button>
      </InputGroup>
    </Form>
  );
}
