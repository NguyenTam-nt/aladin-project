import {combineReducers} from '@reduxjs/toolkit';
import appInfoReducer from './AuthSlice';
import multiLangage from '../multilanguage/slice';
import infoProvice from '../provices/ProviceSlice';

export const reducer = combineReducers({
  appInfoReducer,
  multiLangage,
  infoProvice,
});
