import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { REDUCERS } from '../constants/reducers.ts';
import { ENV_DATA } from '../constants/environment.ts';
import { localStorageMiddleware } from './middlewares/local-storage';

import appReducer from './app/app-slice.ts';
import userReducer from './user/user-slice';

const persistConfig = {
  blacklist: [REDUCERS.USER],
  key: ENV_DATA.NAME,
  storage
};

const userPersistConfig = {
  key: REDUCERS.USER,
  storage: storageSession
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [REDUCERS.APP]: appReducer,
    [REDUCERS.USER]: persistReducer(userPersistConfig, userReducer)
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  }).concat(localStorageMiddleware),
});

export const persistor = persistStore(store);
