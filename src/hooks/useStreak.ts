import { useQuery } from '@tanstack/react-query';
import { getStreak } from '../api/streak';
import { StreakResponse } from '../types/streak';

export function useStreak() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<StreakResponse>({
    queryKey: ['streak'],
    queryFn: getStreak,
    staleTime: 1 * 60 * 1000, // 1분
    retry: 1,
  });

  return {
    streak: data,
    isLoading,
    error,
    refetch,
  };
}
