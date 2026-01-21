import { Difficulty } from './common';

// 카테고리 토픽(소분류) 응답
export interface CategoryTopicResponse {
  id: number;
  name: string;
}

// 카테고리 그룹(중분류) 응답
export interface CategoryGroupResponse {
  id: number;
  name: string;
  topics: CategoryTopicResponse[];
}

// 카테고리(대분류) 응답
export interface CategoryResponse {
  id: number;
  name: string;
  groups: CategoryGroupResponse[];
}

// 카테고리 목록 응답
export interface CategoryListResponse {
  categories: CategoryResponse[];
}

// 학습 설정 등록 요청
export interface PreferenceRegisterRequest {
  categoryTopicId: number;
  difficulty: Difficulty;
}

// 학습 설정 수정 요청
export interface PreferenceUpdateRequest {
  categoryTopicId: number;
  difficulty: Difficulty;
}
