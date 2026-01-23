import { Difficulty } from '../types/common';

export const APP_NAME = 'HaruHaru';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PREFERENCE_SETUP: '/preference-setup',
  TODAY: '/today',
  RECORDS: '/records',
  SETTINGS: '/settings',
} as const;

export const DIFFICULTY_LABELS: Record<string, string> = {
  EASY: '쉬움',
  MEDIUM: '보통',
  HARD: '어려움',
} as const;

export const DIFFICULTY_OPTIONS: Array<{
  value: Difficulty;
  label: string;
  description: string;
  icon: string;
}> = [
  { value: 'EASY', label: '쉬움', description: '기본 개념 위주', icon: '🌱' },
  { value: 'MEDIUM', label: '보통', description: '실무 응용 수준', icon: '🌿' },
  { value: 'HARD', label: '어려움', description: '심화 문제', icon: '🌳' },
];

export const ROLE_LABELS = {
  GUEST: '게스트',
  MEMBER: '회원',
} as const;
