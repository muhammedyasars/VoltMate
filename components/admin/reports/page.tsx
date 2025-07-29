'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import Button from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loader';
import RevenueChart from '@/components/dashboard/revenue-chart';
import UserActivityChart from '@/components/dashboard/user-activity-chart';

const reportTypes = [
  { id: 'revenue', name: 'Revenue Report', icon: 'ri-money-dollar-circle-line' },
  { id: 'usage', name: 'Usage Statistics', icon: 'ri-bar-chart-line' },
  { id: 'stations', name: 'Station Performance', icon: 'ri-charging-pile-2-line' },
  { id: 'users', name: 'User Activity', icon: 'ri-user-line' },
  { id: 'bookings', name: 'Booking Analysis', icon: 'ri-calendar-check-line' },
  { id: 'sustainability', name: 'Environmental Impact', icon: 'ri-leaf-line' }
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulated data loading
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [selectedReport, timeRange]);

  const renderReportContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      );
    }

    switch (selectedReport) {
      case 'revenue':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
              <div className="h-80">
                <RevenueChart />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h4 className="text-sm text-gray-500 uppercase mb-2">Total Revenue</h4>
                <p className="text-3xl font-bold text-gray-900 mb-1">$84,250</p>
                <div className="flex items-center text-green-600">
                  <i className="ri-arrow-up-line mr-1"></i>
                  <span className="text-sm">15.3% vs previous period</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h4 className="text-sm text-gray-500 uppercase mb-2">Average Order Value</h4>
                <p className="text-3xl font-bold text-gray-900 mb-1">$12.80</p>
                <div className="flex items-center text-green-600">
                  <i className="ri-arrow-up-line mr-1"></i>
                  <span className="text-sm">2.4% vs previous period</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h4 className="text-sm text-gray-500 uppercase mb-2">Total Transactions</h4>
                <p className="text-3xl font-bold text-gray-900 mb-1">6,578</p>
                <div className="flex items-center text-green-600">
                  <i className="ri-arrow-up-line mr-1"></i>
                  <span className="text-sm">12.7% vs previous period</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Station Type</h3>
              <div className="relative overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Station Type</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sessions</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Avg. Session</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">Fast Chargers (150kW+)</td>
                      <td className="px-6 py-4">2,145</td>
                      <td className="px-6 py-4">$34,320</td>
                      <td className="px-6 py-4">$16.00</td>
                      <td className="px-6 py-4 text-green-600">+18.5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">Standard Chargers (50kW)</td>
                      <td className="px-6 py-4">3,280</td>
                      <td className="px-6 py-4">$42,640</td>
                      <td className="px-6 py-4">$13.00</td>
                      <td className="px-6 py-4 text-green-600">+12.3%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Slow Chargers (7-22kW)</td>
                      <td className="px-6 py-4">1,153</td>
                      <td className="px-6 py-4">$7,290</td>
                      <td className="px-6 py-4">$6.32</td>
                      <td className="px-6 py-4 text-red-600">-2.1%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'usage':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
              <div className="h-80">
                <UserActivityChart />
              </div>
            </div>
            
            {/* More usage statistics content would go here */}
          </div>
        );
        
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <i className="ri-file-chart-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Report Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're still working on this report type. Check back soon for detailed insights.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1">
        <Header />
        
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics & Reports</h1>
          
          {/* Report Type Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-colors ${
                  selectedReport === report.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`${report.icon} text-2xl mb-2`}></i>
                <span className="text-sm font-medium">{report.name}</span>
              </button>
            ))}
          </div>
          
          {/* Time Range Selection */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex space-x-2 mb-4 md:mb-0">
                {[
                  { id: '7days', label: 'Last 7 Days' },
                  { id: '30days', label: 'Last 30 Days' },
                  { id: '90days', label: 'Last 90 Days' },
                  { id: 'year', label: 'Last 12 Months' },
                  { id: 'custom', label: 'Custom Range' }
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      timeRange === range.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <i className="ri-download-line mr-1"></i>
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <i className="ri-printer-line mr-1"></i>
                  Print
                </Button>
              </div>
            </div>
          </div>
          
          {/* Report Content */}
          {renderReportContent()}
        </div>
      </div>
    </div>
  );
}