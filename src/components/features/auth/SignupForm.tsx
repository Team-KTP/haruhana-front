import { useForm } from 'react-hook-form';
import { MemberCreateRequest } from '../../../types/auth';
import { Button } from '../../common/Button';
import Input from '../../common/Input';

interface SignupFormProps {
  onSubmit: (data: MemberCreateRequest) => void;
  isLoading?: boolean;
  error?: string;
}

interface SignupFormData extends MemberCreateRequest {
  passwordConfirm: string;
}

export default function SignupForm({ onSubmit, isLoading, error }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  const handleFormSubmit = (data: SignupFormData) => {
    const { passwordConfirm, ...signupData } = data;
    onSubmit(signupData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <Input
        type="text"
        placeholder="아이디 (4-20자의 영문, 숫자)"
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
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: '아이디는 영문과 숫자만 사용 가능합니다',
          },
        })}
      />

      <Input
        type="password"
        placeholder="비밀번호 (최소 8자)"
        error={errors.password?.message}
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다',
          },
        })}
      />

      <Input
        type="password"
        placeholder="비밀번호 확인"
        error={errors.passwordConfirm?.message}
        {...register('passwordConfirm', {
          required: '비밀번호 확인을 입력해주세요',
          validate: (value) => value === password || '비밀번호가 일치하지 않습니다',
        })}
      />

      <Input
        type="text"
        placeholder="닉네임 (2-10자)"
        error={errors.nickname?.message}
        {...register('nickname', {
          required: '닉네임을 입력해주세요',
          minLength: {
            value: 2,
            message: '닉네임은 최소 2자 이상이어야 합니다',
          },
          maxLength: {
            value: 10,
            message: '닉네임은 최대 10자까지 가능합니다',
          },
        })}
      />

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? '처리 중...' : '회원가입'}
      </Button>
    </form>
  );
}
