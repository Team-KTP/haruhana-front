import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { storageService } from '../services/storageService';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      const user = storageService.login(nickname);
      onLogin(user);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-haru-500 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-haru-200 mb-6">
          하
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">하루하루</h1>
        <p className="text-slate-500">매일 조금씩, 꾸준히 성장하세요.</p>
      </div>

      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">닉네임</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-haru-500 focus:ring-2 focus:ring-haru-200 outline-none transition-all"
              placeholder="사용할 닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <Button type="submit" fullWidth size="lg">
            시작하기
          </Button>
          <p className="text-xs text-center text-slate-400 mt-4">
            계속 진행함으로써, 빠름보다는 꾸준함을 추구하는 우리의 철학에 동의하게 됩니다.
          </p>
        </form>
      </Card>
    </div>
  );
};