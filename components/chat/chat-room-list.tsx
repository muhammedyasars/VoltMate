// components/chat/chat-room-list.tsx
'use client';

import { Room } from '@/types/chats';

interface ChatRoomListProps {
  rooms: Room[];
  selectedRoom: string | null;
  onSelectRoom: (roomId: string) => void;
}

export default function ChatRoomList({ rooms, selectedRoom, onSelectRoom }: ChatRoomListProps) {
  // Helper to format date to relative time
  const formatRelativeTime = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="divide-y divide-gray-100">
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
          className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
            selectedRoom === room.id ? 'bg-green-50 border-l-4 border-green-500' : ''
          }`}
        >
          <div className="flex items-start">
            <div className="relative mr-3">
              {room.avatar ? (
                <img
                  src={room.avatar}
                  alt={room.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="ri-customer-service-2-line text-blue-600"></i>
                </div>
              )}
              {room.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 truncate">{room.name}</h4>
                <span className="text-xs text-gray-500">{formatRelativeTime(room.lastMessage?.timestamp || room.createdAt)}</span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate">
                  {room.lastMessage ? room.lastMessage.content : 'Start a conversation'}
                </p>
                
                <div className="flex items-center space-x-1">
                  {room.isStarred && (
                    <i className="ri-star-fill text-yellow-500 text-xs"></i>
                  )}
                  {room.status === 'resolved' && (
                    <i className="ri-check-double-line text-green-500 text-xs"></i>
                  )}
                  {room.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">{room.unreadCount}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {room.tags && room.tags.length > 0 && (
                <div className="flex mt-2 space-x-2">
                  {room.tags.map((tag:any, i:any) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}