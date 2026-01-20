import { Difficulty } from './common';

export interface Category {
  id: number;
  name: string;
  level: number;
  parentId?: number;
}

export interface Problem {
  id: number;
  title: string;
  content: string;
  difficulty: Difficulty;
  categoryId: number;
}

export interface DailyProblem {
  id: number;
  problem: Problem;
  assignedAt: string;
  isSubmitted: boolean;
  userAnswer?: string;
  aiAnswer?: string;
  submittedAt?: string;
}

export interface SubmitAnswerRequest {
  dailyProblemId: number;
  answer: string;
}

export interface PreferenceSetupRequest {
  difficulty: Difficulty;
  categoryIds: number[];
}
