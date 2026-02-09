
import { VirtualAccount, DeviceFingerprint } from '../types';

export const generateFingerprint = (): DeviceFingerprint => {
  const randomId = () => Math.random().toString(36).substring(2, 15);
  return {
    androidId: `NJADI_${randomId()}`,
    imei: `35${Math.floor(Math.random() * 10000000000000)}`,
    userAgent: "Mozilla/5.0 (Linux; Android 14; SM-S928B Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/121.0.6167.164 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/448.0.0.41.114;]",
    resolution: "1440x3120"
  };
};

export const createVirtualAccount = (name: string, platform: 'facebook' | 'instagram' | 'twitter'): VirtualAccount => {
  return {
    id: crypto.randomUUID(),
    name,
    platform,
    fingerprint: generateFingerprint(),
    lastActive: Date.now()
  };
};

export const getIsolatedStorage = (accountId: string) => {
  const key = `njadi_storage_${accountId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

export const saveToIsolatedStorage = (accountId: string, data: any) => {
  const key = `njadi_storage_${accountId}`;
  localStorage.setItem(key, JSON.stringify(data));
};

