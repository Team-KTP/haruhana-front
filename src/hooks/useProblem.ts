import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodayProblem, getDailyProblemDetail, submitSolution } from '../api/problem';
import { TodayProblemResponse, DailyProblemDetailResponse, SubmissionResponse } from '../types/problem';

export function useTodayProblem() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<TodayProblemResponse>({
    queryKey: ['problem', 'today'],
    queryFn: getTodayProblem,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });

  return {
    problem: data,
    isLoading,
    error,
    refetch,
  };
}

export function useProblemDetail(dailyProblemId: number) {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<DailyProblemDetailResponse>({
    queryKey: ['problem', 'detail', dailyProblemId],
    queryFn: () => getDailyProblemDetail(dailyProblemId),
    enabled: !!dailyProblemId,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });

  return {
    problemDetail: data,
    isLoading,
    error,
    refetch,
  };
}

export function useSubmitSolution(dailyProblemId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation<SubmissionResponse, Error, string>({
    mutationFn: (userAnswer: string) => submitSolution(dailyProblemId, { userAnswer }),
    onSuccess: () => {
      // 문제 상세 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['problem', 'detail', dailyProblemId] });
      // 오늘의 문제 캐시 무효화 (isSolved 상태 업데이트)
      queryClient.invalidateQueries({ queryKey: ['problem', 'today'] });
      // 스트릭 캐시 무효화 (스트릭이 증가할 수 있음)
      queryClient.invalidateQueries({ queryKey: ['streak'] });
    },
  });

  return {
    submit: mutation.mutate,
    submitAsync: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
}
