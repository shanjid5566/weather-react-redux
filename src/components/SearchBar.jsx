import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const [city, setCity] = useState("");
  return (
    <div className="mb-6 max-w-7xl w-full px-4 mx-auto">
      <form className="relative flex w-5xl rounded-full shadow-md mx-auto">
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
    </div>
  );
};
export default SearchBar;
