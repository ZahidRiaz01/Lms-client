import React from 'react';
import { Button } from './Button';

export default function Header() {
  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            LMS User Dashboard
          </h1>
          <Button onClick={handleLogout}>Logout12</Button>
        </div>
      </div>
    </header>
  );
}