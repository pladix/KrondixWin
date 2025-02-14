import crypto from 'crypto-js';
import { WHEEL_PRIZES, BOX_PRIZES, GameResult } from './types';

export const generateGameHash = () => {
  const randomBytes = crypto.lib.WordArray.random(32);
  const timestamp = Date.now().toString();
  const combinedData = randomBytes.toString() + timestamp;
  return crypto.SHA256(combinedData).toString();
};

export const generateResultHash = (gameHash: string, result: string) => {
  const salt = crypto.lib.WordArray.random(16).toString();
  return crypto.SHA256(gameHash + result + salt).toString();
};

export const getRandomPrize = (isManipulated: boolean, gameType: 'wheel' | 'box') => {
  if (isManipulated) {
    return 'Tente novamente';
  }

  const prizes = gameType === 'wheel' ? WHEEL_PRIZES : BOX_PRIZES;
  const totalProbability = prizes.reduce((sum, item) => sum + item.probability, 0);
  let random = Math.random() * totalProbability;

  for (const item of prizes) {
    random -= item.probability;
    if (random <= 0) {
      return item.prize;
    }
  }

  return prizes[0].prize;
};

export const validateGameResult = (result: GameResult): boolean => {
  const { gameHash, resultHash, prize, timestamp } = result;
  
  const now = Date.now();
  const fiveMinutesAgo = now - 5 * 60 * 1000;
  if (timestamp < fiveMinutesAgo || timestamp > now) {
    return false;
  }

  const hashRegex = /^[a-f0-9]{64}$/i;
  if (!hashRegex.test(gameHash) || !hashRegex.test(resultHash)) {
    return false;
  }

  const validPrizes = [...WHEEL_PRIZES, ...BOX_PRIZES].map(p => p.prize);
  if (!validPrizes.includes(prize)) {
    return false;
  }

  return true;
};