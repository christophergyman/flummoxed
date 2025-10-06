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
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web..."
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg text-base transition-colors focus:outline-none focus:border-black focus:ring-4 focus:ring-neutral-200 disabled:opacity-50"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default SearchForm;
