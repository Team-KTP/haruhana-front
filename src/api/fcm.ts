import client from './client';

export interface DeviceTokenSyncRequest {
  deviceToken: string;
}

// FCM 디바이스 토큰 동기화 (등록/업데이트)
export const syncDeviceToken = async (deviceToken: string): Promise<void> => {
  await client.patch('/v1/members/devices', {
    deviceToken,
  });
};
