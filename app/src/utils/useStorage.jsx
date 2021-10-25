import { useState, useCallback } from 'react';
import useEventListener from './useEventListener';

export const useLocalStorage = (key) => useStorage(key, window.localStorage);

export const useSessionStorage = (key) =>
  useStorage(key, window.sessionStorage);

const getInitialValue = (key, storageType) => storageType.getItem(key);

const useStorage = (key, storageType) => {
  const [value, setValue] = useState(getInitialValue(key, storageType));

  useEventListener('storage', (event) => {
    setValue(event.storageArea[key]);
  });

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
};
