/* eslint-disable */
import {
  LOCAL_STORAGE_KEYS
} from 'shared/constants/local-storage-keys';

import { toggleDarkMode } from 'shared/redux/app/app-slice';

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
