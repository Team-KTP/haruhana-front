import { User, Preference, Streak, Problem, Submission, UserRole, Difficulty } from "../types";
import { TOPICS, MOCK_USER_ID } from "../constants";

const STORAGE_KEYS = {
  USER: 'haru_user',
  PREFERENCE: 'haru_pref',
  STREAK: 'haru_streak',
  PROBLEMS: 'haru_problems',
  SUBMISSIONS: 'haru_submissions',
  INIT: 'haru_init'
};

// Helper
const getToday = () => new Date().toISOString().split('T')[0];

export const storageService = {
  // --- Initialization (Mock Data) ---
  initializeMockData: () => {
    if (localStorage.getItem(STORAGE_KEYS.INIT)) return;

    const today = new Date();
    const problems: Record<string, Problem> = {};
    const submissions: Submission[] = [];
    
    // Create mock data for the past 5 days
    for (let i = 4; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const isMissed = i === 2; // Make 2 days ago missed
        
        // Mock Problem
        const problemId = `mock-prob-${i}`;
        problems[dateStr] = {
            id: problemId,
            title: `React Hooks 심화 ${5-i}일차`,
            description: `React의 useEffect와 useLayoutEffect의 차이점에 대해 설명하고, 각각 언제 사용해야 하는지 예시를 들어보세요. (Mock Data ${dateStr})`,
            aiAnswer: "useEffect는 렌더링 후 비동기로 실행되며, useLayoutEffect는 DOM 업데이트 후 동기로 실행됩니다...",
            topic: 'React.js',
            difficulty: i % 2 === 0 ? Difficulty.MEDIUM : Difficulty.EASY,
            problemAt: dateStr
        };

        // Mock Submission (skip if missed)
        if (!isMissed) {
            submissions.push({
                id: `sub-${i}`,
                memberId: MOCK_USER_ID,
                problemId: problemId,
                answer: "useEffect는 화면이 그려진 후 실행되고 useLayoutEffect는 그려지기 전에 실행됩니다.",
                submittedAt: date.getTime() + 1000 * 60 * 60 * 9, // 9 AM
                isOnTime: true
            });
        }
    }

    // Set Data
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(problems));
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    
    // Set User
    const user: User = {
        id: MOCK_USER_ID,
        loginId: 'user',
        nickname: '꾸준한개발자',
        role: UserRole.MEMBER,
        lastLoginAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    // Set Preference
    const pref: Preference = {
        difficulty: Difficulty.MEDIUM,
        topicId: 't2',
        topicName: 'React.js',
        effectiveAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.PREFERENCE, JSON.stringify(pref));

    // Set Streak
    const streak: Streak = {
        currentStreak: 2, // Since we missed 2 days ago
        maxStreak: 2,
        lastSolvedDate: getToday()
    };
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
    
    localStorage.setItem(STORAGE_KEYS.INIT, 'true');
  },

  // --- User ---
  login: (nickname: string): User => {
    // Simple mock login
    const user: User = {
      id: MOCK_USER_ID,
      loginId: 'user',
      nickname,
      role: UserRole.GUEST,
      lastLoginAt: Date.now(),
    };
    
    // Check if existing
    const existing = localStorage.getItem(STORAGE_KEYS.USER);
    if (existing) {
      const parsed = JSON.parse(existing);
      // Update login time
      parsed.lastLoginAt = Date.now();
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(parsed));
      return parsed;
    }

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  upgradeUser: (): void => {
    const user = storageService.getUser();
    if (user) {
      user.role = UserRole.MEMBER;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  // --- Preferences ---
  setPreference: (difficulty: Difficulty, topicId: string): Preference => {
    const topic = TOPICS.find(t => t.id === topicId);
    const pref: Preference = {
      difficulty,
      topicId,
      topicName: topic?.name || 'Unknown',
      effectiveAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.PREFERENCE, JSON.stringify(pref));
    storageService.upgradeUser();
    return pref;
  },

  getPreference: (): Preference | null => {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCE);
    return data ? JSON.parse(data) : null;
  },

  // --- Problems ---
  getTodayProblem: (): Problem | null => {
    const today = getToday();
    const allProblems: Record<string, Problem> = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROBLEMS) || '{}');
    return allProblems[today] || null;
  },

  saveTodayProblem: (problem: Problem): void => {
    const allProblems: Record<string, Problem> = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROBLEMS) || '{}');
    allProblems[problem.problemAt] = problem;
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(allProblems));
  },

  // --- Submissions ---
  submitAnswer: (problemId: string, answer: string): Submission => {
    const allSubmissions: Submission[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
    
    // Check if already submitted today for this problem
    const existingIndex = allSubmissions.findIndex(s => s.problemId === problemId);
    
    const submission: Submission = {
      id: existingIndex > -1 ? allSubmissions[existingIndex].id : Math.random().toString(36).substr(2, 9),
      memberId: MOCK_USER_ID,
      problemId,
      answer,
      submittedAt: Date.now(),
      isOnTime: true, // Simplified for demo
    };

    if (existingIndex > -1) {
      // Update existing (Requirements say modifiable within same day)
      allSubmissions[existingIndex] = submission;
    } else {
      allSubmissions.push(submission);
      // Update streak only on new submission
      storageService.updateStreak();
    }

    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(allSubmissions));
    return submission;
  },

  getSubmissionForProblem: (problemId: string): Submission | null => {
    const allSubmissions: Submission[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
    return allSubmissions.find(s => s.problemId === problemId) || null;
  },

  getAllSubmissions: (): Submission[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
  },

  // --- Streak ---
  getStreak: (): Streak => {
    const data = localStorage.getItem(STORAGE_KEYS.STREAK);
    return data ? JSON.parse(data) : { currentStreak: 0, maxStreak: 0, lastSolvedDate: null };
  },

  updateStreak: (): void => {
    const streak = storageService.getStreak();
    const today = getToday();

    if (streak.lastSolvedDate === today) return; // Already counted

    // Logic for consecutive days would go here. 
    // Simplified: If lastSolved was yesterday, increment. If null or older, reset to 1.
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (streak.lastSolvedDate === yesterdayStr) {
      streak.currentStreak += 1;
    } else {
      streak.currentStreak = 1; // Reset or start
    }

    if (streak.currentStreak > streak.maxStreak) {
      streak.maxStreak = streak.currentStreak;
    }

    streak.lastSolvedDate = today;
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  },
  
  clear: () => {
      localStorage.clear();
  }
};