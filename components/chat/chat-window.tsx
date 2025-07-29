'use client';

import { useState, useRef, useEffect } from 'react';
import MessageItem from '@/components/chat/message-item';
import MessageInput from '@/components/chat/message-input';

interface ChatWindowProps {
  room: any;
  messages: any[];
  onSendMessage: (content: string) => void;
  currentUser: any;
}

export default function ChatWindow({ room, messages, onSendMessage, currentUser }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <>
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
          {room?.isSupport ? (
            <i className="ri-customer-service-2-line text-primary-600"></i>
          ) : (
            <span className="font-medium text-primary-600">
              {room?.name?.substring(0, 2).toUpperCase() || 'CH'}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{room?.name || 'Chat'}</h3>
          <p className="text-xs text-gray-500">
            {room?.isSupport ? 'Support Agent' : room?.participants?.length + ' participants'}
          </p>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-chat-3-line text-2xl text-gray-400"></i>
              </div>
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isOwnMessage={message.senderId === currentUser?.id}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
      />
    </>
  );
}