// src/App.jsx
import React, { useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeView from "./components/TreeView";
import SearchBar from "./components/SearchBar";
import { jsonToNodes } from "./utils/jsonToNodes";

export default function App() {
  const [tree, setTree] = useState({ nodes: [], edges: [] });
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [focusedNodeId, setFocusedNodeId] = useState(null);

  // ✅ Visualize button
  const handleVisualize = (data) => {
    const { nodes, edges } = jsonToNodes(data);
    setTree({ nodes, edges });
    setMessage("");
    setFocusedNodeId(null);
  };

  // ✅ Search by JSON path (e.g., $.user.name)
  const handleSearch = (query) => {
    if (!query.trim()) {
      setMessage("");
      setTree((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) => ({
          ...n,
          style: { ...n.style, border: "1px solid #ccc", boxShadow: "none" },
        })),
      }));
      return;
    }

    const exactQuery = query.replace(/^\$\.?/, ""); // remove "$." if present
    let found = false;
    let matchedNodeId = null;

    const updatedNodes = tree.nodes.map((node) => {
      const isMatch = node.data.fullPath === exactQuery;
      if (isMatch) {
        found = true;
        matchedNodeId = node.id;
      }

      return {
        ...node,
        style: {
          ...node.style,
          border: isMatch ? "3px solid #10b981" : "1px solid #ccc",
          boxShadow: isMatch ? "0 0 10px #10b981" : "none",
        },
      };
    });

    if (found) {
      setMessage("✅ Match found");
      setFocusedNodeId(matchedNodeId);
    } else {
      setMessage("❌ No match found");
      setFocusedNodeId(null);
    }

    setTree((prev) => ({ ...prev, nodes: updatedNodes }));
  };

  // ✅ Node click → copy path
  const handleNodeClick = (node) => {
    navigator.clipboard.writeText(node.data.fullPath || node.data.label);
    alert(`📋 Copied path: ${node.data.fullPath || node.data.label}`);
  };

  // ✅ Reset
  const handleReset = () => {
    setTree({ nodes: [], edges: [] });
    setMessage("");
    setFocusedNodeId(null);
  };

  return (
    <div
      className={`p-6 space-y-4 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-500">
          🌳 JSON Tree Visualizer
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            ♻️ Reset
          </button>
        </div>
      </div>

      <JsonInput onVisualize={handleVisualize} darkMode={darkMode} />
      <SearchBar onSearch={handleSearch} darkMode={darkMode} />

      {/* Search result message */}
      {message && (
        <p
          className={`text-center font-medium ${
            message.includes("✅") ? "text-green-500" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <TreeView
        nodes={tree.nodes}
        edges={tree.edges}
        darkMode={darkMode}
        focusedNodeId={focusedNodeId}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
}
