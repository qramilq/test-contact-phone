import { ImmortalStorage, CookieStore, LocalStorageStore } from "immortal-db";

const db = (() => {
  const stores = [CookieStore, LocalStorageStore];
  const db = new ImmortalStorage(stores);
  return db;
})();

export const saveToStorage = ({ key, value }) => {
  db.set(key, JSON.stringify(value));
};

export const loadFromStorage = async ({ key, defaultValue }) => {
  const value = await db.get(key, defaultValue);

  try {
    const serialize = JSON.parse(value);
    return serialize;
  } catch {
    return defaultValue;
  }
};
