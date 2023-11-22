import {combineReducers} from '@reduxjs/toolkit';
import appInfoReducer from './AuthSlice';
import multiLangage from '../multilanguage/slice';
import infoProvice from '../provices/ProviceSlice';
import cartOrderSlice from '../orderCart/slice';
import productsSlice from '../products/slice';
import enableAuthSlice from '../enableAuth/slice';

export const reducer = combineReducers({
  appInfoReducer,
  multiLangage,
  infoProvice,
  cartOrderSlice,
  productsSlice,
  enableAuthSlice,
});
