import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './components/Login';
import LeaveApplication from './components/Leaveapplication';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/apply-leave" element={<LeaveApplication />} />
    </Routes>
  );
};

export default App;
