import React from 'react';

// Component to display individual search result
const SearchResult = ({ result }) => {
  return (
    <div className="p-6 border-b border-gray-100 transition-colors hover:bg-gray-50 last:border-b-0">
      <h3 className="mb-2">
        <a 
          href={result.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 no-underline text-lg font-medium leading-snug hover:underline"
      >
          {result.title}
        </a>
      </h3>
      <p className="text-gray-500 text-sm mb-2 break-all">{result.url}</p>
      {result.description && (
        <p className="text-gray-700 leading-relaxed mb-2">{result.description}</p>
      )}
      {result.age && (
        <span className="text-gray-500 text-xs italic">{result.age}</span>
      )}
    </div>
  );
};

// Main component to display all search results
const SearchResults = ({ results, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          <p>Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          <p>No results found. Try a different search term.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-gray-700 text-lg font-semibold">Search Results ({results.length})</h2>
      </div>
      <div>
        {results.map((result, index) => (
          <SearchResult key={index} result={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
