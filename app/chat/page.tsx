'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/header';
import ChatWindow from '@/components/chat/chat-window';
import ChatRoomList from '@/components/chat/chat-room-list';
import { useChatStore } from '@/store/chat-store';
import { useAuthStore } from '@/store/auth-store';

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const { user } = useAuthStore();
  const { rooms, messages, sendMessage, fetchRooms, fetchMessages } = useChatStore();

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom);
    }
  }, [selectedRoom]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Rooms List */}
            <div className="border-r border-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Support Chat</h2>
                <p className="text-sm text-gray-500 mt-1">Get help with your charging needs</p>
              </div>
              <ChatRoomList
                rooms={rooms}
                selectedRoom={selectedRoom}
                onSelectRoom={setSelectedRoom}
              />
            </div>

            {/* Chat Window */}
            <div className="md:col-span-2 flex flex-col h-full">
              {selectedRoom ? (
                <ChatWindow
                  room={rooms.find(r => r.id === selectedRoom)}
                  messages={messages}
                  onSendMessage={(content) => sendMessage(selectedRoom, content)}
                  currentUser={user}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <i className="ri-chat-3-line text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}