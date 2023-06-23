import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { HttpErrorType } from 'types/shared';

interface NotificationState {
  message: string | null;
  type?: HttpErrorType;
}

const initialState: NotificationState = {
  message: null,
  type: 'error',
};

const notificationSlice = createSlice({
  name: '@notification',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<NotificationState>) {
      const { message, type = 'error' } = action.payload;
      state.message = message;
      state.type = type;
    },
  },
});

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
