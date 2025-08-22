// lib/api/payment.api.ts
import api from '../api-client';


export const paymentApi = {
  // Create payment
  createPayment: async (paymentData: {
    bookingId: number;
    amount: number;
    currency?: string;
  }) => {
    const response = await api.post('/Payments/create', paymentData);
    return response.data;
  },

  // Verify payment
  verifyPayment: async (verificationData: {
    paymentId: string;
    orderId: string;
    signature: string;
  }) => {
    const response = await api.post('/Payments/verify', verificationData);
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async (userId: number, params?: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await api.get(`/Payments/user/${userId}/history`, { params });
    return response.data;
  },

  // Get payment by ID
  getPaymentById: async (paymentId: string) => {
    const response = await api.get(`/Payments/${paymentId}`);
    return response.data;
  },

  // Refund payment
  refundPayment: async (paymentId: string, refundData: {
    amount: number;
    reason: string;
  }) => {
    const response = await api.post(`/Payments/${paymentId}/refund`, refundData);
    return response.data;
  },

  // Get payment methods
  getPaymentMethods: async () => {
    const response = await api.get('/Payments/methods');
    return response.data;
  },

  // Add payment method
  addPaymentMethod: async (methodData: any) => {
    const response = await api.post('/Payments/methods', methodData);
    return response.data;
  }
};