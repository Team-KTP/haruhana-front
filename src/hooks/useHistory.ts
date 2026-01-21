import { useQuery, useQueries } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getDailyProblem } from '../api/problem';
import { DailyProblemResponse } from '../types/problem';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO, isAfter } from 'date-fns';

/**
 * 특정 날짜의 문제 조회
 * @param date - 날짜 (YYYY-MM-DD), null이면 오늘 날짜로 조회
 */
export function useDailyProblem(date: string | null) {
  const {
    data,
    isLoading,
    error,
  } = useQuery<DailyProblemResponse>({
    queryKey: ['dailyProblem', date ?? 'today'],
    queryFn: () => getDailyProblem(date ?? undefined),
    staleTime: 5 * 60 * 1000, // 5분
    retry: false,
  });

  return {
    problem: data,
    isLoading,
    error,
  };
}

/**
 * 특정 월의 모든 날짜에 대한 문제 조회
 * @param year - 연도
 * @param month - 월 (1-12)
 * @param memberCreatedAt - 회원 가입일 (ISO 8601), 이 날짜 이후만 조회
 */
export function useMonthlyProblems(year: number, month: number, memberCreatedAt?: string) {
  // 해당 월의 모든 날짜 생성
  const monthStart = startOfMonth(new Date(year, month - 1));
  const monthEnd = endOfMonth(new Date(year, month - 1));
  const today = new Date();

  // 회원 가입일 파싱
  const createdAtDate = memberCreatedAt ? parseISO(memberCreatedAt) : null;

  // 조회 시작일: 회원 가입일과 월 시작일 중 더 늦은 날짜
  const queryStart = createdAtDate && isAfter(createdAtDate, monthStart)
    ? createdAtDate
    : monthStart;

  // 조회 종료일: 오늘과 월 종료일 중 더 이른 날짜
  const queryEnd = isAfter(monthEnd, today) ? today : monthEnd;

  // 조회할 날짜 목록 생성 (시작일이 종료일보다 이후면 빈 배열)
  const datesToQuery = isAfter(queryStart, queryEnd)
    ? []
    : eachDayOfInterval({ start: queryStart, end: queryEnd });

  // useQueries를 사용하여 동적 쿼리 배열 처리 (훅 규칙 준수)
  const queries = useQueries({
    queries: datesToQuery.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return {
        queryKey: ['dailyProblem', dateStr],
        queryFn: async () => {
          try {
            return await getDailyProblem(dateStr);
          } catch (error) {
            // 404 에러는 해당 날짜에 문제가 없는 것으로 처리
            if (error instanceof AxiosError && error.response?.status === 404) {
              return null;
            }
            throw error;
          }
        },
        staleTime: 10 * 60 * 1000, // 10분
        retry: false,
      };
    }),
  });

  // 모든 쿼리 결과를 Map 형태로 변환
  const problemsMap = new Map<string, DailyProblemResponse>();
  queries.forEach((query, index) => {
    if (query.data) {
      const dateStr = format(datesToQuery[index], 'yyyy-MM-dd');
      problemsMap.set(dateStr, query.data);
    }
  });

  const isLoading = queries.some(q => q.isLoading);

  return {
    problemsMap,
    isLoading,
  };
}
