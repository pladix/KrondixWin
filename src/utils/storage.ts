import { UserData, GameResult } from '../types';
import { validateGameResult } from '../utils';

const USERS_KEY = 'krondixwin_users';
const HISTORY_KEY = 'krondixwin_history';

const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
};

export const loadUsers = (): UserData[] => {
  return getStorageItem<UserData[]>(USERS_KEY, []);
};

export const saveUsers = (users: UserData[]): boolean => {
  return setStorageItem(USERS_KEY, users);
};

export const loadGameHistory = (): GameResult[] => {
  return getStorageItem<GameResult[]>(HISTORY_KEY, []);
};

export const saveGameHistory = (history: GameResult[]): boolean => {
  return setStorageItem(HISTORY_KEY, history);
};

export const authenticateUser = (phone: string): UserData => {
  const users = loadUsers();
  let user = users.find(u => u.phone === phone);

  if (!user) {
    user = {
      phone,
      prizes: [],
      lastLogin: Date.now()
    };
    users.push(user);
    saveUsers(users);
  } else {
    user.lastLogin = Date.now();
    saveUsers(users);
  }

  return user;
};

export const saveGameResult = (result: GameResult, phone: string): void => {
  if (!validateGameResult(result)) {
    console.error('Invalid game result:', result);
    return;
  }

  const users = loadUsers();
  const user = users.find(u => u.phone === phone);

  if (user) {
    user.prizes.push({
      prize: result.prize || 'Tente novamente',
      gameHash: result.gameHash,
      resultHash: result.resultHash,
      timestamp: result.timestamp
    });
    user.lastLogin = Date.now();
    saveUsers(users);
  }

  const history = loadGameHistory();
  history.unshift(result);
  saveGameHistory(history);
};