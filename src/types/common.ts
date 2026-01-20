export interface ApiResponse<T> {
  result: 'SUCCESS' | 'ERROR';
  data: T;
  error?: ErrorMessage;
}

export interface ErrorMessage {
  code: string;
  message: string;
  data?: unknown;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type UserRole = 'ROLE_GUEST' | 'ROLE_MEMBER';
