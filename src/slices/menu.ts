import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
  sidebarOpen: boolean;
  mobileOpen: boolean;
}

const initialState: MenuState = {
  sidebarOpen: true,
  mobileOpen: false,
};

export const menuSlice = createSlice({
  name: '@menu',
  initialState,
  reducers: {
    toggleSidebarOpen: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === 'boolean') {
        state.sidebarOpen = action.payload;
      } else {
        state.sidebarOpen = !state.sidebarOpen;
      }
    },
    toggleMobileOpen: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === 'boolean') {
        state.mobileOpen = action.payload;
      } else {
        state.mobileOpen = !state.mobileOpen;
      }
    },
  },
});

export const { toggleSidebarOpen, toggleMobileOpen } = menuSlice.actions;
export default menuSlice.reducer;
