'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { chatApi } from '@/lib/api/chat.api';
import { useAuthStore } from '@/store/auth-store';
import Header from '@/components/layout/header';
import { format, isToday, isYesterday } from 'date-fns';

export default function ChatPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [rooms, setRooms] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch chat rooms on load
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await chatApi.getChatRooms();
        console.log("API Response for rooms:", response); // Debug log
        
        // Make sure we have an array of rooms
        const roomsData = Array.isArray(response) ? response : 
                        Array.isArray(response?.data) ? response.data : [];
        
        // Log the first room to debug
        if (roomsData.length > 0) {
          console.log("First room object:", roomsData[0]);
        }
                        
        setRooms(roomsData);
        setLoading(false);
        
        // Auto-select first room if available
        if (roomsData.length > 0 && !activeRoom) {
          setActiveRoom(roomsData[0].id);
          fetchMessages(roomsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
        setRooms([]);
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, []);

  // Fetch messages when active room changes
  useEffect(() => {
    if (activeRoom) {
      fetchMessages(activeRoom);
    }
  }, [activeRoom]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages for a room
  const fetchMessages = async (roomId: string) => {
    try {
      const response = await chatApi.getChatMessages(roomId);
      console.log("API Response for messages:", response); // Debug log
      
      // Make sure we have an array of messages
      const messagesData = Array.isArray(response) ? response : 
                         Array.isArray(response?.data) ? response.data : [];
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!activeRoom || !messageInput.trim()) return;
    
    try {
      await chatApi.sendMessage(activeRoom, { message: messageInput });
      setMessageInput('');
      // Refresh messages
      fetchMessages(activeRoom);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle attachment
  const handleAttachment = () => {
    fileInputRef.current?.click();
  };

  // Format date for chat list
  const formatChatDate = (dateString?: string) => {
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

  // Format message time
  const formatMessageTime = (dateString: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'h:mm a');
  };

  // Get room name safely
  const getRoomName = (room: any) => {
    // Try different properties that might contain the name
    return room?.name || room?.title || room?.roomName || "Chat Room";
  };

  // Get room status safely
  const getRoomStatus = (room: any) => {
    return room?.status || "unknown";
  };

  // Filter rooms based on search - WITH FIX for undefined name
  const filteredRooms = Array.isArray(rooms) 
    ? rooms.filter(room => {
        const roomName = getRoomName(room);
        return !searchQuery || roomName.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : [];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Simple header */}
      <Header />
      
      {/* Main chat container - full screen minus header */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat list */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Search bar */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Rooms list */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="loader"></div>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>No conversations found</p>
              </div>
            ) : (
              <div>
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setActiveRoom(room.id)}
                    className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                      activeRoom === room.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 font-medium">
                            {getRoomName(room).substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        {getRoomStatus(room) === 'active' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900 truncate">{getRoomName(room)}</h4>
                          <span className="text-xs text-gray-500">
                            {formatChatDate(room.lastMessageAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {room.lastMessageText || 'No messages yet'}
                        </p>
                      </div>
                      {room.unreadCount > 0 && (
                        <div className="ml-2 bg-green-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                          {room.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* New chat button */}
          <div className="p-3 border-t border-gray-200">
            <button 
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              onClick={() => {
                // Here you would implement logic to create a new chat
                console.log('Create new chat');
              }}
            >
              New Chat
            </button>
          </div>
        </div>
        
        {/* Chat window */}
        <div className="w-2/3 flex flex-col bg-[#e5ded8]">
          {activeRoom && rooms.length > 0 ? (
            <>
              {/* Chat header */}
              <div className="p-3 bg-white border-b border-gray-200 flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-medium">
                    {getRoomName(rooms.find(r => r.id === activeRoom)).substring(0, 2).toUpperCase() || 'CH'}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {getRoomName(rooms.find(r => r.id === activeRoom))}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {getRoomStatus(rooms.find(r => r.id === activeRoom)) === 'active' ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p>No messages yet</p>
                    <p className="text-sm mt-2">Start the conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.isCurrentUser 
                              ? 'bg-green-100 text-gray-800 rounded-br-none' 
                              : 'bg-white text-gray-800 rounded-bl-none'
                          }`}
                        >
                          <p>{message.message || message.content || ''}</p>
                          <div className="flex justify-end mt-1">
                            <span className="text-xs text-gray-500">
                              {formatMessageTime(message.sentAt || message.createdAt || '')}
                            </span>
                            {message.isCurrentUser && (
                              <span className="ml-1 text-xs text-gray-500">
                                {message.isRead ? (
                                  <span className="text-blue-500">✓✓</span>
                                ) : (
                                  <span>✓</span>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              
              {/* Message input */}
              <div className="p-3 bg-white border-t border-gray-200">
                <div className="flex items-center">
                  <button 
                    onClick={handleAttachment}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      // Handle file upload
                      console.log('File selected:', e.target.files);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Type a message"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 py-2 px-3 mx-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    disabled={!messageInput.trim()}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-24 h-24 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">Welcome to Chat</h3>
              <p className="text-center max-w-md px-4">
                Select a conversation from the list or start a new chat to begin messaging
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS for loader */}
      <style jsx>{`
        .loader {
          border: 3px solid #f3f3f3;
          border-radius: 50%;
          border-top: 3px solid #22c55e;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}