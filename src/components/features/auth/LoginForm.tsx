import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../../types/auth';
import { Button } from '../../common/Button';
import Input from '../../common/Input';

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void;
  isLoading?: boolean;
  error?: string;
}

export default function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <Input
        type="text"
        placeholder="아이디"
        error={errors.loginId?.message}
        {...register('loginId', {
          required: '아이디를 입력해주세요',
          minLength: {
            value: 4,
            message: '아이디는 최소 4자 이상이어야 합니다',
          },
          maxLength: {
            value: 20,
            message: '아이디는 최대 20자까지 가능합니다',
          },
        })}
      />

      <Input
        type="password"
        placeholder="비밀번호"
        error={errors.password?.message}
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다',
          },
        })}
      />

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
