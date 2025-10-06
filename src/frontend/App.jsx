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

  const hasSearched = loading || results.length > 0 || error;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="bg-black text-white py-8 px-4 text-center border-b border-neutral-800">
        <a href="/" className="text-4xl md:text-5xl font-semibold mb-2 inline-block">Flummoxed Search</a>
        <p className="text-lg md:text-xl opacity-80">Search the web with our custom search engine</p>
      </header>
      
      {/* Initial state: search bar centered */}
      {!hasSearched && (
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl px-4 mx-auto">
            <SearchForm onSearch={handleSearch} loading={loading} />
          </div>
        </main>
      )}

      {/* After search: results scroll, search bar fixed at bottom */}
      {hasSearched && (
        <>
          <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full pb-24">
            <SearchResults results={results} loading={loading} error={error} />
          </main>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 shadow-lg z-10">
            <div className="max-w-4xl px-4 mx-auto w-full">
              <SearchForm onSearch={handleSearch} loading={loading} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
