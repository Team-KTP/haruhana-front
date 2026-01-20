import { UserRole } from './common';

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignupRequest {
  loginId: string;
  password: string;
  nickname: string;
}

export interface User {
  id: number;
  loginId: string;
  nickname: string;
  role: UserRole;
  createdAt: string;
}
