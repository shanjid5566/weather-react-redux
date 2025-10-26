import { BiTrash } from "react-icons/bi";

const WeatherCard = ({ city, onRemove }) => {
  // Validate city data
  if (!city || !city.name || !city.main || !city.weather || !city.weather[0]) {
    return null; // Don't render if data is incomplete
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative">
      {onRemove && (
        <button
          onClick={() => onRemove(city.id)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
          aria-label="Remove city"
        >
          <BiTrash size={20} />
        </button>
      )}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{city.name}</h2>
        {city.sys?.country && (
          <p className="text-gray-600 mb-2">{city.sys.country}</p>
        )}
        <div className="flex justify-center items-center mb-4">
          <img
            src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
            alt={city.weather[0].description}
            className="w-20 h-20"
          />
        </div>
        <p className="text-4xl font-bold text-blue-600 mb-2">
          {Math.round(city.main.temp)}°C
        </p>
        <p className="text-lg text-gray-700 capitalize mb-4">
          {city.weather[0].description}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-semibold">Feels Like</p>
            <p>{Math.round(city.main.feels_like)}°C</p>
          </div>
          <div>
            <p className="font-semibold">Humidity</p>
            <p>{city.main.humidity}%</p>
          </div>
          {city.wind?.speed && (
            <div>
              <p className="font-semibold">Wind Speed</p>
              <p>{city.wind.speed} m/s</p>
            </div>
          )}
          <div>
            <p className="font-semibold">Pressure</p>
            <p>{city.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
