import client from './client';
import { StreakResponse } from '../types/streak';
import { ApiResponse } from '../types/common';

/**
 * 현재 스트릭 조회 API
 * GET /v1/streaks
 */
export const getStreak = async (): Promise<StreakResponse> => {
  const response = await client.get<ApiResponse<StreakResponse>>('/v1/streaks');
  return response.data.data;
};

// Note: 스트릭 히스토리 API는 백엔드에 아직 구현되지 않음
