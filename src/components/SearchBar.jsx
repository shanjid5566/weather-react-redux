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
    <div className="mb-6 max-w-7xl w-full px-4 mx-auto">
      <form
        className="relative flex w-5xl rounded-full shadow-md mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search for a city..."
          className="grow rounded-l-full py-3 px-6 text-lg text-gray-700 focus:outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-full bg-blue-500 px-6 py-3 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 focus:outline-none"
          aria-label="Search"
        >
          <BiSearch size={24} />
        </button>
      </form>
      
      {loading && <p className="mt-4 text-center text-blue-600 font-semibold">Loading...</p>}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">❌ {error}</p>
        </div>
      )}
      
      {weatherData.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Search Results ({weatherData.length})
            </h3>
            <button
              onClick={handleClearAll}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
