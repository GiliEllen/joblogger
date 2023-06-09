import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlice from '../features/user/userSlice';
import jobArraySlice from '../features/jobs/jobSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
    jobArray: jobArraySlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
