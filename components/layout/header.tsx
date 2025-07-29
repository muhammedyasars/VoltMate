'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { useModalStore } from '@/store/modal-store';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Stations', path: '/stations' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { onOpen } = useModalStore(); 
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            <i className="ri-charging-pile-2-line text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold font-brand text-gray-900">EVCharge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path}
              className={`font-medium transition-colors ${
                pathname === item.path 
                  ? 'text-primary-600' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-700">
                    {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="font-medium text-gray-700">{user?.name || 'User'}</span>
                <i className="ri-arrow-down-s-line text-gray-500"></i>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="py-2 border-b border-gray-100">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <div className="py-1">
                  <Link href="/dashboard">
                    <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i className="ri-dashboard-line mr-2"></i>
                      Dashboard
                    </div>
                  </Link>
                  <Link href="/bookings">
                    <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i className="ri-calendar-line mr-2"></i>
                      My Bookings
                    </div>
                  </Link>
                  <Link href="/profile">
                    <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i className="ri-user-settings-line mr-2"></i>
                      Profile Settings
                    </div>
                  </Link>
                </div>
                <div className="py-1 border-t border-gray-100">
                  <button 
                    onClick={() => logout()}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <i className="ri-logout-box-r-line mr-2"></i>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onOpen('login')}
                className="text-gray-700 font-medium hover:text-primary-600 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => onOpen('register')}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
        >
          <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container py-4 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`py-2 px-3 rounded-lg font-medium ${
                  pathname === item.path 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50">
                    <i className="ri-dashboard-line mr-2"></i>
                    Dashboard
                  </div>
                </Link>
                <Link href="/bookings" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50">
                    <i className="ri-calendar-line mr-2"></i>
                    My Bookings
                  </div>
                </Link>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50">
                    <i className="ri-user-settings-line mr-2"></i>
                    Profile
                  </div>
                </Link>
                
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 px-3 rounded-lg text-red-600 hover:bg-red-50 w-full"
                >
                  <i className="ri-logout-box-r-line mr-2"></i>
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpen('login');
                  }}
                  className="py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpen('register');
                  }}
                  className="py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}