export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type UserRole = 'GUEST' | 'MEMBER';
