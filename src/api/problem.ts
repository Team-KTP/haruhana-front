import client from './client';
import {
  TodayProblemResponse,
  DailyProblemResponse,
  DailyProblemDetailResponse,
  SubmitSolutionRequest,
  SubmissionResponse,
} from '../types/problem';
import { ApiResponse } from '../types/common';

/**
 * 오늘의 문제 조회 API
 * GET /v1/daily-problem/today
 */
export const getTodayProblem = async (): Promise<TodayProblemResponse> => {
  const response = await client.get<ApiResponse<TodayProblemResponse>>('/v1/daily-problem/today');
  return response.data.data;
};

/**
 * 날짜별 데일리 문제 미리보기 조회 API
 * GET /v1/daily-problem
 * @param date - 조회할 날짜 (YYYY-MM-DD), 미제공 시 오늘 날짜
 */
export const getDailyProblem = async (date?: string): Promise<DailyProblemResponse> => {
  const response = await client.get<ApiResponse<DailyProblemResponse>>('/v1/daily-problem', {
    params: date ? { date } : undefined,
  });
  return response.data.data;
};

/**
 * 문제 상세 조회 API
 * GET /v1/daily-problem/{dailyProblemId}
 */
export const getDailyProblemDetail = async (
  dailyProblemId: number
): Promise<DailyProblemDetailResponse> => {
  const response = await client.get<ApiResponse<DailyProblemDetailResponse>>(
    `/v1/daily-problem/${dailyProblemId}`
  );
  return response.data.data;
};

/**
 * 문제 제출 API
 * POST /v1/daily-problem/{dailyProblemId}/submissions
 * - 이미 제출한 경우 답변이 업데이트됨
 */
export const submitSolution = async (
  dailyProblemId: number,
  data: SubmitSolutionRequest
): Promise<SubmissionResponse> => {
  const response = await client.post<ApiResponse<SubmissionResponse>>(
    `/v1/daily-problem/${dailyProblemId}/submissions`,
    data
  );
  return response.data.data;
};
