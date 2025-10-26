import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weather/weatherSlice.js";
import { thunk } from "redux-thunk";
export const store = configureStore({
  reducer: {
    // Add your reducers here
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
