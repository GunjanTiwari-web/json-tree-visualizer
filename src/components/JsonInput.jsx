import React, { useState } from "react";

const JsonInput = ({ onVisualize, darkMode }) => {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");

  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setError("");
      onVisualize(parsed);
    } catch {
      setError("❌ Invalid JSON format");
    }
  };

  return (
    <div
      className={`p-4 rounded-xl shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <textarea
        className={`w-full h-48 p-3 rounded-md font-mono text-sm outline-none resize-none border transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
            : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
        }`}
        placeholder="Paste your JSON here..."
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />

      {error && (
        <p className="text-red-400 text-sm mt-2 font-medium">{error}</p>
      )}

      <button
        onClick={handleVisualize}
        className={`mt-3 px-4 py-2 rounded font-semibold ${
          darkMode
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Visualize JSON
      </button>
    </div>
  );
};

export default JsonInput;
