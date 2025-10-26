import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchWeatherData = createAsyncThunk(
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
export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.weatherData = [];
      state.loading = false;
      state.error = null;
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
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
