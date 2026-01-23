import { AxiosError } from 'axios';

interface ErrorResponse {
  error?: {
    message?: string;
    code?: string;
  };
  message?: string;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined;
    const status = error.response?.status;

    // 서버에서 제공한 에러 메시지
    if (data?.error?.message) {
      return data.error.message;
    }

    if (data?.message) {
      return data.message;
    }

    // HTTP 상태 코드별 기본 메시지
    if (status) {
      return getStatusErrorMessage(status);
    }

    // 네트워크 에러
    if (error.code === 'ECONNABORTED') {
      return '요청 시간이 초과되었습니다.\n잠시 후 다시 시도해주세요.';
    }

    if (error.code === 'ERR_NETWORK') {
      return '네트워크 연결을 확인해주세요.';
    }
  }

  // 기본 에러 메시지
  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};

const getStatusErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return '잘못된 요청입니다.\n입력 정보를 확인해주세요.';
    case 401:
      return '인증이 필요합니다.\n다시 로그인해주세요.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 정보를 찾을 수 없습니다.';
    case 409:
      return '이미 존재하는 정보입니다.';
    case 422:
      return '입력 값이 올바르지 않습니다.';
    case 429:
      return '요청이 너무 많습니다.\n잠시 후 다시 시도해주세요.';
    case 500:
      return '서버 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.';
    case 502:
      return '서버에 연결할 수 없습니다.\n잠시 후 다시 시도해주세요.';
    case 503:
      return '서비스를 일시적으로 사용할 수 없습니다.\n잠시 후 다시 시도해주세요.';
    case 504:
      return '서버 응답 시간이 초과되었습니다.\n잠시 후 다시 시도해주세요.';
    default:
      if (status >= 500) {
        return '서버 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.';
      }
      if (status >= 400) {
        return '요청을 처리할 수 없습니다.\n입력 정보를 확인해주세요.';
      }
      return '오류가 발생했습니다.';
  }
};

export const isClientError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status !== undefined && status >= 400 && status < 500;
  }
  return false;
};

export const isServerError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status !== undefined && status >= 500;
  }
  return false;
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED';
  }
  return false;
};
