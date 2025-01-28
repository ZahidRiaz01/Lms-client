import React, { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  FileSyncOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import TokenService from '../lib/localStorageService';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  hasNewAnnouncements?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  description,
  hasNewAnnouncements = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    TokenService.removeToken();
    navigate('/');
  };

  const menuItems = [
    {
      path: '/courses',
      label: 'Courses',
      icon: <VideoCameraOutlined className="mr-3 text-lg" />,
    },
    {
      path: '/announcements',
      label: 'Announcements',
      icon: (
        <div className="relative">
          <DashboardOutlined className="mr-3 text-lg" />
          {hasNewAnnouncements && (
            <span className="absolute -top-1 -right-2 w-2.5 h-2.5 bg-red-500 rounded-full" />
          )}
        </div>
      ),
    },

    {
      path: '/learning',
      label: 'Learning Progress',
      icon: <BarChartOutlined className="mr-3 text-lg" />,
    },
    {
      path: '/device',
      label: 'Device Sync',
      icon: <FileSyncOutlined className="mr-3 text-lg" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-gray-200 w-64 min-h-screen p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">LMS Dashboard</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition duration-200 text-base ${
                    location.pathname === item.path
                      ? 'bg-indigo-800 text-white'
                      : 'hover:bg-indigo-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="w-full h-full flex items-center border-none justify-center p-3 mt-10 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </Button>
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="bg-gradient-to-br from-indigo-800 to-indigo-400 text-white py-6 px-8 flex justify-between items-center shadow-md">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm mt-1">{description}</p>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
