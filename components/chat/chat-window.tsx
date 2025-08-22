// components/chat/chat-window.tsx
import { useRef, useEffect } from 'react';
import { format } from 'date-fns';

interface ChatRoom {
  id: string;
  name: string;
  status: string;
  participants: { userId: number; userName: string }[];
}

interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  message: string;
  messageType: string;
  attachmentUrl?: string;
  isRead: boolean;
  sentAt: string;
  isCurrentUser: boolean;
}

interface ChatWindowProps {
  room?: ChatRoom;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  currentUser: any;
  isTyping: boolean;
}

export default function ChatWindow({ 
  room, messages, onSendMessage, currentUser, isTyping 
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format time for display
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
  };

  // Group messages by date
  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [date: string]: ChatMessage[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.sentAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages
    }));
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i className="ri-chat-3-line text-gray-400 text-2xl"></i>
          </div>
          <p className="text-gray-500 font-medium mb-1">No messages yet</p>
          <p className="text-gray-400 text-sm">Start the conversation</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messageGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 rounded-full px-3 py-1">
                  <span className="text-xs text-gray-600 font-medium">{group.date}</span>
                </div>
              </div>
              
              {group.messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  {!message.isCurrentUser && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <i className="ri-customer-service-2-line text-green-600 text-sm"></i>
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] ${message.isCurrentUser ? 'order-first mr-2' : 'order-last ml-2'}`}>
                    <div 
                      className={`p-3 rounded-lg ${
                        message.isCurrentUser 
                          ? 'bg-green-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.messageType === 'text' ? (
                        <p>{message.message}</p>
                      ) : message.messageType === 'image' ? (
                        <img 
                          src={message.attachmentUrl} 
                          alt="Attachment" 
                          className="rounded-md max-w-full"
                        />
                      ) : (
                        <div className="flex items-center">
                          <i className="ri-file-line mr-2"></i>
                          <span>{message.message}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center mt-1 text-xs ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-gray-500">{formatTime(message.sentAt)}</span>
                      {message.isCurrentUser && (
                        <span className="ml-2">
                          {message.isRead ? (
                            <i className="ri-check-double-line text-green-500"></i>
                          ) : (
                            <i className="ri-check-line text-gray-400"></i>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {message.isCurrentUser && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">
                        {currentUser?.name?.substring(0, 2)?.toUpperCase() || 'ME'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                <i className="ri-customer-service-2-line text-green-600 text-sm"></i>
              </div>
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Empty div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}