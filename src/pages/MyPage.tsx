import React from 'react';

const MyPage: React.FC = () => {
  // TODO: 실제 사용자 정보는 인증 API 연동 후 교체
  const user = {
    name: '홍길동',
    email: 'honggildong@example.com',
    joinedAt: '2024-01-01',
    preferences: ['알고리즘', '자료구조'],
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">내 정보</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <span className="font-semibold">이름:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">이메일:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">가입일:</span> {user.joinedAt}
        </div>
        <div>
          <span className="font-semibold">관심 분야:</span> {user.preferences.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
