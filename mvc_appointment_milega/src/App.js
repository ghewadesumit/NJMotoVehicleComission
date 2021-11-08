import './App.css';
import DropDown from './components/DropDown/DropDown';
import axios from 'axios';
import React from 'react';
import Location from './components/Location/Location';
import * as locationData from './utils/data';
import SelectedLocation from './components/Selected Location/SelectedLocation';
import SearchButton from './components/Search Button/SearchButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentType: 'initialPermit',
      appointmentLocation: null,
      selectedLocation: [],
      isSearching: false,
      serverResponse: [],
      appointmentInterval: 3,
    };
    this.setIntervalCallingServer = undefined;
    this.locationTempData = locationData.locationName.map((item) => {
      return { name: item.name, index: item.index, isSelected: false };
    });
  }

  /** Setting appointment type after selection in DropDown  */
  handleAppointmentType = (appointment) => {
    // console.log('The new appointment is', appointment);
    this.setState({ appointmentType: appointment });
  };

  handleAppointmentInterval = (interval) => {
    this.setState({ appointmentInterval: interval });
  };

  /** handleIsSelected is triggered from location item */
  handleIsSelected = (locationItem) => {
    locationItem.isSelected = !locationItem.isSelected;
    this.addLocation(locationItem);

    const filteredAppointmentLocation = this.state.appointmentLocation.filter(
      (item) => item.index !== locationItem.index
    );
    this.setState({
      appointmentLocation: [...filteredAppointmentLocation, locationItem].sort(
        (a, b) => a.index - b.index
      ),
    });
  };

  /** AddLocation is triggered from handleIsSelected (Above function)*/
  addLocation = (location) => {
    if (location.isSelected) {
      this.setState({
        selectedLocation: [...this.state.selectedLocation, location.name],
      });
    } else {
      const tempLocation = this.state.selectedLocation.filter(
        (item) => item !== location.name
      );
      this.setState({ selectedLocation: [...tempLocation] });
    }
  };

  /** Triggered from Search button component */
  handleIsSearching = () => {
    this.setState({ isSearching: !this.state.isSearching }, () => {
      if (this.state.isSearching) {
        this.setIntervalCallingServer = setInterval(
          this.callingServer,
          this.state.appointmentInterval * 1000
        );
      } else if (!this.state.isSearching) {
        // console.log('Stopppedddd');
        clearInterval(this.setIntervalCallingServer);
      }
    });
  };

  /** Calling the algorithm for searching the appointment */
  callMVCSearch = async (appointmentData) => {
    const response = await axios.post('/api/mvc_search', appointmentData);
    if (response.status == 200 && response.statusText == 'OK') {
      return response.data;
    }
  };

  callingServer = () => {
    const appointmentData = {
      appointmentType: this.state.appointmentType,
      selectedLocation: this.state.selectedLocation,
      requiredMonths: locationData.currentThreeMonths(),
    };
    // console.log('Sending data', appointmentData);

    this.callMVCSearch(appointmentData)
      .then((response) => this.setState({ serverResponse: response.data }))
      .catch((err) => console.log('error is', err));
  };

  componentDidMount() {
    if (this.state.appointmentLocation == null) {
      this.setState({ appointmentLocation: this.locationTempData });
    }

    // console.log('location selected are', this.state.selectedLocation);
  }

  render() {
    const {
      appointmentLocation,
      selectedLocation,
      isSearching,
      serverResponse,
    } = this.state;
    return (
      <div className='main-container'>
        <DropDown
          handleAppointmentType={this.handleAppointmentType}
          handleAppointmentInterval={this.handleAppointmentInterval}
        />
        <SelectedLocation selectedLocation={selectedLocation} />
        <Location
          locationData={appointmentLocation}
          handleIsSelected={this.handleIsSelected}
          serverResponse={serverResponse}
        />
        <SearchButton
          selectedLocation={selectedLocation}
          isSearching={isSearching}
          handleIsSearching={this.handleIsSearching}
        />
      </div>
    );
  }
}

export default App;
