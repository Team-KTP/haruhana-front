import { Difficulty } from './common';

// 카테고리 (사용 안함 - 백엔드에 카테고리 조회 API 없음)
export interface Category {
  id: number;
  name: string;
  level: number;
  parentId?: number;
}

// 선호도 등록 요청 (GUEST -> MEMBER)
export interface PreferenceRegisterRequest {
  categoryTopicId: number;
  difficulty: Difficulty;
}

// 선호도 수정 요청
export interface PreferenceUpdateRequest {
  categoryTopicId: number;
  difficulty: Difficulty;
}

// 오늘의 문제 응답
export interface TodayProblemResponse {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  categoryTopicName: string;
  isSolved: boolean;
}

// 데일리 문제 미리보기 응답
export interface DailyProblemResponse {
  id: number;
  difficulty: Difficulty;
  categoryTopic: string;
  title: string;
  isSolved: boolean;
}

// 데일리 문제 상세 응답
export interface DailyProblemDetailResponse {
  id: number;
  difficulty: Difficulty;
  categoryTopic: string;
  assignedAt: string; // date (YYYY-MM-DD)
  title: string;
  description: string;
  userAnswer?: string | null;
  submittedAt?: string | null; // date-time
  aiAnswer?: string | null;
}

// 문제 제출 요청
export interface SubmitSolutionRequest {
  userAnswer: string;
}

// 문제 제출 응답
export interface SubmissionResponse {
  submissionId: number;
  dailyProblemId: number;
  userAnswer: string;
  submittedAt: string; // date-time
  isOnTime: boolean;
  aiAnswer: string;
}
