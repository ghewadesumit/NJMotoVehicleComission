import './App.css';
import DropDown from './components/DropDown/DropDown';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Location from './components/Location/Location';
import * as locationData from './utils/data';
import SelectedLocation from './components/Selected Location/SelectedLocation';
import SearchButton from './components/Search Button/SearchButton';

import useStateWithCallback from 'use-state-with-callback';

function App() {
  const [appointmentType, setAppointmentType] = useState(null);
  const [appointmentLocation, setAppointmentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState([]);
  // const [isSearching, setIsSearching] = useStateWithCallback(false);
  const [isSearching, setIsSearching] = useState(false);
  const [serverResponse, setServerResponse] = useState([]);
  // const [urlArray, setUrlArray] = useState([]);
  let setIntervalCallingServer = undefined;

  const locationTempData = locationData.locationName.map((item) => {
    return { name: item.name, index: item.index, isSelected: false };
  });

  /** Setting appointment type after selection in DropDown  */
  const handleAppointmentType = (appointment) => {
    setAppointmentType(appointment);
  };

  /** handleIsSelected is triggered from location item */
  const handleIsSelected = (locationItem) => {
    locationItem.isSelected = !locationItem.isSelected;
    addLocation(locationItem);

    const filteredAppointmentLocation = appointmentLocation.filter(
      (item) => item.index !== locationItem.index
    );
    setAppointmentLocation(
      [...filteredAppointmentLocation, locationItem].sort(
        (a, b) => a.index - b.index
      )
    );
  };

  /** AddLocation is triggered from handleIsSelected (Above function)
   */
  const addLocation = (location) => {
    if (location.isSelected) {
      selectedLocation.push(location.name);
      setSelectedLocation(selectedLocation);
    } else {
      const tempLocation = selectedLocation.filter(
        (item) => item !== location.name
      );
      setSelectedLocation([...tempLocation]);
    }
  };

  /** Triggered from Search button component */
  // const handleIsSearching = () => {
  //   setIsSearching(!isSearching, (searchState) => {
  //     if (searchState) {
  //       console.log('Search Button is True');
  //       setIntervalCallingServer = setInterval(callingServer, 30 * 1000);
  //     } else if (!searchState) {
  //       console.log('Search button is false');
  //       clearInterval(setIntervalCallingServer);
  //     }
  //   });
  // };
  const handleIsSearching = () => {
    setIsSearching(!isSearching);
  };

  /** Calling the algorithm for searching the appointment */
  const callMVCSearch = async (appointmentData) => {
    const response = await axios.post('/api/mvc_search', appointmentData);
    if (response.status == 200 && response.statusText == 'OK') {
      return response.data;
    }
  };

  const callingServer = () => {
    const appointmentData = {
      appointmentType: appointmentType,
      selectedLocation: selectedLocation,
      requiredMonths: locationData.currentThreeMonths(),
    };
    console.log('Sending data', appointmentData);

    callMVCSearch(appointmentData)
      .then((response) => setServerResponse(response.data))
      .catch((err) => console.log('error is', err));
  };

  useEffect(() => {
    if (appointmentLocation == null) {
      setAppointmentLocation(locationTempData);
    }

    if (isSearching) {
      console.log('isSearching is true');
      setIntervalCallingServer = setInterval(callingServer, 6000);
    } else if (!isSearching) {
      console.log('isSearching is false');
      clearInterval(setIntervalCallingServer);
    }
    console.log('location selected are', selectedLocation);
  }, [
    appointmentType,
    appointmentLocation,
    locationTempData,
    selectedLocation,
    isSearching,
  ]);

  return (
    <div className='main-container'>
      <DropDown handleAppointmentType={handleAppointmentType} />
      <SelectedLocation selectedLocation={selectedLocation} />
      <Location
        locationData={appointmentLocation}
        handleIsSelected={handleIsSelected}
        serverResponse={serverResponse}
      />
      <SearchButton
        selectedLocation={selectedLocation}
        isSearching={isSearching}
        handleIsSearching={handleIsSearching}
      />
    </div>
  );
}

export default App;
