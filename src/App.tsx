// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Lectures from './Pages/Lectures';
import LectureDetail from './LectureDetailpage';
import LearningProcess from './Pages/LearningProcess';
import DeviceChange from './Pages/DeviceChange';
import Announcements from './Pages/Announcements';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/lecture/:id" element={<LectureDetail />} />
        <Route path="/learning" element={<LearningProcess />} />
        <Route path="/device" element={<DeviceChange />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </Router>
  );
}

export default App;
