// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Lectures from './Pages/Lectures';
import LectureDetail from './LectureDetailpage';
import LearningProcess from './Pages/LearningProcess';
import DeviceChange from './Pages/DeviceChange';
import Announcements from './Pages/Announcements';
import CoursesPage from './Pages/Courses';

function App() {
  useEffect(() => {
    const handleContextMenu = (event: any) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: any) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        ['s', 'p', 'u', 'c', 'v', 'x', 'a'].includes(event.key.toLowerCase())
      ) {
        event.preventDefault();
      }
      if (
        event.keyCode === 123 ||
        (event.ctrlKey &&
          event.shiftKey &&
          ['i', 'c'].includes(event.key.toLowerCase()))
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<CoursesPage />} />

        <Route path="/lectures/:id" element={<Lectures />} />
        <Route path="/lecture/:id" element={<LectureDetail />} />
        <Route path="/learning" element={<LearningProcess />} />
        <Route path="/device" element={<DeviceChange />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </Router>
  );
}

export default App;
