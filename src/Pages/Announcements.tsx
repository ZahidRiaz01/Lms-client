import React, { useState } from 'react';
import DashboardLayout from '../Components/layoutCard';

const announcements = [
  {
    id: 1,
    title: 'Upcoming Maintenance Downtime',
    date: '2024-12-26',
    description:
      'The platform will undergo maintenance on December 26 from 2:00 AM to 6:00 AM. Please save your progress and plan accordingly.',
  },
  {
    id: 2,
    title: 'New Course Added: Advanced React',
    date: '2024-12-20',
    description:
      'We are excited to announce the addition of the "Advanced React" course to our catalog. Enroll now to boost your skills!',
  },
  {
    id: 3,
    title: 'Holiday Schedule Update',
    date: '2024-12-18',
    description:
      'The LMS support team will have limited availability during the holiday season. Check the support page for more details.',
  },
];

export default function Announcements() {
  return (
    <DashboardLayout
      title="Announcements"
      description="Stay updated with the latest news, updates, and events on our platform."
    >
      <div className="w-full bg-gradient-to-br from-indigo-200 to-indigo-700 p-10">
        <div className="max-w-4xl mx-auto mt-8 px-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-blue-600 mb-3">
                {announcement.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium text-gray-700">Date:</span>{' '}
                {announcement.date}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {announcement.description}
              </p>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                No announcements at the moment. Check back later!
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
