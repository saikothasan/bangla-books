"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SearchResult } from "../types/SearchResult";

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (response.ok) {
        setResults(data.items || []);
        setHistory((prev) => [...new Set([searchQuery, ...prev])]);
      } else {
        console.error(data.error);
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
        Search PDF Books
      </h1>
      <SearchBar onSearch={(q) => handleSearch(q)} />
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSearch(item)}
            className="px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            {item}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div
            className="w-8 h-8 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"
            aria-label="Loading"
          ></div>
          <p className="ml-4 text-blue-600 text-lg font-medium">Loading...</p>
        </div>
      ) : (
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-gray-600 text-sm mt-2">{item.snippet}</p>
                <p className="text-gray-400 text-xs mt-1">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.displayLink}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
