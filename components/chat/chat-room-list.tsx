// components/chat/chat-room-list.tsx
'use client';

import { format, isToday, isYesterday } from 'date-fns';

interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: 'user' | 'support';
  }>;
  unreadCount?: number;
  type: 'support' | 'group' | 'direct';
  createdAt: string;
}

interface ChatRoomListProps {
  rooms: ChatRoom[];
  selectedRoom: string | null;
  onSelectRoom: (roomId: string) => void;
}

export default function ChatRoomList({ rooms, selectedRoom, onSelectRoom }: ChatRoomListProps) {
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  const getSupportAgent = (room: ChatRoom) => {
    return room.participants.find(p => p.role === 'support');
  };

  if (rooms.length === 0) {
    return (
      <div className="p-8 text-center">
        <i className="ri-chat-3-line text-4xl text-gray-300 mb-3"></i>
        <p className="text-gray-500 text-sm">No conversations yet</p>
        <button 
          onClick={() => {/* Handle new chat */}}
          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
        >
          Start New Chat
        </button>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {rooms.map((room) => {
        const supportAgent = getSupportAgent(room);
        const isSelected = selectedRoom === room.id;
        
        return (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
              isSelected ? 'bg-primary-50 border-l-4 border-primary-500' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {supportAgent?.avatar ? (
                  <img
                    src={supportAgent.avatar}
                    alt={supportAgent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <i className="ri-customer-service-2-line text-primary-600 text-xl"></i>
                  </div>
                )}
                {room.unreadCount && room.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {room.unreadCount > 9 ? '9+' : room.unreadCount}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {room.type === 'support' ? (supportAgent?.name || 'Support Team') : room.name}
                  </h3>
                  {room.lastMessage && (
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatMessageTime(room.lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                
                {room.lastMessage ? (
                  <p className="text-sm text-gray-600 truncate">
                    {room.lastMessage.content}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic">No messages yet</p>
                )}

                {/* Room type badge */}
                <div className="flex items-center gap-2 mt-2">
                  {room.type === 'support' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      <i className="ri-customer-service-line mr-1"></i>
                      Support
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}