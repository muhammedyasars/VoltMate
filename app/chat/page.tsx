'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/header';
import ChatWindow from '@/components/chat/chat-window';
import ChatRoomList from '@/components/chat/chat-room-list';
import { useChatStore } from '@/store/chat-store';
import { useAuthStore } from '@/store/auth-store';
// import AnimatedBackground from '@/components/AnimatedBackground';
import Button from '@/components/ui/button';

const quickReplies = [
  { id: 1, text: "I'll check that for you right away." },
  { id: 2, text: "Could you provide more details about the issue?" },
  { id: 3, text: "Have you tried restarting the charging session?" },
  { id: 4, text: "I'm transferring you to our technical specialist." },
  { id: 5, text: "What error message are you seeing on the charger?" },
];

const chatFilters = [
  { id: 'all', label: 'All Conversations', icon: 'ri-message-3-line' },
  { id: 'unread', label: 'Unread', icon: 'ri-mail-unread-line' },
  { id: 'active', label: 'Active', icon: 'ri-chat-3-line' },
  { id: 'resolved', label: 'Resolved', icon: 'ri-check-double-line' },
  { id: 'starred', label: 'Starred', icon: 'ri-star-line' },
];

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuthStore();
  const { rooms, messages, sendMessage, fetchRooms, fetchMessages } = useChatStore();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom);
    }
  }, [selectedRoom, fetchMessages]);

  const handleSendMessage = (content: string) => {
    if (selectedRoom) {
      sendMessage(selectedRoom, content);
      
      // Simulate agent typing response after user sends message
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Here you would implement actual file upload logic
      console.log('Files selected:', files);
      
      // For demo purposes, simulate sending a message with an attachment
      if (selectedRoom) {
        sendMessage(selectedRoom, `[Attachment: ${files[0].name}]`);
      }
    }
  };

  const filteredRooms = rooms.filter(room => {
    // Apply search filter
    if (searchQuery && !room.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread' && room.unreadCount > 0) return true;
    if (activeFilter === 'active' && room.status === 'active') return true;
    if (activeFilter === 'resolved' && room.status === 'resolved') return true;
    if (activeFilter === 'starred' && room.isStarred) return true;
    
    return false;
  });

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* <AnimatedBackground /> */}
      <Header />
      
      {/* Chat Header with enhanced styling */}
      <section className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
              <span className="text-green-400 text-sm font-medium">
                <i className="ri-customer-service-2-line mr-2"></i>
                24/7 Support
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Chat Support
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get real-time assistance with your EV charging needs from our dedicated support team
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Chat Container */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden" 
               style={{ height: 'calc(100vh - 250px)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 h-full">
              {/* Chat Sidebar */}
              <div className="md:border-r border-gray-200 flex flex-col h-full">
                {/* Search and Filters */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative mb-4">
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                               focus:bg-white transition-all duration-300"
                    />
                  </div>
                  
                  {/* Chat Filters */}
                  <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar">
                    {chatFilters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap flex items-center
                                  transition-all duration-300 ${
                                    activeFilter === filter.id
                                      ? 'bg-green-100 text-green-700 border border-green-200'
                                      : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                                  }`}
                      >
                        <i className={`${filter.icon} mr-1.5`}></i>
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Chat Room List */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                  {filteredRooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <i className="ri-chat-off-line text-gray-400 text-2xl"></i>
                      </div>
                      <p className="text-gray-500 font-medium mb-1">No conversations found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                    </div>
                  ) : (
                    <ChatRoomList
                      rooms={filteredRooms}
                      selectedRoom={selectedRoom}
                      onSelectRoom={setSelectedRoom}
                    />
                  )}
                </div>
                
                {/* Start New Chat Button */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <button 
                    className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white 
                             rounded-lg font-medium flex items-center justify-center hover:from-green-600 
                             hover:to-green-700 transition-all duration-300 shadow-sm"
                  >
                    <i className="ri-chat-new-line mr-2"></i>
                    New Conversation
                  </button>
                </div>
              </div>

              {/* Chat Window */}
              <div className="md:col-span-2 flex flex-col h-full bg-gradient-to-br from-gray-50 to-white relative">
                {selectedRoom ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <i className="ri-customer-service-2-line text-green-600"></i>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-900">
                            {rooms.find(r => r.id === selectedRoom)?.name || 'Support Agent'}
                          </h3>
                          <p className="text-xs text-green-600 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                            Online • Typically replies in 5 minutes
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                          <i className="ri-phone-line text-gray-600"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                          <i className="ri-vidicon-line text-gray-600"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                          <i className="ri-more-2-fill text-gray-600"></i>
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced Chat Window */}
                    <ChatWindow
                      room={rooms.find(r => r.id === selectedRoom)}
                      messages={messages}
                      onSendMessage={handleSendMessage}
                      currentUser={user}
                      isTyping={isTyping}
                    />
                    
                    {/* Chat Input Area with Enhanced Features */}
                    <div className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
                      {/* Quick Replies */}
                      <div className="mb-3 flex space-x-2 overflow-x-auto pb-2 custom-scrollbar">
                        {quickReplies.map(reply => (
                          <button
                            key={reply.id}
                            onClick={() => handleSendMessage(reply.text)}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap
                                     hover:bg-green-100 hover:text-green-700 transition-colors"
                          >
                            {reply.text}
                          </button>
                        ))}
                      </div>
                      
                      {/* Input Box with Attachments and AI */}
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={handleAttachmentClick}
                          className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center
                                   bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <i className="ri-attachment-2 text-gray-600"></i>
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        
                        <div className="relative flex-grow">
                          <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full pl-4 pr-10 py-3 bg-gray-100 border border-gray-200 rounded-lg 
                                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                     focus:bg-white transition-all duration-300"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage((e.target as HTMLInputElement).value)}
                          />
                          <button 
                            onClick={() => setShowAiAssistant(!showAiAssistant)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center 
                                      justify-center transition-colors ${
                                        showAiAssistant 
                                          ? 'bg-green-500 text-white' 
                                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                      }`}
                          >
                            <i className="ri-robot-line text-sm"></i>
                          </button>
                        </div>
                        
                        <button className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center
                                         bg-gradient-to-r from-green-500 to-green-600 text-white
                                         hover:from-green-600 hover:to-green-700 transition-colors shadow-sm">
                          <i className="ri-send-plane-fill"></i>
                        </button>
                      </div>
                      
                      {/* AI Assistant Suggestions */}
                      {showAiAssistant && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center mr-2">
                                <i className="ri-robot-line text-green-700 text-xs"></i>
                              </div>
                              <span className="text-sm font-medium text-green-800">AI Assistant Suggestions</span>
                            </div>
                            <button 
                              onClick={() => setShowAiAssistant(false)}
                              className="text-green-700 hover:text-green-900"
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          </div>
                          <div className="space-y-2">
                            {[
                              "I see you're having an issue with charging. Is the station powering on correctly?",
                              "What error code is displaying on the charging station screen?",
                              "Could you share a photo of the charging connector?"
                            ].map((suggestion, i) => (
                              <button
                                key={i}
                                onClick={() => handleSendMessage(suggestion)}
                                className="w-full text-left p-2 text-sm bg-white border border-green-100 rounded-md
                                         hover:bg-green-100 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                    <div className="text-center p-8 max-w-md">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-customer-service-line text-green-600 text-3xl"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EVCharge Support</h3>
                      <p className="text-gray-600 mb-8">
                        Select a conversation or start a new chat to get help with your charging needs
                      </p>
                      <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg 
                                       font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-md">
                        <i className="ri-chat-new-line mr-2"></i>
                        Start New Chat
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}