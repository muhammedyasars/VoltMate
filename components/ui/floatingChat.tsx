'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { useModalStore } from '@/store/modal-store';
import { MessageSquare, X, Send, ChevronRight, Image, Paperclip } from 'lucide-react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { onOpen } = useModalStore();
  const router = useRouter();


  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        
        const endTimer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        
        return () => clearTimeout(endTimer);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      onOpen('login');
      return;
    }
    
    if (message.trim()) {
      router.push(`/chat?message=${encodeURIComponent(message)}`);
      setIsOpen(false);
      setMessage('');
    }
  };

  const quickReplies = [
    "I need help finding a charging station",
    "How do I book a charging slot?",
    "What payment methods are accepted?",
    "I'm having trouble with my account"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-4 w-96 bg-white rounded-xl shadow-2xl overflow-hidden animate-slideUp border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-300 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold">EVCharge Support</h3>
                  <div className="flex items-center text-xs">
                    <span className="inline-block w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
                    <span className="opacity-90">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="p-4 h-80 overflow-y-auto bg-gradient-to-b from-gray-50 to-white" id="chat-messages">
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="bg-gray-100 py-3 px-4 rounded-xl rounded-tl-none max-w-xs shadow-sm">
                    <p className="text-sm text-gray-800">Hi there! 👋 How can I help with your EV charging needs today?</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 ml-2">
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 py-3 px-4 rounded-xl rounded-tl-none inline-block shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Replies */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button 
                    key={index}
                    onClick={() => setMessage(reply)}
                    className="text-xs bg-white text-green-700 px-3 py-1.5 rounded-full border border-green-200 hover:bg-green-50 transition-colors shadow-sm flex items-center"
                  >
                    {reply}
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white pl-10"
                  placeholder="Type your message..."
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                  message.trim() 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                {isAuthenticated 
                  ? 'Conversation will be saved to your account' 
                  : 'Sign in to save this conversation'}
              </p>
              {!isAuthenticated && (
                <button 
                  type="button" 
                  onClick={() => onOpen('login')}
                  className="text-xs text-green-600 hover:text-green-700 font-medium"
                >
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      
      {/* Chat Button with Pulse Effect */}
      <div className="relative">
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${
            isOpen 
              ? 'bg-gradient-to-r from-red-500 to-red-600 rotate-90 scale-95' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-green-500/20 hover:shadow-2xl'
          }`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="text-white w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="text-white w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}