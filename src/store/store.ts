import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from '../reducers/tasks/tasks.reducer';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';

export const store = configureStore({
  reducer: {
    tasks: persistReducer(
      {
        key: 'tasks',
        version: 1,
        storage,
      },
      tasksReducer
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
