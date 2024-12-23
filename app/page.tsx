"use client";

import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { fetchBooks } from "../../lib/fetchBooks";

export default function SearchPage() {
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const results = await fetchBooks(query);
    setLinks(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
        Search PDF Books
      </h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p className="text-center mt-6 text-gray-600">Loading...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {links.map((link, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                {link}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
