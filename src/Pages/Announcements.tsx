import React, { useEffect, useState } from 'react';
import DashboardLayout from '../Components/layoutCard';
import api from './api';
import TokenService from '../lib/localStorageService';

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
  const userid = TokenService.getUser();
  const [notificationList, setNotificationList] = useState<any>([]);
  const [hasNewAnnouncements, setHasNewAnnouncements] = useState(false);

  const fetchUserNotifications = async () => {
    try {
      const apiResp = await api.get(`/notifications/user/${userid}`);
      if (apiResp?.data) {
        const isNew = apiResp.data.length > notificationList.length; // Check if new notifications exist
        setHasNewAnnouncements(isNew);
        setNotificationList(apiResp.data);
      }
    } catch (e) {
      console.log('Error while getting user Notifications');
    }
  };
  useEffect(() => {
    fetchUserNotifications();
    const interval = setInterval(fetchUserNotifications, 3 * 60 * 1000); // Refetch every 3 minutes
    return () => clearInterval(interval);
  }, []);
  return (
    <DashboardLayout
      title="Announcements"
      description="Stay updated with the latest news, updates, and events on our platform."
      hasNewAnnouncements={hasNewAnnouncements}
    >
      <div className="w-full bg-gradient-to-br from-indigo-200 to-indigo-700 p-10">
        <div className="max-w-4xl mx-auto mt-8 px-4">
          {notificationList.length > 0 ? (
            notificationList.map((notification: any) => (
              <div
                key={notification.id}
                className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200"
              >
                <p className="text-lg font-semibold text-blue-600 mb-3">
                  {notification.text}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(notification.createdDate).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
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
