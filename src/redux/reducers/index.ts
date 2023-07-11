import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './AuthSlice';

export const reducer = combineReducers({
  authReducer,
});
