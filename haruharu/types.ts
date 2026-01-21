export enum UserRole {
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface User {
  id: string;
  loginId: string;
  nickname: string;
  role: UserRole;
  lastLoginAt: number;
}

export interface CategoryTopic {
  id: string;
  name: string;
  categoryId: string;
}

export interface Preference {
  difficulty: Difficulty;
  topicId: string;
  topicName: string;
  effectiveAt: number; // Timestamp
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  aiAnswer: string;
  topic: string;
  difficulty: Difficulty;
  problemAt: string; // YYYY-MM-DD
}

export interface Submission {
  id: string;
  memberId: string;
  problemId: string;
  answer: string;
  submittedAt: number;
  isOnTime: boolean;
}

export interface Streak {
  currentStreak: number;
  maxStreak: number;
  lastSolvedDate: string | null; // YYYY-MM-DD
}

export interface DailyStatus {
  hasPreference: boolean;
  todayProblem: Problem | null;
  todaySubmission: Submission | null;
  streak: Streak;
}