# API 연동 가이드

## Axios 인스턴스 설정

### 기본 클라이언트 (api/client.ts)

```typescript
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - JWT 토큰 자동 추가
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - 토큰 만료 시 자동 갱신
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우 로그아웃
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
```

## API 모듈

### 인증 API (api/auth.ts)

```typescript
import client from './client';
import type { LoginRequest, LoginResponse, SignupRequest, User } from '@/types/auth';

export const authAPI = {
  // 로그인
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await client.post('/auth/login', data);
    return response.data;
  },

  // 회원가입
  signup: async (data: SignupRequest): Promise<User> => {
    const response = await client.post('/auth/signup', data);
    return response.data;
  },

  // 토큰 갱신
  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await client.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await client.post('/auth/logout');
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<User> => {
    const response = await client.get('/auth/me');
    return response.data;
  },
};
```

### 문제 API (api/problem.ts)

```typescript
import client from './client';
import type { Problem, SubmitAnswerRequest, SubmitAnswerResponse } from '@/types/problem';

export const problemAPI = {
  // 오늘의 문제 조회
  getTodayProblem: async (): Promise<Problem> => {
    const response = await client.get('/problems/today');
    return response.data;
  },

  // 답변 제출
  submitAnswer: async (data: SubmitAnswerRequest): Promise<SubmitAnswerResponse> => {
    const response = await client.post('/problems/submit', data);
    return response.data;
  },

  // 문제 상세 조회
  getProblem: async (id: string): Promise<Problem> => {
    const response = await client.get(`/problems/${id}`);
    return response.data;
  },
};
```

### 스트릭 API (api/streak.ts)

```typescript
import client from './client';
import type { Streak, StreakHistory } from '@/types/streak';

export const streakAPI = {
  // 현재 스트릭 조회
  getCurrentStreak: async (): Promise<Streak> => {
    const response = await client.get('/streaks/current');
    return response.data;
  },

  // 스트릭 히스토리 조회
  getStreakHistory: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<StreakHistory[]> => {
    const response = await client.get('/streaks/history', { params });
    return response.data;
  },
};
```

### 사용자 설정 API (api/preference.ts)

```typescript
import client from './client';
import type { Preference, UpdatePreferenceRequest } from '@/types/preference';

export const preferenceAPI = {
  // 초기 설정
  createPreference: async (data: UpdatePreferenceRequest): Promise<Preference> => {
    const response = await client.post('/preferences', data);
    return response.data;
  },

  // 설정 조회
  getPreference: async (): Promise<Preference> => {
    const response = await client.get('/preferences');
    return response.data;
  },

  // 설정 업데이트
  updatePreference: async (data: UpdatePreferenceRequest): Promise<Preference> => {
    const response = await client.put('/preferences', data);
    return response.data;
  },
};
```

### 기록 API (api/record.ts)

```typescript
import client from './client';
import type { Record, RecordDetail, RecordListParams } from '@/types/record';

export const recordAPI = {
  // 풀이 기록 목록
  getRecords: async (params?: RecordListParams): Promise<Record[]> => {
    const response = await client.get('/records', { params });
    return response.data;
  },

  // 기록 상세 조회
  getRecordDetail: async (id: string): Promise<RecordDetail> => {
    const response = await client.get(`/records/${id}`);
    return response.data;
  },
};
```

## React Query 사용 예시

### Custom Hooks

#### useAuth Hook

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '@/api/auth';
import type { LoginRequest, SignupRequest } from '@/types/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // 현재 사용자 정보 조회
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authAPI.getCurrentUser,
    enabled: !!localStorage.getItem('accessToken'),
    retry: false,
  });

  // 로그인
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // 회원가입
  const signupMutation = useMutation({
    mutationFn: authAPI.signup,
    onSuccess: () => {
      // 회원가입 후 로그인 페이지로 이동
    },
  });

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
};
```

#### useProblem Hook

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { problemAPI } from '@/api/problem';
import type { SubmitAnswerRequest } from '@/types/problem';

export const useProblem = () => {
  const queryClient = useQueryClient();

  // 오늘의 문제 조회
  const { data: todayProblem, isLoading } = useQuery({
    queryKey: ['todayProblem'],
    queryFn: problemAPI.getTodayProblem,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });

  // 답변 제출
  const submitMutation = useMutation({
    mutationFn: problemAPI.submitAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayProblem'] });
      queryClient.invalidateQueries({ queryKey: ['streak'] });
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });

  return {
    todayProblem,
    isLoading,
    submitAnswer: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
  };
};
```

#### useStreak Hook

```typescript
import { useQuery } from '@tanstack/react-query';
import { streakAPI } from '@/api/streak';

export const useStreak = () => {
  const { data: streak, isLoading } = useQuery({
    queryKey: ['streak'],
    queryFn: streakAPI.getCurrentStreak,
    staleTime: 1000 * 60, // 1분
  });

  const { data: history } = useQuery({
    queryKey: ['streakHistory'],
    queryFn: () => streakAPI.getStreakHistory(),
    staleTime: 1000 * 60 * 5, // 5분
  });

  return {
    streak,
    history,
    isLoading,
  };
};
```

## 에러 처리

### API 에러 타입

```typescript
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

### 에러 핸들링

```typescript
import { AxiosError } from 'axios';
import type { APIError } from '@/types/common';

export const handleAPIError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as APIError;
    return apiError?.message || '알 수 없는 오류가 발생했습니다.';
  }
  return '네트워크 오류가 발생했습니다.';
};
```

### 사용 예시

```typescript
try {
  await login({ loginId, password });
} catch (error) {
  const errorMessage = handleAPIError(error);
  toast.error(errorMessage);
}
```

## 환경 변수

### .env.development

```env
VITE_API_URL=http://localhost:8080/v1
VITE_APP_NAME=HaruHaru
```

### .env.production

```env
VITE_API_URL=https://api.haruharu.com/v1
VITE_APP_NAME=HaruHaru
```
