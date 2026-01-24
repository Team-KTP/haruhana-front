# Vercel 배포 체크리스트

## 배포 전

- [ ] `npm run build` 로컬 빌드 테스트
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] `vercel.json` 파일 생성 완료

## Vercel 설정

- [ ] Vercel 프로젝트 생성
- [ ] 환경변수 설정 (Settings → Environment Variables)
  - [ ] `VITE_API_URL`
  - [ ] `VITE_APP_NAME`
  - [ ] `VITE_FIREBASE_API_KEY`
  - [ ] `VITE_FIREBASE_AUTH_DOMAIN`
  - [ ] `VITE_FIREBASE_PROJECT_ID`
  - [ ] `VITE_FIREBASE_STORAGE_BUCKET`
  - [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `VITE_FIREBASE_APP_ID`
  - [ ] `VITE_FIREBASE_VAPID_KEY`

## Firebase 설정

- [ ] Firebase Console → 프로젝트 설정
- [ ] "승인된 도메인"에 Vercel 도메인 추가
  - [ ] `*.vercel.app`
  - [ ] 커스텀 도메인 (있는 경우)

## 배포 후 테스트

- [ ] 사이트 접속 확인
- [ ] 로그인 테스트
- [ ] 알림 권한 요청 배너 확인
- [ ] FCM 토큰 생성 확인 (브라우저 콘솔)
- [ ] Firebase Console에서 테스트 알림 전송
- [ ] 알림이 제대로 표시되는지 확인
- [ ] Service Worker 등록 확인
  - Chrome: DevTools → Application → Service Workers

## 문제 해결

### 알림이 안 오는 경우
1. 브라우저 콘솔에서 에러 확인
2. Service Worker 등록 상태 확인
3. Firebase Console에서 승인된 도메인 확인
4. 환경변수가 제대로 설정되었는지 확인

### Service Worker 404 에러
- `vercel.json`에 Service Worker 설정이 있는지 확인
- 배포 후 브라우저 캐시 삭제

### 환경변수가 적용 안 되는 경우
- Vercel Dashboard에서 환경변수 재확인
- `VITE_` 접두사가 있는지 확인
- 재배포 필요

## 유용한 명령어

```bash
# 로컬 빌드 테스트
npm run build

# 로컬에서 프로덕션 빌드 실행
npm run preview

# Vercel 배포
vercel

# Vercel 프로덕션 배포
vercel --prod

# Vercel 로그 확인
vercel logs
```

## 참고 링크

- [Vercel 문서](https://vercel.com/docs)
- [Firebase 문서](https://firebase.google.com/docs)
- [Vite 환경변수](https://vitejs.dev/guide/env-and-mode.html)
