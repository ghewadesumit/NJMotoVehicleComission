import React from 'react';
import './SearchButton.css';

const SearchButton = ({ selectedLocation, handleIsSearching, isSearching }) => {
  const isDisabled = selectedLocation <= 0 ? true : false;
  const disabledClass = isDisabled ? 'disabled-search-btn' : '';
  return (
    <div className='search-btn-container'>
      {isSearching ? (
        <button
          className={`search-btn stop-search-btn`}
          onClick={handleIsSearching}
        >
          {' '}
          Stop Search
        </button>
      ) : (
        <button
          className={`search-btn start-search-btn ${disabledClass}`}
          onClick={handleIsSearching}
          disabled={isDisabled}
        >
          {' '}
          Search Appointment
        </button>
      )}
    </div>
  );
};

export default SearchButton;
