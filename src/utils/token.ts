import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../types/common';

interface JwtPayload {
  sub: string; // memberId
  category: string; // accessToken or refreshToken
  Authorization: UserRole; // ROLE_MEMBER or ROLE_GUEST
  exp: number;
  iat: number;
}

/**
 * JWT 토큰에서 역할 정보를 추출합니다.
 */
export function getRoleFromToken(token: string): UserRole | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.Authorization;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * JWT 토큰이 유효한지 확인합니다 (만료 여부).
 */
export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

/**
 * JWT 토큰에서 사용자 ID를 추출합니다.
 */
export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}
