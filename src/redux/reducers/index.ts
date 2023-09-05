import {combineReducers} from '@reduxjs/toolkit';
import appInfoReducer from './AuthSlice';
import  multiLangage from '../multilanguage/slice';

export const reducer = combineReducers({
  appInfoReducer,
  multiLangage
});
