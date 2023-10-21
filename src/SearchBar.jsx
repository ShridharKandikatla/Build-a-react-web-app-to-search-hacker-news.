import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h2>Search Hacker News</h2>
      <div class='input-group'>
        <span class='input-group-text '>Enter Query</span>
        <input
          type='text'
          value={query}
          onChange={handleChange}
          placeholder='Search Hacker News'
        />
        <button className='m-1 submit' onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
