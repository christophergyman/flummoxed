import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract web results from Brave Search API response
      if (data.web && data.web.results) {
        setResults(data.web.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="bg-black text-white py-8 px-4 text-center border-b border-neutral-800">
        <h1 className="text-4xl md:text-5xl font-semibold mb-2">Flummoxed Search</h1>
        <p className="text-lg md:text-xl opacity-80">Search the web with our custom search engine</p>
      </header>
      
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <SearchForm onSearch={handleSearch} loading={loading} />
        <SearchResults results={results} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default App;
