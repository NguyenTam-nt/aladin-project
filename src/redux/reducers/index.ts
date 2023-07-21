import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import infoDrawerSlice from '../infoDrawer/slice';
import cartOrderSlice  from '../cartOrder/slice';

export const reducer = combineReducers({
  authReducer,
  infoDrawerSlice,
  cartOrderSlice,
});
