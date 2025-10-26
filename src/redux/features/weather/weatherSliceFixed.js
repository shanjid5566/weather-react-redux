import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (cityName) => {
    const apiKey = "8f68d836d78fa6935d616d5310d23f80";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    return response.json();
  }
);

const initialState = {
  weatherData: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.weatherData = [];
      state.loading = false;
      state.error = null;
    },
    removeCity: (state, action) => {
      state.weatherData = state.weatherData.filter(
        (city) => city.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        // Add new city to the array if it doesn't already exist
        const cityExists = state.weatherData.find(
          (city) => city.id === action.payload.id
        );
        if (!cityExists) {
          state.weatherData.push(action.payload);
        }
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || action.error || 'Failed';
      });
  },
});

export const { clearWeatherData, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
