import React, { useState } from "react";

const SearchBar = ({ onSearch, darkMode }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-xl shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <input
        type="text"
        placeholder="🔍 Search nodes..."
        value={query}
        onChange={handleChange}
        className={`flex-grow px-3 py-2 rounded-md outline-none border text-sm transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
            : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
        }`}
      />
      <button
        onClick={() => onSearch(query)}
        className={`px-4 py-2 rounded font-semibold transition-colors duration-300 ${
          darkMode
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
