interface StatsWidgetProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'emerald';
  trend?: string;
}

export default function StatsWidget({ title, value, icon, color, trend }: StatsWidgetProps) {
  const bgColors = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    emerald: 'bg-emerald-100'
  };
  
  const textColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    emerald: 'text-emerald-600'
  };
  
  const trendColors = {
    '+': 'text-green-600',
    '-': 'text-red-600'
  };
  
  // Determine trend direction
  const trendDirection = trend?.startsWith('-') ? '-' : '+';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 ${bgColors[color]} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} ${textColors[color]} text-xl`}></i>
        </div>
        
        {trend && (
          <div className={`flex items-center ${trendColors[trendDirection]}`}>
            <i className={`${trendDirection === '+' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
            <span className="text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}