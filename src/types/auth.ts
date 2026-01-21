import { Difficulty, UserRole } from './common';

// 로그인 요청
export interface LoginRequest {
  loginId: string;
  password: string;
}

// 토큰 응답
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// 토큰 재발급 요청
export interface TokenReissueRequest {
  refreshToken: string;
}

// 회원가입 요청
export interface MemberCreateRequest {
  loginId: string;
  password: string;
  nickname: string;
  categoryTopicId: number;
  difficulty: Difficulty;
}

// 회원 프로필 응답
export interface MemberProfileResponse {
  loginId: string;
  nickname: string;
  createdAt: string; // ISO 8601 date-time
  categoryTopicName?: string;
  difficulty?: Difficulty;
}

// 사용자 정보 (로컬 상태 관리용)
export interface User {
  loginId: string;
  nickname: string;
  role: UserRole;
  createdAt: string;
  categoryTopicName?: string;
  difficulty?: Difficulty;
}
