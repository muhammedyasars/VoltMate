interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1 bg-gray-100 rounded-lg p-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent resize-none focus:outline-none min-h-[60px] max-h-32 text-gray-900"
            placeholder="Type your message here..."
          />
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div className="flex space-x-1">
              <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <i className="ri-emotion-line text-lg"></i>
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <i className="ri-attachment-2 text-lg"></i>
              </button>
            </div>
          </div>
        </div>
        
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            value.trim() 
              ? 'bg-primary-500 text-white hover:bg-primary-600' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          } transition-colors`}
        >
          <i className="ri-send-plane-fill text-xl"></i>
        </button>
      </div>
    </div>
  );
}