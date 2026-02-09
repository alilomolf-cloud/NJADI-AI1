
export enum Mood {
  DEFAULT = 'DEFAULT',
  COMEDY = 'COMEDY',
  BUSINESS = 'BUSINESS'
}

export enum Language {
  EN = 'en',
  AR = 'ar'
}

export interface VirtualAccount {
  id: string;
  name: string;
  platform: 'facebook' | 'instagram' | 'twitter';
  fingerprint: DeviceFingerprint;
  lastActive: number;
}

export interface DeviceFingerprint {
  androidId: string;
  imei: string;
  userAgent: string;
  resolution: string;
}

export interface Message {
  id: string;
  accountId: string;
  sender: string;
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'vocal' | 'video';
  isAI?: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface CallState {
  isActive: boolean;
  type: 'voice' | 'video';
  partnerName: string;
  duration: number;
}
