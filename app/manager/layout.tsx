'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header';

interface ManagerLayoutProps {
  children: React.ReactNode;
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/manager', icon: 'ri-dashboard-line' },
    { name: 'Stations', href: '/manager/stations', icon: 'ri-charging-pile-2-line' },
    { name: 'Bookings', href: '/manager/bookings', icon: 'ri-calendar-check-line' },
    { name: 'Users', href: '/manager/users', icon: 'ri-user-3-line' }
  ];

  const isActive = (href: string) => {
    if (href === '/manager') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">   
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-20 pb-4">
            <div className="flex-1 px-4">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <i className={`${item.icon} mr-3 text-lg`}></i>
                 {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Sidebar Footer */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-purple-600"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Manager Account</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 right-4 z-50 lg:hidden bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <i className={`${sidebarOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
        </button>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
                    