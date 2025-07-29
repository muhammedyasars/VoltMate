import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async () => {
  if (connection) return connection;
  
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/hubs/chat`, {
      accessTokenFactory: () => localStorage.getItem('token') || ''
    })
    .withAutomaticReconnect()
    .build();
  
  await connection.start();
  return connection;
};

export const stopSignalRConnection = async () => {
  if (connection) {
    await connection.stop();
    connection = null;
  }
};

export const joinRoom = async (roomId: string) => {
  if (!connection) {
    throw new Error('SignalR connection not established');
  }
  
  await connection.invoke('JoinRoom', roomId);
};

export const leaveRoom = async (roomId: string) => {
  if (!connection) {
    throw new Error('SignalR connection not established');
  }
  
  await connection.invoke('LeaveRoom', roomId);
};