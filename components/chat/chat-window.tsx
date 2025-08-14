// components/chat/chat-window.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Message } from '@/types/chats';
import { User } from '@/types/user';

interface ChatWindowProps {
  room: any;
  messages: Message[];
  onSendMessage: (content: string) => void;
  currentUser: User | null;
  isTyping?: boolean;
}

export default function ChatWindow({ 
  room, 
  messages, 
  onSendMessage, 
  currentUser,
  isTyping = false
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    const content = inputRef.current?.value.trim();
    if (content && content.length > 0) {
      onSendMessage(content);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to format timestamps
  const formatTime = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to format dates for message groups
  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Group messages by date
  const messageGroups: { date: string, messages: Message[] }[] = [];
  let currentDate = '';
  
  messages.forEach(message => {
    const messageDate = formatDate(message.timestamp);
    
    if (messageDate !== currentDate) {
      currentDate = messageDate;
      messageGroups.push({
        date: messageDate,
        messages: [message]
      });
    } else {
      messageGroups[messageGroups.length - 1].messages.push(message);
    }
  });

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                {group.date}
              </div>
            </div>
            
            {group.messages.map((message, index) => {
              const isCurrentUser = message.sender.id === currentUser?.id;
              const showAvatar = index === 0 || 
                group.messages[index - 1].sender.id !== message.sender.id;
                
              return (
                <div key={message.id} className={`flex mb-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  {!isCurrentUser && showAvatar && (
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        {message.sender.avatar ? (
                          <img 
                            src={message.sender.avatar} 
                            alt={message.sender.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-blue-600 font-medium text-sm">
                            {message.sender.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] ${!isCurrentUser && !showAvatar ? 'ml-11' : ''}`}>
                    {showAvatar && !isCurrentUser && (
                      <div className="text-xs text-gray-500 mb-1 ml-1">
                        {message.sender.name}
                      </div>
                    )}
                    
                    <div className="flex items-end">
                      <div className={`p-3 rounded-2xl ${
                        isCurrentUser 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        {/* Handle different message types */}
                        {message.content.startsWith('[Attachment:') ? (
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-2">
                              <i className="ri-file-line text-sm"></i>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{message.content.replace(/```mathAttachment: (.*)```/, '$1')}</div>
                              <div className="text-xs opacity-80">Attachment</div>
                            </div>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                      
                      {/* Message reactions */}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className={`ml-2 flex items-center bg-white rounded-full px-2 py-1 border shadow-sm ${
                          isCurrentUser ? 'border-green-200' : 'border-gray-200'
                        }`}>
                          {message.reactions.map((reaction:any, i:any) => (
                            <span key={i} className="text-sm mr-1">{reaction.emoji}</span>
                          ))}
                          <span className="text-xs text-gray-500">{message.reactions.length}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center mt-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-gray-500 flex items-center">
                          {message.isRead ? (
                            <>
                              <i className="ri-check-double-line text-green-500"></i>
                              <span className="ml-1">Read</span>
                            </>
                          ) : (
                            <>
                              <i className="ri-check-line"></i>
                              <span className="ml-1">Sent</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {isCurrentUser && showAvatar && (
                    <div className="flex-shrink-0 ml-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        {currentUser.avatar ? (
                          <img 
                            src={currentUser.avatar} 
                            alt={currentUser.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-green-600 font-medium text-sm">
                            {currentUser.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex mb-3 justify-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="ri-customer-service-2-line text-blue-600"></i>
              </div>
            </div>
            <div className="max-w-[75%]">
              <div className="p-3 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-1">
                Agent is typing...
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}