import client from './client';
import {
  LoginRequest,
  TokenResponse,
  TokenReissueRequest,
  MemberCreateRequest,
  MemberProfileResponse,
} from '../types/auth';
import { ApiResponse } from '../types/common';

/**
 * 로그인 API
 * POST /v1/auth/login
 */
export const login = async (data: LoginRequest): Promise<TokenResponse> => {
  const response = await client.post<ApiResponse<TokenResponse>>('/v1/auth/login', data);
  return response.data.data;
};

/**
 * 회원가입 API
 * POST /v1/members/sign-up
 * @returns 생성된 회원 ID
 */
export const signup = async (data: MemberCreateRequest): Promise<number> => {
  const response = await client.post<ApiResponse<number>>('/v1/members/sign-up', data);
  return response.data.data;
};

/**
 * 로그아웃 API
 * POST /v1/auth/logout
 */
export const logout = async (): Promise<void> => {
  await client.post('/v1/auth/logout');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
 * 현재 사용자 프로필 조회 API
 * GET /v1/members
 */
export const getCurrentUser = async (): Promise<MemberProfileResponse> => {
  const response = await client.get<ApiResponse<MemberProfileResponse>>('/v1/members');
  return response.data.data;
};

/**
 * 토큰 재발급 API
 * POST /v1/auth/reissue
 */
export const reissueToken = async (refreshToken: string): Promise<TokenResponse> => {
  const response = await client.post<ApiResponse<TokenResponse>>('/v1/auth/reissue', {
    refreshToken,
  } as TokenReissueRequest);
  return response.data.data;
};
