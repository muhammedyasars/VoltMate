// lib/api/chat.api.ts
import api from '../api-client';


export const chatApi = {
  // Get all chat rooms for the current user
  getChatRooms: async () => {
    const response = await api.get('/Chat/rooms');
    return response.data.data; // Accessing 'data' property from response
  },
  
  // Get a specific chat room by ID
  getChatRoom: async (roomId: string | number) => {
    const response = await api.get(`/Chat/rooms/${roomId}`);
    return response.data.data;
  },
  
  // Get messages for a specific chat room
  getChatMessages: async (roomId: string | number, page = 1, pageSize = 50) => {
    const response = await api.get(`/Chat/rooms/${roomId}/messages`, {
      params: { page, pageSize }
    });
    return response.data.data;
  },
  
  // Send a message to a chat room
  sendMessage: async (roomId: string | number, messageDto: { message: string }) => {
    const response = await api.post(`/Chat/rooms/${roomId}/messages`, messageDto);
    return response.data.data;
  },
  
  // Mark messages as read in a chat room
  markMessagesAsRead: async (roomId: string | number) => {
    const response = await api.post(`/Chat/rooms/${roomId}/messages/mark-read`);
    return response.data;
  },
  
  // Create a new chat room
  createChatRoom: async (createDto: { name: string, participantIds: number[] }) => {
    const response = await api.post('/Chat/rooms', createDto);
    return response.data.data;
  },
  
  // Close a chat room
  closeChatRoom: async (roomId: string | number) => {
    const response = await api.post(`/Chat/rooms/${roomId}/close`);
    return response.data;
  }
};