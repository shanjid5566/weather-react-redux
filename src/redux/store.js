import { configureStore } from "@reduxjs/toolkit";
// Use the fixed slice module (was malformed in weatherSlice.js)
import weatherReducer from "./features/weather/weatherSliceFixed.js";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    weather: weatherReducer,
  },
});
