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

export const DIFFICULTY_LABELS = {
  EASY: '쉬움',
  MEDIUM: '보통',
  HARD: '어려움',
} as const;

export const ROLE_LABELS = {
  GUEST: '게스트',
  MEMBER: '회원',
} as const;
