// Streak 응답 (백엔드 API 스펙)
export interface StreakResponse {
  currentStreak: number;
  maxStreak: number;
}

// Streak History (백엔드에 API 없음 - 추후 구현 필요)
export interface StreakHistory {
  date: string;
  isSubmitted: boolean;
}
