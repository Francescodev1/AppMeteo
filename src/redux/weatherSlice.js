/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '2ee22597b178bdccdbd82698d6abb548'; // Sostituisci con la tua API key

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    } console.log(response)
    return await response.json();
   
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: null },
  reducers: {},
  extraReducers: (builder) => {  // Utilizza il builder callback
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default weatherSlice.reducer;

*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '2ee22597b178bdccdbd82698d6abb548'; // Sostituisci con la tua API key

// Thunk per recuperare i dati meteo correnti
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city, { dispatch }) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    
    // Dopo aver ricevuto con successo i dati meteo correnti,
    // esegui la seconda fetch per le previsioni orarie.
    await dispatch(fetchHourlyForecast(city));

    return data;
  }
);

// Thunk per recuperare le previsioni orarie
export const fetchHourlyForecast = createAsyncThunk(
  'weather/fetchHourlyForecast',
  async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=it`);
    if (!response.ok) {
      throw new Error('Failed to fetch hourly forecast data');
    }
    return await response.json();
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: null, hourlyForecast: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.hourlyForecast = action.payload.list;
      });
  },
});

export default weatherSlice.reducer;
