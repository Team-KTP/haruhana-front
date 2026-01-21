import client from './client';
import { ApiResponse } from '../types/common';
import {
  CategoryListResponse,
  PreferenceRegisterRequest,
  PreferenceUpdateRequest,
} from '../types/preference';

/**
 * 카테고리 목록 조회 API
 * GET /v1/categories
 */
export const getCategories = async (): Promise<CategoryListResponse> => {
  const response = await client.get<ApiResponse<CategoryListResponse>>('/v1/categories');
  return response.data.data;
};

/**
 * 학습 설정 등록 API
 * POST /v1/members/preferences
 */
export const registerPreference = async (data: PreferenceRegisterRequest): Promise<void> => {
  await client.post('/v1/members/preferences', data);
};

/**
 * 학습 설정 수정 API
 * PATCH /v1/members/preferences
 */
export const updatePreference = async (data: PreferenceUpdateRequest): Promise<void> => {
  await client.patch('/v1/members/preferences', data);
};
