import React from 'react';
import './DropDown.css';

const DropDown = ({ handleAppointmentType, handleAppointmentInterval }) => {
  return (
    <div className='dropdown-container'>
      <div className='dropdown-wrapper'>
        <select
          name='apointmentType'
          id='appointmentType'
          onChange={(event) => handleAppointmentType(event.target.value)}
        >
          <option value='initialPermit' selected>
            Initial Permit
          </option>
          <option value='knowledgeTest'>Knowledge Test</option>
          <option value='renewal'>Renewal: License or Non-Driver ID</option>
        </select>
      </div>
      <div className='time-interval-wrapper'>
        <select
          name='appointmentInterval'
          id='appointmentInterval'
          onChange={(event) => handleAppointmentInterval(event.target.value)}
        >
          <option value={3} selected>
            {' '}
            3 Seconds
          </option>
          <option value={10}> 10 Seconds</option>
          <option value={30}> 30 Seconds</option>
          <option value={60}> 1 minute</option>
        </select>
      </div>
    </div>
  );
};

export default DropDown;
