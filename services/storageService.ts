// Simple wrapper for LocalStorage to simulate offline caching
const CACHE_PREFIX = 'afribuild_';

export const saveToCache = <T,>(key: string, data: T): void => {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to local storage', error);
  }
};

export const getFromCache = <T,>(key: string): T | null => {
  try {
    const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from local storage', error);
    return null;
  }
};

export const clearCache = (key: string): void => {
  localStorage.removeItem(`${CACHE_PREFIX}${key}`);
};
