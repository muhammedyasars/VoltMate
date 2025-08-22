// types/dashboard.ts

export interface UserDashboardStats {
  totalBookings: number;
  completedSessions: number;
  totalKwh: number;
  savedCO2: number;
  totalBookingsTrend?: string;
  completedSessionsTrend?: string;
  energyUsedTrend?: string;
  co2SavedTrend?: string;
}

export interface UserDashboard {
  stats: UserDashboardStats;
  recentBookings: any[];
  environmentalImpact: any;
  usageSummary: any;
}

// types/dashboard.ts - continued

export interface ManagerDashboard {
  totalStations: number;
  activeStations: number;
  totalBookings: number;
  todayBookings: number;
  monthlyRevenue: number;
  totalUsers: number;
  recentBookings: any[];
  stationPerformance: any[];
}

export interface RevenueStats {
  period: string;
  totalRevenue: number;
  revenueByStation: Array<{
    stationId: number;
    stationName: string;
    revenue: number;
  }>;
  revenueByDay: Array<{
    date: string;
    revenue: number;
  }>;
  growthPercentage: number;
}

export interface BookingStats {
  period: string;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  upcomingBookings: number;
  bookingsByStation: Array<{
    stationId: number;
    stationName: string;
    bookings: number;
  }>;
  bookingsByDay: Array<{
    date: string;
    bookings: number;
  }>;
}

export interface EnvironmentalImpact {
  treesEquivalent: number;
  cleanDrivingMiles: number;
  carbonOffset: number;
  treesProgress: number;
  milesProgress: number;
  carbonProgress: number;
}

export interface UsageSummary {
  monthlyAverage: number;
  completionRate: number;
  averageSessionDuration: number;
  peakUsageTime: string;
  favoriteStation?: string;
}
  