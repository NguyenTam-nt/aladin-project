import {combineReducers} from '@reduxjs/toolkit';
import appInfoReducer from './AuthSlice';
import infoDrawerSlice from '../infoDrawer/slice';
import cartOrderSlice  from '../cartOrder/slice';

export const reducer = combineReducers({
  appInfoReducer,
  infoDrawerSlice,
  cartOrderSlice,
});
