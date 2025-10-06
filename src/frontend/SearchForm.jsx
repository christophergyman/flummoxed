import React, { useState } from 'react';

const SearchForm = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web..."
          className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-lg text-base transition-colors focus:outline-none focus:border-black focus:ring-4 focus:ring-neutral-200 disabled:opacity-50"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="px-8 py-3 bg-black text-white rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          disabled={loading || !query.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
