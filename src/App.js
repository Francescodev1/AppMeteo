import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import WeatherAround from './components/WeatherAround';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container sfondo p-3 d-flex flex-column my-5">
        <h1 className="mt-4 text-center text-white">Che tempo che fa?</h1>

        <div className="text-center p-2">
          <Link to="/">
            <button className="btn btn-outline-light mx-2">Home</button>
          </Link>
          <Link to="/weather-info">
            <button className="btn btn-outline-light mx-2">Weather Info</button>
          </Link>
        </div>
        
        <SearchBar />

        {/* Utilizzo di Routes al posto di Switch */}
        <Routes>
          <Route path="/weather-info/:cityName" element={<WeatherInfo />} />
          <Route path="/" element={<WeatherAround />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
