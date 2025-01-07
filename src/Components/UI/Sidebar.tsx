import React from 'react';

import { Video, Book, Airplay, Megaphone } from 'lucide-react';

const navItems = [
  { icon: Video, label: 'Lectures', href: '/lectures' },
  { icon: Book, label: 'Learning Progress', href: '/' },
  { icon: Airplay, label: 'Change Device', href: '/' },
  { icon: Megaphone, label: 'Announcements', href: '/' },
];

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-2"></li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
