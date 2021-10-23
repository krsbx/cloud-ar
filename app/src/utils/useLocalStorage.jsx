import { useState, useCallback } from 'react';

const getLocalStorage = (key) => window.localStorage.getItem(key);

const useLocalStorage = (key = 'access_token') => {
  const [value, setValue] = useState(getLocalStorage(key));

  const updateValue = useCallback(
    (newValue) => {
      window.localStorage.setItem(key, newValue);

      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue];
};

export default useLocalStorage;
