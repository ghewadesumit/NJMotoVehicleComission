import React from 'react';
import './SelectedLocation.css';

const SelectedLocation = ({ selectedLocation }) => {
  const selectedLocationContent =
    selectedLocation.length === 0 ? (
      <div className='selected-location-wrapper'>
        {' '}
        Please select a desired location
      </div>
    ) : (
      <div className='selected-location-wrapper'>
        {selectedLocation.map((item) => (
          <span key={item} className='selected-location'>
            {item}
          </span>
        ))}
      </div>
    );
  return (
    <div className='selected-location-container'>{selectedLocationContent}</div>
  );
};

export default SelectedLocation;
