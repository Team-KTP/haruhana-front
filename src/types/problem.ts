import { Difficulty } from './common';

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
