// types/chat.ts
export interface Room {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: Message;
  unreadCount: number;
  isOnline: boolean;
  status: 'active' | 'resolved' | 'pending';
  isStarred: boolean;
  tags?: string[];
  createdAt: Date | string;
}

export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date | string;
  isRead: boolean;
  reactions?: MessageReaction[];
}

export interface MessageReaction {
  userId: string;
  emoji: string;
  timestamp: Date | string;
}

export interface ChatState {
  rooms: Room[];
  messages: Message[];
  loading: boolean;
  error: string | null;
}