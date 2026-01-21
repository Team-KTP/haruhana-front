import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCategories, registerPreference, updatePreference } from '../api/preference';
import {
  CategoryListResponse,
  PreferenceRegisterRequest,
  PreferenceUpdateRequest,
} from '../types/preference';

/**
 * 카테고리 목록 조회 훅
 */
export function useCategories() {
  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery<CategoryListResponse>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000, // 1시간
  });

  return { categoryData, isLoading, error };
}

/**
 * 학습 설정 등록 훅
 */
export function useRegisterPreference() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: PreferenceRegisterRequest) => registerPreference(data),
    onSuccess: () => {
      // 사용자 프로필 다시 조회 (GUEST -> MEMBER로 변경됨)
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });

      // 메인 페이지로 이동
      navigate('/');
    },
  });

  return {
    register: mutation.mutate,
    isRegistering: mutation.isPending,
    error: mutation.error,
  };
}

/**
 * 학습 설정 수정 훅
 */
export function useUpdatePreference() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PreferenceUpdateRequest) => updatePreference(data),
    onSuccess: () => {
      // 사용자 프로필 다시 조회
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });

  return {
    update: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
}
