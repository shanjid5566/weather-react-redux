import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, clearWeatherData, removeCity } from "../redux/features/weather/weatherSliceFixed";
import WeatherCard from "./WeatherCard";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { weatherData, loading, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeatherData(city));
      setCity(""); // Clear input after search
    }
  };

  const handleRemoveCity = (cityId) => {
    dispatch(removeCity(cityId));
  };

  const handleClearAll = () => {
    dispatch(clearWeatherData());
  };

  return (
    <div className="mb-6 w-full px-3 sm:px-4 lg:px-6 mx-auto max-w-7xl mt-4">
      <form
        className="relative flex w-full max-w-4xl rounded-full shadow-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search for a city..."
          className="flex-1 w-full rounded-l-full py-2 sm:py-3 px-4 sm:px-6 text-base sm:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-full bg-blue-500 px-4 sm:px-6 py-2 sm:py-3 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          aria-label="Search"
        >
          <BiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </form>
      
      {loading && <p className="mt-4 text-center text-blue-600 font-semibold">Loading...</p>}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">❌ {error}</p>
        </div>
      )}
      
      {weatherData.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              Search Results ({weatherData.length})
            </h3>
            <button
              onClick={handleClearAll}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {weatherData
              .filter((cityData) => cityData && cityData.id && cityData.name)
              .map((cityData) => (
                <WeatherCard
                  key={cityData.id}
                  city={cityData}
                  onRemove={handleRemoveCity}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchBar;
