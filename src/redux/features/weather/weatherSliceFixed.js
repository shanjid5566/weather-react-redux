import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (cityName, { rejectWithValue }) => {
    try {
      const apiKey = "8f68d836d78fa6935d616d5310d23f80";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      
      const data = await response.json();
      
      // Check if the API returned an error
      if (!response.ok || data.cod === "404" || data.cod === 404) {
        return rejectWithValue(data.message || `City "${cityName}" not found`);
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch weather data");
    }
  }
);

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("weatherData");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load weather data from localStorage", err);
    return [];
  }
};

const initialState = {
  weatherData: loadFromLocalStorage(),
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
        state.error = null;
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
        state.error = action.payload || action.error?.message || 'Failed to fetch weather data';
      });
  },
});

export const { clearWeatherData, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
