import { formatDistanceToNow } from 'date-fns';

interface MessageItemProps {
  message: {
    id: string;
    content: string;
    createdAt: string;
    sender: {
      id: string;
      name: string;
    };
    isSystem?: boolean;
  };
  isOwnMessage: boolean;
}

export default function MessageItem({ message, isOwnMessage }: MessageItemProps) {
  // Format the date
  const formattedDate = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true });
  
  // System messages are centered and have a different style
  if (message.isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-sm max-w-xs">
          {message.content}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className="flex max-w-xs lg:max-w-md">
        {!isOwnMessage && (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
            <span className="text-xs font-medium text-blue-700">
              {message.sender.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        
        <div>
          {!isOwnMessage && (
            <p className="text-xs text-gray-500 mb-1">{message.sender.name}</p>
          )}
          
          <div className={`py-2 px-4 rounded-lg ${
            isOwnMessage 
              ? 'bg-primary-500 text-white rounded-tr-none' 
              : 'bg-gray-100 text-gray-900 rounded-tl-none'
          }`}>
            <p>{message.content}</p>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
}