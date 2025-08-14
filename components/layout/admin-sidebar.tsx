'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { 
    icon: 'ri-dashboard-line', 
    label: 'Dashboard', 
    path: '/admin' 
  },
  { 
    icon: 'ri-user-line', 
    label: 'Users', 
    path: '/admin/users' 
  },
  { 
    icon: 'ri-user-settings-line', 
    label: 'Managers', 
    path: '/admin/managers' 
  },
  { 
    icon: 'ri-charging-pile-2-line', 
    label: 'Stations', 
    path: '/admin/stations' 
  },
  { 
    icon: 'ri-calendar-check-line', 
    label: 'Bookings', 
    path: '/admin/bookings' 
  }
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={`bg-gray-900 text-white h-screen sticky top-0 transition-all ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-charging-pile-2-line text-white text-xl"></i>
          </div>
          {!collapsed && (
            <span className="font-bold text-xl">EVCharge</span>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`text-gray-400 hover:text-white ${collapsed ? 'hidden' : ''}`}
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
      </div>
      
      <div className="py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <div className={`flex items-center px-4 py-3 ${
                  pathname === item.path 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                } transition-colors ${collapsed ? 'justify-center' : ''}`}>
                  <i className={`${item.icon} text-xl ${collapsed ? '' : 'mr-3'}`}></i>
                  {!collapsed && (
                    <span>{item.label}</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`text-gray-400 hover:text-white ${!collapsed ? 'hidden' : 'w-full flex justify-center'}`}
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
        <div className={`flex items-center p-4 bg-gray-800 rounded-lg ${collapsed ? 'hidden' : ''}`}>
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-medium">AA</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-gray-400">admin@evcharge.com</div>
          </div>
          <Link href="/logout">
            <button className="text-gray-400 hover:text-white">
              <i className="ri-logout-box-r-line"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}