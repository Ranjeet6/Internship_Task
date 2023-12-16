import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../screens/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch leave history on component mount
  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await api.get('/leave-history');
        setLeaveHistory(response.data);
      } catch (error) {
        console.error('Error fetching leave history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  const handleApplyLeave = () => {
    navigate('/apply-leave');
  };

  return (
    <div>
      <h1>Welcome to the Leave Management System</h1>

      {isLoading ? (
        <p>Loading leave history...</p>
      ) : (
        <div className='leave-history'>
          <h2>Your Leave History</h2>
          {leaveHistory.length === 0 ? (
            <p>No leave history available.</p>
          ) : (
            <ul>
              {leaveHistory.map((leave) => (
                <li key={leave._id}>
                  <strong>{leave.startDate}</strong> to <strong>{leave.endDate}</strong> - {leave.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <button onClick={handleApplyLeave}>Apply for Leave</button>
    </div>
  );
};

export default Home;
