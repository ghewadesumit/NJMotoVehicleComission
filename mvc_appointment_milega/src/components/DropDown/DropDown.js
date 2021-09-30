import React from 'react';
import './DropDown.css';

const DropDown = ({ handleAppointmentType }) => {
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
    </div>
  );
};

export default DropDown;
