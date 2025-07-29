import Link from 'next/link';

interface StationCardProps {
  station: {
    id: string;
    name: string;
    address: string;
    status: string;
    powerOutput: string;
    price: string;
    chargerType: string;
    rating: number;
    imageUrl?: string;
  };
}

export default function StationCard({ station }: StationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1 h-32 md:h-full">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${station.imageUrl || "https://images.unsplash.com/photo-1593941707882-a156679de2a9?q=80&w=1024&auto=format&fit=crop"})`,
            }}
          ></div>
        </div>
        
        <div className="md:col-span-2 p-6">
          <div className="flex justify-between mb-2">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
              station.status === 'available' ? 'bg-green-100 text-green-800' :
              station.status === 'occupied' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-1 ${
                station.status === 'available' ? 'bg-green-500' :
                station.status === 'occupied' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span>{
                station.status === 'available' ? 'Available' :
                station.status === 'occupied' ? 'Occupied' : 'Unavailable'
              }</span>
            </div>
            
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <i 
                  key={star}
                  className={`ri-star-fill text-sm ${
                    star <= station.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                ></i>
              ))}
              <span className="text-sm text-gray-600 ml-1">{station.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{station.name}</h3>
          <p className="text-gray-600 mb-4">{station.address}</p>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-sm">
              <i className="ri-flashlight-line text-primary-600 mr-2"></i>
              <span>{station.powerOutput}</span>
            </div>
            <div className="flex items-center text-sm">
              <i className="ri-money-dollar-circle-line text-primary-600 mr-2"></i>
              <span>{station.price}</span>
            </div>
            <div className="flex items-center text-sm">
              <i className="ri-plug-line text-primary-600 mr-2"></i>
              <span>{station.chargerType}</span>
            </div>
            <div className="flex items-center text-sm">
              <i className="ri-map-pin-line text-primary-600 mr-2"></i>
              <span>3.2 miles away</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Link href={`/stations/${station.id}`} className="flex-1">
              <button className="w-full py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
                View Details
              </button>
            </Link>
            <Link href={`/bookings/create?stationId=${station.id}`} className="flex-1">
              <button className={`w-full py-2 rounded-lg font-medium ${
                station.status === 'available' 
                  ? 'bg-secondary-500 text-white hover:bg-secondary-600' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              } transition-colors`} disabled={station.status !== 'available'}>
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}