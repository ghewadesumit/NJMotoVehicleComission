import React from 'react';
import './Location.css';
import Loading from '../Loading/Loading';
import Speech from 'react-speech';
import useSound from 'use-sound';
import NotificationTone from '../../asset/Message-tone.mp3';

const Location = ({ locationData, handleIsSelected, serverResponse }) => {
  const locationMap = new Map();
  const [play] = useSound(NotificationTone);

  const handleRouteChange = (mvcRedirect) => {
    console.log('Changing route to', mvcRedirect);
    if (mvcRedirect !== null) window.open(mvcRedirect, '_blank');
  };

  if (serverResponse.length) {
    serverResponse.forEach((item) => {
      locationMap.set(item.location, item);
    });
  }

  const locationContent =
    locationData == null ? (
      <Loading />
    ) : (
      locationData.map((item) => {
        const selectedItemText = item.isSelected ? 'Deselect' : 'Select';
        let foundClass = '';
        let mvcRedirect = null;
        let currentItemIsFound = false;

        console.log(locationMap);
        if (
          locationMap.size > 0 &&
          locationMap.has(item.name) &&
          locationMap.get(item.name).isFound
        ) {
          console.log('Location component', locationMap.get(item.name));
          foundClass = 'found';
          currentItemIsFound = true;
          mvcRedirect = locationMap.get(item.name).url;
          console.log(
            `location url ${locationMap.get(item.name).url} ${mvcRedirect}`
          );
          play();
        }

        return (
          <div key={item.index} className={`location-wrapper ${foundClass}`}>
            <div className='location-name'>
              <span>{item.name}</span>
              {currentItemIsFound && (
                <h4>
                  {/* <Speech
                    text={`Alert, ${item.name} has a appointment available`}
                    textAsButton={false}
                    stop={false}
                    displayText={true}
                  /> */}

                  <span onClick={() => handleRouteChange(mvcRedirect)}>
                    Click here
                    <em>Hurry!!!</em>
                  </span>
                </h4>
              )}
            </div>
            <div className='button-holder'>
              <button
                onClick={() => handleIsSelected(item)}
                className={`select-location-btn ${selectedItemText}`}
              >
                {selectedItemText}
              </button>
            </div>
          </div>
        );
      })
    );

  return <div className='location-container'>{locationContent}</div>;
};

export default Location;
