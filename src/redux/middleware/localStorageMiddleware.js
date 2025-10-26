// Middleware to save weatherData to localStorage whenever it changes
export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Save to localStorage after any weather-related action
  if (action.type?.startsWith('weather/')) {
    const state = store.getState();
    try {
      const serializedState = JSON.stringify(state.weather.weatherData);
      localStorage.setItem('weatherData', serializedState);
    } catch (err) {
      console.error('Could not save weather data to localStorage', err);
    }
  }
  
  return result;
};
