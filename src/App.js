import React from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import WeatherAround from './components/WeatherAround';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container bg-info p-3">
      <h1 className="mt-4 text-center text-white">Che tempo che fa?</h1>
      <SearchBar />
      <WeatherInfo />
      <WeatherAround />
    </div>
  );
}

export default App;
