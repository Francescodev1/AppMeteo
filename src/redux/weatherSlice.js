import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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





