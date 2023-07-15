import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import infoDrawerSlice from '../infoDrawer/slice';

export const reducer = combineReducers({
  authReducer,
  infoDrawerSlice,

});
