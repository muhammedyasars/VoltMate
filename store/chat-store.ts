import { create } from 'zustand';
import { api } from '@/lib/api-client';
import { startSignalRConnection } from '@/lib/signalr';

interface ChatState {
  rooms: any[];
  messages: any[];
  currentRoom: any | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  loading: boolean;
  error: string | null;
  connection: any | null;
  fetchRooms: () => Promise<void>;
  fetchMessages: (roomId: string) => Promise<void>;
  sendMessage: (roomId: string, content: string) => Promise<void>;
  createRoom: (userId: string, managerId?: string) => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  rooms: [],
  messages: [],
  currentRoom: null,
  connectionStatus: 'disconnected',
  loading: false,
  error: null,
  connection: null,

  fetchRooms: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.get('/chat/rooms');
      set({ rooms: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch chat rooms', 
        loading: false 
      });
    }
  },

  fetchMessages: async (roomId) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.get(`/chat/rooms/${roomId}/messages`);
      set({ 
        messages: response.data,
        currentRoom: get().rooms.find(r => r.id === roomId),
        loading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch messages', 
        loading: false 
      });
    }
  },

  sendMessage: async (roomId, content) => {
    try {
      // First try to send via SignalR if connected
      const connection = get().connection;
      if (connection && get().connectionStatus === 'connected') {
        await connection.invoke('SendMessage', roomId, content);
        return;
      }
      
      // Fallback to REST API
      const response = await api.post(`/chat/rooms/${roomId}/messages`, { content });
      
      set(state => ({
        messages: [...state.messages, response.data]
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to send message'
      });
      throw error;
    }
  },

  createRoom: async (userId, managerId) => {
    set({ loading: true, error: null });
    
    try {
      const response = await api.post('/chat/rooms', { userId, managerId });
      
      set(state => ({ 
        rooms: [...state.rooms, response.data],
        currentRoom: response.data,
        loading: false 
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to create chat room', 
        loading: false 
      });
      throw error;
    }
  },

  connect: async () => {
    if (get().connectionStatus !== 'disconnected') return;
    
    set({ connectionStatus: 'connecting' });
    
    try {
      const connection = await startSignalRConnection();
      
      // Register event handlers
      connection.on('ReceiveMessage', (message) => {
        set(state => ({
          messages: [...state.messages, message]
        }));
      });
      
      connection.on('UserJoined', (roomId, userId) => {
        // Update room participants if needed
      });
      
      connection.on('UserLeft', (roomId, userId) => {
        // Update room participants if needed
      });
      
      set({ 
        connection, 
        connectionStatus: 'connected' 
      });
    } catch (error) {
      set({ 
        connectionStatus: 'disconnected',
        error: 'Failed to connect to chat service'
      });
    }
  },

  disconnect: () => {
    const { connection } = get();
    if (connection) {
      connection.stop();
    }
    
    set({ 
      connection: null,
      connectionStatus: 'disconnected'
    });
  }
}));