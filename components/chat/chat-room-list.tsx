// components/chat/chat-room-list.tsx
import { format, isToday, isYesterday } from 'date-fns';

interface ChatRoom {
  id: string;
  name: string;
  status: string;
  isStarred: boolean;
  unreadCount: number;
  lastMessageText?: string;
  lastMessageAt?: string;
  participants: { userId: number; userName: string }[];
}

interface ChatRoomListProps {
  rooms: ChatRoom[];
  selectedRoom: string | null;
  onSelectRoom: (roomId: string) => void;
}

export default function ChatRoomList({ rooms, selectedRoom, onSelectRoom }: ChatRoomListProps) {
  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
          className={`p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50 
                    ${selectedRoom === room.id ? 'bg-green-50' : ''}`}
        >
          <div className="flex items-start">
            <div className="relative mr-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="ri-customer-service-2-line text-green-600 text-xl"></i>
              </div>
              {room.status === 'active' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900 truncate">{room.name}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {formatDate(room.lastMessageAt)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 truncate mt-1">
                {room.lastMessageText || 'No messages yet'}
              </p>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {room.status === 'active' ? 'Active' : 
                   room.status === 'resolved' ? 'Resolved' : 
                   room.status === 'closed' ? 'Closed' : room.status}
                </span>
                
                {room.unreadCount > 0 && (
                  <span className="bg-green-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {room.unreadCount > 9 ? '9+' : room.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}