import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Leaveapplication.css';

const LeaveApplication = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleApplyLeave = async () => {
    try {
      // Validate leave input (you can add more validation if needed)

      // Prepare leave data
      const leaveData = {
        startDate,
        endDate,
        reason,
      };

      // Send leave application to the backend
      const response = await api.post('/apply-leave', leaveData);

      // Handle success
      console.log('Leave application successful:', response.data);

      // Redirect to the home page or any other appropriate page
      navigate('/');
    } catch (error) {
      console.error('Error applying for leave:', error);
      // Handle error (show a message to the user, log it, etc.)
    }
  };

  return (
    <div>
      <h1>Apply for Leave</h1>
      <div className='input-dates'>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
      
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
      </div>
      <button onClick={handleApplyLeave}>Submit Application</button>
    </div>
  );
};

export default LeaveApplication;
