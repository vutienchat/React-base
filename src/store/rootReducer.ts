import { combineReducers } from '@reduxjs/toolkit';
import menuReducer from 'slices/menu';
import notificationReducer from 'slices/notification';

const rootReducer = combineReducers({
  menu: menuReducer,
  notification: notificationReducer,
});

export default rootReducer;
