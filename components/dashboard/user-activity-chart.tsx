// components/dashboard/user-activity-chart.tsx
'use client';

import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for user activity
const mockData = [
  { date: 'Jan', logins: 320, registrations: 45, activeUsers: 280 },
  { date: 'Feb', logins: 350, registrations: 40, activeUsers: 290 },
  { date: 'Mar', logins: 400, registrations: 55, activeUsers: 320 },
  { date: 'Apr', logins: 450, registrations: 60, activeUsers: 350 },
  { date: 'May', logins: 470, registrations: 52, activeUsers: 380 },
  { date: 'Jun', logins: 540, registrations: 70, activeUsers: 410 },
  { date: 'Jul', logins: 580, registrations: 65, activeUsers: 450 },
  { date: 'Aug', logins: 620, registrations: 75, activeUsers: 480 },
  { date: 'Sep', logins: 650, registrations: 80, activeUsers: 510 },
  { date: 'Oct', logins: 700, registrations: 85, activeUsers: 550 },
  { date: 'Nov', logins: 720, registrations: 80, activeUsers: 580 },
  { date: 'Dec', logins: 750, registrations: 90, activeUsers: 600 },
];

export default function UserActivityChart() {
  const [timeframe, setTimeframe] = useState('year'); // year, quarter, month
  
  // Filter data based on timeframe
  const getFilteredData = () => {
    if (timeframe === 'month') {
      // Last 30 days (just show last 4 data points for demo)
      return mockData.slice(-4);
    } else if (timeframe === 'quarter') {
      // Last quarter (just show last 6 data points for demo)
      return mockData.slice(-6);
    } else {
      // Full year
      return mockData;
    }
  };
  
  const data = getFilteredData();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
            <span className="text-xs text-gray-600">Logins</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-gray-600">Registrations</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs text-gray-600">Active Users</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1 text-xs rounded-lg ${
              timeframe === 'month' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-lg ${
              timeframe === 'quarter' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('quarter')}
          >
            Quarter
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-lg ${
              timeframe === 'year' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tick={{ fill: '#6B7280' }}
            width={40}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '0.75rem'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="activeUsers" 
            stroke="#3B82F6" 
            fill="#93C5FD" 
            fillOpacity={0.5}
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="logins" 
            stroke="#6366F1" 
            fill="#A5B4FC" 
            fillOpacity={0.5}
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="registrations" 
            stroke="#10B981" 
            fill="#6EE7B7" 
            fillOpacity={0.5}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}