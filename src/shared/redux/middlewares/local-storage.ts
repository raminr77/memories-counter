/* eslint-disable */
import {
  LOCAL_STORAGE_KEYS
} from '../../constants/local-storage-keys.ts';

import { toggleDarkMode } from '../app/app-slice.ts';

// @ts-ignore
const localStorageMiddleware = (store) => (next) => (action) => {
  if (toggleDarkMode.match(action)) {
    const darkMode = action.payload;
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem(LOCAL_STORAGE_KEYS.DARK_MODE, darkMode);
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem(LOCAL_STORAGE_KEYS.DARK_MODE);
    }
  }

  return next(action);
};

export { localStorageMiddleware };
