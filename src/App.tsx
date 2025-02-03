// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Lectures from './Pages/Lectures';
import LectureDetail from './LectureDetailpage';
import LearningProcess from './Pages/LearningProcess';
import DeviceChange from './Pages/DeviceChange';
import Announcements from './Pages/Announcements';
import CoursesPage from './Pages/Courses';

function App() {
  const [isAllowedBrowser, setIsAllowedBrowser] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isXvast = userAgent.includes('xvast');

    if (isXvast) {
      setIsAllowedBrowser(true);
    } else {
      setIsAllowedBrowser(false);
    }

    const handleContextMenu = (event: MouseEvent) => event.preventDefault();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        ['s', 'p', 'u', 'c', 'v', 'x', 'a'].includes(event.key.toLowerCase())
      ) {
        event.preventDefault();
      }
      if (
        ['F12', 'F10', 'F11'].includes(event.key) || // Function keys
        (event.ctrlKey &&
          event.shiftKey &&
          ['i', 'c', 'j'].includes(event.key.toLowerCase()))
      ) {
        event.preventDefault();
      }
      if (event.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshot is disabled!');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  if (!isAllowedBrowser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-5">
        <h1 className="text-3xl font-bold">❌ Unsupported Browser</h1>
        <p className="mt-2 text-lg">This app only works on Xvast Browser.</p>
        <p className="mt-2">
          Please download{' '}
          <a href="https://www.xvast.com/" className="text-blue-400 underline">
            Xvast Browser
          </a>{' '}
          to access the content.
        </p>
      </div>
    );
  }

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
