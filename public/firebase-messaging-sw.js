// Firebase Cloud Messaging Service Worker

// Firebase 라이브러리 임포트 (CDN)
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase 설정
const firebaseConfig = {
  apiKey: 'AIzaSyB1fyEoXol2OAXgz1YZaS7vhmU1Mv7h4Z4',
  authDomain: 'haruhana-22767.firebaseapp.com',
  projectId: 'haruhana-22767',
  storageBucket: 'haruhana-22767.firebasestorage.app',
  messagingSenderId: '487581121426',
  appId: '1:487581121426:web:724307ca7bae68a2679f4b',
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Messaging 인스턴스 가져오기
const messaging = firebase.messaging();

// 백그라운드 메시지 핸들러
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title || '새 알림';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || '',
    icon: payload.notification?.icon || '/icons/icon-192x192.svg',
    badge: '/icons/icon-192x192.svg',
    data: payload.data,
    tag: payload.data?.tag || 'fcm-notification',
    requireInteraction: false,
    vibrate: [200, 100, 200],
  };

  console.log('[firebase-messaging-sw.js] Showing notification:', notificationTitle, notificationOptions);

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 핸들러
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked:', event);

  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 이미 열려있는 창이 있으면 포커스
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // 없으면 새 창 열기
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
