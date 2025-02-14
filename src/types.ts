import { z } from 'zod';

export interface GameResult {
  gameHash: string;
  resultHash: string;
  prize: string | null;
  timestamp: number;
  isManipulated: boolean;
  gameType: 'wheel' | 'box';
}

export interface WheelSegment {
  prize: string;
  color: string;
  probability: number;
  icon: string;
}

export interface BoxPrize {
  prize: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  probability: number;
  icon: string;
  color: string;
}

export interface UserData {
  phone: string;
  prizes: {
    prize: string;
    gameHash: string;
    resultHash: string;
    timestamp: number;
  }[];
  lastLogin: number;
}

export const phoneSchema = z.string().regex(/^\+55 \(\d{2}\) \d{5}-\d{4}$/, 'Formato inválido');

export const WHEEL_PRIZES: WheelSegment[] = [
  { prize: 'Prêmio Lendário', color: '#ffd700', probability: 5, icon: '🏆' },
  { prize: 'Tente novamente', color: '#4a5568', probability: 20, icon: '❌' },
  { prize: 'Prêmio Épico', color: '#9333ea', probability: 10, icon: '💫' },
  { prize: 'Tente novamente', color: '#4a5568', probability: 20, icon: '❌' },
  { prize: 'Prêmio Raro', color: '#2563eb', probability: 15, icon: '🌟' },
  { prize: 'Tente novamente', color: '#4a5568', probability: 20, icon: '❌' },
  { prize: 'Prêmio Comum', color: '#10b981', probability: 10, icon: '🎁' },
];

export const BOX_PRIZES: BoxPrize[] = [
  {
    prize: 'Prêmio Lendário',
    rarity: 'legendary',
    probability: 5,
    icon: '👑',
    color: '#ffd700'
  },
  {
    prize: 'Prêmio Épico',
    rarity: 'epic',
    probability: 10,
    icon: '🌟',
    color: '#9333ea'
  },
  {
    prize: 'Prêmio Raro',
    rarity: 'rare',
    probability: 15,
    icon: '💎',
    color: '#2563eb'
  },
  {
    prize: 'Prêmio Comum',
    rarity: 'common',
    probability: 30,
    icon: '🎁',
    color: '#10b981'
  },
  {
    prize: 'Tente novamente',
    rarity: 'common',
    probability: 40,
    icon: '📦',
    color: '#4a5568'
  }
];