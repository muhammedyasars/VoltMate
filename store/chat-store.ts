// store/chat-store.ts
import { create } from 'zustand';
import { chatApi } from '@/lib/api/chat.api';

// Define interfaces based on your backend response structure
interface ChatRoom {
  id: string;
  name: string;
  status: string;
  isStarred: boolean;
  unreadCount: number;
  lastMessageText?: string;
  lastMessageAt?: string;
  participants: { userId: number; userName: string }[];
}

interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  message: string; // Note: changed from 'content' to 'message' to match backend
  messageType: string;
  attachmentUrl?: string;
  isRead: boolean;
  sentAt: string; // Note: changed from 'createdAt' to 'sentAt' to match backend
  isCurrentUser: boolean;
}

interface ChatState {
  rooms: ChatRoom[];
  messages: ChatMessage[];
  activeRoom: string | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchRooms: () => Promise<void>;
  fetchMessages: (roomId: string) => Promise<void>;
  sendMessage: (roomId: string, message: string) => Promise<void>;
  createRoom: (name: string, participantIds: number[]) => Promise<void>;
  markAsRead: (roomId: string) => Promise<void>;
  setActiveRoom: (roomId: string | null) => void;
  closeRoom: (roomId: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  rooms: [],
  messages: [],
  activeRoom: null,
  loading: false,
  error: null,
  
  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const data = await chatApi.getChatRooms();
      // Ensure we have an array even if the API returns null or undefined
      set({ rooms: Array.isArray(data) ? data : [], loading: false });
    } catch (error: any) {
      console.error('Failed to fetch rooms:', error);
      set({ 
        error: error.message || 'Failed to load chat rooms', 
        loading: false,
        rooms: [] // Ensure rooms is always an array
      });
    }
  },
  
  fetchMessages: async (roomId: string) => {
    set({ loading: true, error: null });
    try {
      const data = await chatApi.getChatMessages(roomId);
      // Ensure we have an array even if the API returns null or undefined
      set({ messages: Array.isArray(data) ? data : [], loading: false });
    } catch (error: any) {
      console.error(`Failed to fetch messages for room ${roomId}:`, error);
      set({ 
        error: error.message || 'Failed to load messages', 
        loading: false,
        messages: [] // Ensure messages is always an array
      });
    }
  },
  
  sendMessage: async (roomId: string, message: string) => {
    try {
      const sentMessage = await chatApi.sendMessage(roomId, { message });
      
      // Optimistically update messages list
      const currentMessages = get().messages;
      set({ 
        messages: [...currentMessages, sentMessage]
      });
      
      // Refresh rooms to update last message
      get().fetchRooms();
    } catch (error: any) {
      console.error('Failed to send message:', error);
      set({ error: error.message || 'Failed to send message' });
    }
  },
  
  createRoom: async (name: string, participantIds: number[]) => {
    try {
      const room = await chatApi.createChatRoom({
        name,
        participantIds
      });
      
      // Add new room to list and refresh
      await get().fetchRooms();
      set({ activeRoom: room.id });
    } catch (error: any) {
      console.error('Failed to create room:', error);
      set({ error: error.message || 'Failed to create chat room' });
    }
  },
  
  markAsRead: async (roomId: string) => {
    try {
      await chatApi.markMessagesAsRead(roomId);
      
      // Update unread count locally
      const rooms = get().rooms.map(room => 
        room.id === roomId ? { ...room, unreadCount: 0 } : room
      );
      
      set({ rooms });
    } catch (error: any) {
      console.error('Failed to mark messages as read:', error);
    }
  },
  
  setActiveRoom: (roomId: string | null) => {
    set({ activeRoom: roomId });
    if (roomId) {
      get().markAsRead(roomId);
    }
  },
  
  closeRoom: async (roomId: string) => {
    try {
      await chatApi.closeChatRoom(roomId);
      
      // Update room status locally
      const rooms = get().rooms.map(room => 
        room.id === roomId ? { ...room, status: 'closed' } : room
      );
      
      set({ rooms });
      
      // If this was the active room, clear it
      if (get().activeRoom === roomId) {
        set({ activeRoom: null });
      }
    } catch (error: any) {
      console.error('Failed to close room:', error);
      set({ error: error.message || 'Failed to close chat room' });
    }
  }
}));