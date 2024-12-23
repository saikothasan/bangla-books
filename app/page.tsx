"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState<string[]>([]);
  const [savedLinks, setSavedLinks] = useState<string[]>([]);

  const handleSearch = async (searchQuery: string, startIndex: number = 1) => {
    setLoading(true);
    setResults([]);
    setQuery(searchQuery);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchQuery)}&start=${startIndex}`
      );
      const data = await response.json();

      if (response.ok) {
        setResults(data.items || []);
        setHistory((prev) => [...new Set([searchQuery, ...prev])]); // Save query in history
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

  const saveLink = (link: string) => {
    setSavedLinks((prev) => [...new Set([...prev, link])]);
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
                <button
                  onClick={() => saveLink(item.link)}
                  className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            {page > 1 && (
              <button
                onClick={() => {
                  setPage((prev) => prev - 1);
                  handleSearch(query, (page - 2) * 10 + 1);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Previous
              </button>
            )}
            {results.length > 0 && (
              <button
                onClick={() => {
                  setPage((prev) => prev + 1);
                  handleSearch(query, page * 10 + 1);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      {savedLinks.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Saved Links</h2>
          <ul className="list-disc ml-6">
            {savedLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
