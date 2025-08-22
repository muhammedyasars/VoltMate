export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  uniqueId?: string;
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: any;
}

export interface LoginResponseData {
  token: string;
  userType: string;
  userId: number;
  email: string;
  name: string;
  uniqueId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  uniqueId?: string;
}